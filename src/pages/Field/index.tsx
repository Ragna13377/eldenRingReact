import field from '@images/layout/field.webp';
import closeIcon from '@images/ui/close.png';
import helpIcon from '@images/ui/help.png';
import refreshIcon from '@images/ui/refresh.png';
import saveIcon from '@images/ui/save.png';
import { useDropField } from '@pages/Field/hooks';
import { runBotTurn } from '@shared/game/bot/bot-controller';
import {
	clearGameSnapshot,
	loadGameSnapshot,
	saveGameSnapshot,
} from '@shared/game/saveStorage';
import { createInitialDuelGame } from '@shared/game/setup';
import type { GameCard, GameState } from '@shared/game/types';
import {
	addLog,
	checkWinner,
	discardEvent,
	discardReward,
	drawEvent,
	drawReward,
	getPlayer,
	passTurn,
	updatePlayer,
} from '@shared/game/utils';
import {
	getInventory,
	resetInventory,
	setInventory,
} from '@shared/services/Inventory/slice';
import {
	getPlayerArenaCard,
	resetPlayerArena,
	setPlayerArena,
} from '@shared/services/PlayerArena/slice';
import { getPlayerHandCard, setHand } from '@shared/services/PlayerHand/slice';
import { clearDraggableCard } from '@shared/services/DraggableCard/slice';
import { deckSizes } from '@shared/storage/decks';
import { CardSubType } from '@shared/types/commonTypes';
import type { TFieldProps } from '@pages/Field/types';
import MiniCard from '@widgets/MiniCard';
import Card from '@widgets/Сard';
import { clsx } from 'clsx';
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '@/app/store';
import styles from './style.module.scss';

const enemyHandSlots = [
	'enemy-card-1',
	'enemy-card-2',
	'enemy-card-3',
	'enemy-card-4',
	'enemy-card-5',
];

const maxVisibleDeckLayers = 5;
const deckLayerSlots = Array.from({ length: maxVisibleDeckLayers }).map(
	(_, index) => ({
		id: `deck-layer-${index + 1}`,
		index,
	})
);

type TTurnPhase =
	| 'shuffle'
	| 'preparation'
	| 'kickDoor'
	| 'doorRevealed'
	| 'combat'
	| 'choice'
	| 'charity'
	| 'finished';

type THintKind =
	| 'gameStart'
	| 'turnPreparation'
	| 'eventReveal'
	| 'enemyRevealed'
	| 'eventEffect'
	| 'eventCard'
	| 'postEventChoice'
	| 'combat'
	| 'combatRestrictions'
	| 'intervention'
	| 'combatWin'
	| 'reward'
	| 'combatLoss'
	| 'escape'
	| 'defeatEffect'
	| 'handLimit'
	| 'botTurn'
	| 'botThinking'
	| 'botCombat'
	| 'gameWin';

type TTurnHint = {
	title: string;
	meta?: string;
	text: string[];
};

type TSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const turnHintKinds: THintKind[] = [
	'gameStart',
	'turnPreparation',
	'eventReveal',
	'enemyRevealed',
	'eventEffect',
	'eventCard',
	'postEventChoice',
	'combat',
	'combatRestrictions',
	'intervention',
	'combatWin',
	'reward',
	'combatLoss',
	'escape',
	'defeatEffect',
	'handLimit',
	'botTurn',
	'botThinking',
	'botCombat',
	'gameWin',
];

const isTurnHintKind = (value: string): value is THintKind =>
	turnHintKinds.includes(value as THintKind);

const rulesSections = [
	{
		title: 'Цель',
		content: ['Первым получить 10 уровень.'],
	},
	{
		title: 'Ход',
		content: [
			'В начале хода можно сыграть карты, экипировать предметы и применить доступные эффекты.',
			'Затем открывается карта события: враг начинает бой, проклятие или эффект применяется сразу, другую карту можно взять в руку или применить.',
			'Если боя не было, выбери одно действие: вызвать врага из руки или взять скрытую карту события.',
		],
	},
	{
		title: 'Бой',
		content: [
			'Сравнивается сила персонажа и сила врага.',
			'Чтобы победить, сила персонажа должна быть больше силы врага. При равенстве побеждает враг.',
		],
	},
	{
		title: 'Ограничения в бою',
		content: [
			'Во время боя нельзя менять экипировку, продавать предметы или выполнять подготовительные действия.',
			'Разрешены только карты и эффекты, которые можно применять в бою.',
			'Оппонент может вмешиваться в бой: усиливать врага, добавлять новых врагов или применять эффекты, если его карты это позволяют.',
		],
	},
	{
		title: 'Победа в бою',
		content: ['За победу над врагом игрок получает уровни и карты награды.'],
	},
	{
		title: 'Поражение',
		content: [
			'Если победить нельзя, игра проверяет попытку сбежать.',
			'При успехе бой заканчивается без награды. При провале применяется эффект поражения от врага.',
		],
	},
	{
		title: 'Конец хода',
		content: ['В конце хода в руке должно быть не больше 5 карт. Лишние карты сбрасываются.'],
	},
	{
		title: 'Победа',
		content: [
			'Игра заканчивается, когда игрок получает 10 уровень.',
			'Обычно 10 уровень можно получить только за победу в бою.',
		],
	},
];

const Field = ({ setIsModalOpen }: TFieldProps) => {
	const dispatch = useDispatch();
	const playerArenaRef = useRef<HTMLDivElement>(null);
	const rulesHelpRef = useRef<HTMLDivElement>(null);
	const [game, setGame] = useState<GameState>(() => createInitialDuelGame());
	const [isRulesOpen, setIsRulesOpen] = useState(false);
	const [isShuffling, setIsShuffling] = useState(true);
	const [isSaveReady, setIsSaveReady] = useState(false);
	const [saveStatus, setSaveStatus] = useState<TSaveStatus>('idle');
	const [hintKind, setHintKind] = useState<THintKind>('gameStart');
	const [treasureDrawsAvailable, setTreasureDrawsAvailable] = useState(0);
	const [handLimitTarget, setHandLimitTarget] = useState<'eventReveal' | 'turnEnd'>(
		'turnEnd'
	);
	const playerHand = useSelector(getPlayerHandCard);
	const playerArena = useSelector(getPlayerArenaCard);
	const inventory = useSelector(getInventory);
	const inventoryState = useSelector((state) => state.inventory);
	const { isOver, setNodeRef: setArenaNodeRef } = useDropField();
	const shuffleTimerRef = useRef<number | null>(null);
	const saveStatusTimerRef = useRef<number | null>(null);
	const setPlayerArenaRef = useCallback(
		(node: HTMLDivElement | null) => {
			playerArenaRef.current = node;
			setArenaNodeRef(node);
		},
		[setArenaNodeRef]
	);
	const clearShuffleTimer = useCallback(() => {
		if (shuffleTimerRef.current === null) return;

		window.clearTimeout(shuffleTimerRef.current);
		shuffleTimerRef.current = null;
	}, []);
	const clearSaveStatusTimer = useCallback(() => {
		if (saveStatusTimerRef.current === null) return;

		window.clearTimeout(saveStatusTimerRef.current);
		saveStatusTimerRef.current = null;
	}, []);
	const startNewGame = useCallback(
		async (shouldClearSave = false) => {
			if (shouldClearSave) {
				try {
					await clearGameSnapshot();
				} catch {
					setSaveStatus('error');
				}
			}

			clearShuffleTimer();
			clearSaveStatusTimer();
			const initialGame = createInitialDuelGame();
			setIsSaveReady(false);
			setGame({ ...initialGame, phase: 'setup' });
			dispatch(resetInventory());
			dispatch(resetPlayerArena());
			dispatch(clearDraggableCard());
			dispatch(setHand([]));
			setIsShuffling(true);
			setHintKind('gameStart');
			setTreasureDrawsAvailable(0);
			setHandLimitTarget('turnEnd');
			setSaveStatus('idle');

			shuffleTimerRef.current = window.setTimeout(() => {
				setGame({ ...initialGame, phase: 'turnPreparation' });
				dispatch(setHand(initialGame.players[0].hand));
				setIsShuffling(false);
				setHintKind('turnPreparation');
				setIsSaveReady(true);
				shuffleTimerRef.current = null;
			}, 1200);
		},
		[clearSaveStatusTimer, clearShuffleTimer, dispatch]
	);
	const saveCurrentGame = useCallback(async (showFeedback = false) => {
		if (!isSaveReady || isShuffling) return;

		if (showFeedback) {
			clearSaveStatusTimer();
			setSaveStatus('saving');
		}
		try {
			await saveGameSnapshot({
				game,
				ui: {
					handLimitTarget,
					hintKind,
					treasureDrawsAvailable,
				},
				redux: {
					inventory: inventoryState,
					playerArena,
				},
			});
			if (showFeedback) {
				setSaveStatus('saved');
				saveStatusTimerRef.current = window.setTimeout(() => {
					setSaveStatus('idle');
					saveStatusTimerRef.current = null;
				}, 1800);
			}
		} catch {
			setSaveStatus('error');
		}
	}, [
		clearSaveStatusTimer,
		game,
		handLimitTarget,
		hintKind,
		inventoryState,
		isSaveReady,
		isShuffling,
		playerArena,
		treasureDrawsAvailable,
	]);
	const humanPlayer = getPlayer(game, game.humanPlayerId);
	const botPlayer = getPlayer(game, game.botPlayerId);
	const isHumanTurn = game.currentPlayerId === game.humanPlayerId;
	const encounterCard = game.revealedEvent ?? game.combat?.enemyCard ?? null;
	const humanPower = humanPlayer.level + inventory.score;
	const combatStats =
		game.combat && game.combat.attackerPlayerId === game.humanPlayerId
			? {
					...game.combat,
					playerPower: humanPower,
					margin: humanPower - game.combat.enemyPower,
					isWinning: humanPower - game.combat.enemyPower > 0,
					requiredPowerToWin: game.combat.enemyPower + 1 - humanPower,
				}
			: game.combat;
	const phase = isShuffling
		? 'shuffle'
		: game.phase === 'turnPreparation'
			? 'preparation'
			: game.phase === 'eventReveal'
			? 'kickDoor'
			: game.phase === 'postEventChoice'
				? encounterCard
					? 'doorRevealed'
					: 'choice'
				: game.phase === 'combat'
					? 'combat'
					: game.phase === 'handLimit' || game.phase === 'reward'
						? 'charity'
						: game.phase === 'gameOver'
							? 'finished'
							: 'kickDoor';

	useEffect(() => {
		let isMounted = true;

		loadGameSnapshot()
			.then((snapshot) => {
				if (!isMounted) return;

				if (!snapshot) {
					void startNewGame();
					return;
				}

				clearShuffleTimer();
				setGame(snapshot.game);
				dispatch(setInventory(snapshot.redux.inventory));
				dispatch(setPlayerArena(snapshot.redux.playerArena));
				dispatch(clearDraggableCard());
				dispatch(setHand(getPlayer(snapshot.game, snapshot.game.humanPlayerId).hand));
				setIsShuffling(false);
				setHintKind(
					isTurnHintKind(snapshot.ui.hintKind)
						? snapshot.ui.hintKind
						: 'turnPreparation'
				);
				setTreasureDrawsAvailable(snapshot.ui.treasureDrawsAvailable);
				setHandLimitTarget(snapshot.ui.handLimitTarget);
				setIsSaveReady(true);
				setSaveStatus('idle');
			})
			.catch(() => {
				if (isMounted) {
					void startNewGame();
				}
			});

		return () => {
			isMounted = false;
			clearShuffleTimer();
			clearSaveStatusTimer();
		};
	}, [clearSaveStatusTimer, clearShuffleTimer, dispatch, startNewGame]);

	useEffect(() => {
		if (isShuffling || game.currentPlayerId !== game.botPlayerId || game.phase === 'gameOver') {
			return;
		}

		setHintKind(game.phase === 'combat' ? 'botCombat' : 'botThinking');
		const botTimer = window.setTimeout(() => {
			setGame((prev) => {
				const next = runBotTurn(prev);
				if (next.currentPlayerId === next.humanPlayerId && next.phase !== 'gameOver') {
					setHandLimitTarget('turnEnd');
					setHintKind('turnPreparation');
					return { ...next, phase: 'turnPreparation' };
				}
				setHintKind(next.phase === 'gameOver' ? 'gameWin' : 'botTurn');
				return next;
			});
		}, 900);

		return () => window.clearTimeout(botTimer);
	}, [game.currentPlayerId, game.phase, game.botPlayerId, isShuffling]);

	useEffect(() => {
		if (!isRulesOpen) return;

		const handlePointerDown = (event: MouseEvent) => {
			if (rulesHelpRef.current?.contains(event.target as Node)) return;

			setIsRulesOpen(false);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsRulesOpen(false);
			}
		};

		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isRulesOpen]);

	useEffect(() => {
		dispatch(setHand(humanPlayer.hand));
	}, [dispatch, humanPlayer.hand]);

	useEffect(() => {
		const handleInventoryCardEquipped = (event: Event) => {
			const { ownerId, equippedCard, returnedCards } = (
				event as CustomEvent<{
					equippedCard: GameCard;
					ownerId: 'human' | 'bot';
					returnedCards: GameCard[];
				}>
			).detail;

			if (ownerId !== 'human') return;

			setGame((prev) =>
				updatePlayer(prev, prev.humanPlayerId, (player) => {
					const handWithoutEquipped = player.hand.filter(
						(card) => card.cardKey !== equippedCard.cardKey
					);
					const existingCardKeys = new Set(
						handWithoutEquipped.map((card) => card.cardKey)
					);
					const cardsToReturn = returnedCards.filter(
						(card) => !existingCardKeys.has(card.cardKey)
					);

					return {
						...player,
						hand: [...handWithoutEquipped, ...cardsToReturn],
					};
				})
			);
		};

		window.addEventListener('inventory-card-equipped', handleInventoryCardEquipped);

		return () => {
			window.removeEventListener('inventory-card-equipped', handleInventoryCardEquipped);
		};
	}, []);

	useEffect(() => {
		if (hintKind !== 'enemyRevealed' || game.phase !== 'combat') return;

		const combatHintTimer = window.setTimeout(() => setHintKind('combat'), 900);

		return () => window.clearTimeout(combatHintTimer);
	}, [game.phase, hintKind]);

	const drawCard = (deckType: 'adventures' | 'treasures') => {
		if (isShuffling) return;
		if (!isHumanTurn) return;
		if (deckType === 'adventures' && game.phase !== 'eventReveal') return;
		if (deckType === 'treasures' && treasureDrawsAvailable <= 0) return;

		if (deckType === 'adventures') {
			setGame((prev) => {
				const [afterDraw, nextCard] = drawEvent(prev);
				if (!nextCard) return addLog(afterDraw, prev.humanPlayerId, 'Колода событий пуста.');
				const currentHuman = getPlayer(afterDraw, afterDraw.humanPlayerId);
				if (nextCard.card.subtype === CardSubType.creature) {
					const enemyPower = 'strength' in nextCard.card ? nextCard.card.strength : 0;
					setHintKind('enemyRevealed');
					return addLog(
						{
							...afterDraw,
							phase: 'combat',
							revealedEvent: nextCard,
							combat: {
								attackerPlayerId: currentHuman.id,
								enemyCard: nextCard,
								playerPower: humanPower,
								enemyPower,
								margin: humanPower - enemyPower,
								isWinning: humanPower > enemyPower,
								requiredPowerToWin: enemyPower + 1 - humanPower,
								expectedRewardCards: 'loot' in nextCard.card ? nextCard.card.loot : 0,
								expectedLevelGain: 'level' in nextCard.card ? nextCard.card.level : 0,
								canReachWinningLevel:
									currentHuman.level + ('level' in nextCard.card ? nextCard.card.level : 0) >=
									10,
							},
						},
						prev.humanPlayerId,
						`Ты открыл врага: ${nextCard.card.title}.`
					);
				}
				setHintKind(
					nextCard.card.subtype === CardSubType.spell ? 'eventEffect' : 'eventCard'
				);
				return addLog(
					{
						...afterDraw,
						phase: 'postEventChoice',
						revealedEvent: nextCard,
					},
					prev.humanPlayerId,
					`Ты открыл карту: ${nextCard.card.title}.`
				);
			});
		} else {
			setGame((prev) => {
				const [afterDraw, reward] = drawReward(prev);
				if (!reward) return afterDraw;
				setTreasureDrawsAvailable((value) => Math.max(0, value - 1));
				setHintKind(treasureDrawsAvailable > 1 ? 'reward' : 'handLimit');
				return updatePlayer(afterDraw, prev.humanPlayerId, (player) => ({
					...player,
					hand: [...player.hand, reward],
				}));
			});
		}
	};

	const keepDoorCard = () => {
		if (!encounterCard) return;
		setGame((prev) => {
			const card = prev.revealedEvent;
			if (!card) return prev;
			setHintKind('postEventChoice');
			return updatePlayer(
				{
					...prev,
					phase: 'postEventChoice',
					revealedEvent: null,
				},
				prev.humanPlayerId,
				(player) => ({ ...player, hand: [...player.hand, card] })
			);
		});
	};

	const lootRoom = () => {
		if (game.phase !== 'postEventChoice' || encounterCard) return;
		setGame((prev) => {
			const [afterDraw, card] = drawEvent(prev);
			if (!card) return afterDraw;
			setHintKind('handLimit');
			return updatePlayer(
				{
					...afterDraw,
					phase: 'handLimit',
				},
				prev.humanPlayerId,
				(player) => ({ ...player, hand: [...player.hand, card] })
			);
		});
	};

	const startTrouble = (monster: GameCard) => {
		if (game.phase !== 'postEventChoice' || encounterCard) return;
		if (monster.card.subtype !== CardSubType.creature) return;
		setGame((prev) => {
			const currentHuman = getPlayer(prev, prev.humanPlayerId);
			const enemyPower = 'strength' in monster.card ? monster.card.strength : 0;
			setHintKind('enemyRevealed');
			return updatePlayer(
				{
					...prev,
					phase: 'combat',
					revealedEvent: monster,
					combat: {
						attackerPlayerId: currentHuman.id,
						enemyCard: monster,
						playerPower: humanPower,
						enemyPower,
						margin: humanPower - enemyPower,
						isWinning: humanPower > enemyPower,
						requiredPowerToWin: enemyPower + 1 - humanPower,
						expectedRewardCards: 'loot' in monster.card ? monster.card.loot : 0,
						expectedLevelGain: 'level' in monster.card ? monster.card.level : 0,
						canReachWinningLevel:
							currentHuman.level + ('level' in monster.card ? monster.card.level : 0) >= 10,
					},
				},
				prev.humanPlayerId,
				(player) => ({
					...player,
					hand: player.hand.filter((card) => card.cardKey !== monster.cardKey),
				})
			);
		});
	};

	const resolveCombatWin = () => {
		if (!combatStats?.isWinning) return;
		const combat = combatStats;
		setTreasureDrawsAvailable(combat.expectedRewardCards);
		setHintKind(combat.expectedRewardCards > 0 ? 'combatWin' : 'handLimit');
		setGame((prev) => {
			const enemy = prev.combat?.enemyCard;
			if (!enemy || !prev.combat) return prev;
			const withLevel = updatePlayer(prev, prev.humanPlayerId, (player) => ({
				...player,
				level: Math.min(10, player.level + prev.combat!.expectedLevelGain),
			}));
			return checkWinner(
				discardEvent(
					addLog(
						{
							...withLevel,
							phase: 'reward',
							revealedEvent: null,
							combat: null,
						},
						prev.humanPlayerId,
						`Ты победил ${enemy.card.title}.`
					),
					enemy
				)
			);
		});
	};

	const resolveCombatLoss = () => {
		setGame((prev) => {
			const enemy = prev.combat?.enemyCard ?? prev.revealedEvent;
			const next = {
				...prev,
				phase: 'handLimit' as const,
				revealedEvent: null,
				combat: null,
			};
			return enemy ? discardEvent(next, enemy) : next;
		});
		setHintKind('escape');
	};

	const discardForCharity = (card: GameCard) => {
		if (game.phase !== 'handLimit' && game.phase !== 'reward') return;
		if (humanPlayer.hand.length <= 5) return;
		setGame((prev) => {
			const afterDiscard = updatePlayer(prev, prev.humanPlayerId, (player) => ({
				...player,
				hand: player.hand.filter((item) => item.cardKey !== card.cardKey),
			}));
			return card.card.type === 'treasures'
				? discardReward(afterDiscard, card)
				: discardEvent(afterDiscard, card);
		});
		setHintKind('handLimit');
	};

	const readyForEventReveal = () => {
		if (game.phase !== 'turnPreparation') return;
		if (humanPlayer.hand.length > 5) {
			setHandLimitTarget('eventReveal');
			setHintKind('handLimit');
			setGame((prev) => ({
				...prev,
				phase: 'handLimit',
			}));
			return;
		}

		setHintKind('eventReveal');
		setGame((prev) => ({
			...prev,
			phase: 'eventReveal',
		}));
	};

	const finishTurn = () => {
		if (humanPlayer.hand.length > 5 || treasureDrawsAvailable > 0) return;
		if (handLimitTarget === 'eventReveal') {
			setHandLimitTarget('turnEnd');
			setHintKind('eventReveal');
			setGame((prev) => ({
				...prev,
				phase: 'eventReveal',
			}));
			return;
		}

		setGame((prev) => passTurn(addLog(prev, prev.humanPlayerId, 'Ты завершил ход.')));
		setHintKind('botTurn');
	};

	const getDeckLayers = (deckType: 'adventures' | 'treasures') => {
		const remainingCards =
			deckType === 'adventures' ? game.eventDeck.length : game.rewardDeck.length;
		if (remainingCards === 0) return 0;

		return Math.max(
			1,
			Math.ceil((remainingCards / deckSizes[deckType]) * maxVisibleDeckLayers)
		);
	};

	const getTurnHint = (): TTurnHint => {
		const activePlayer = isHumanTurn ? humanPlayer : botPlayer;
		const playerMeta = `${activePlayer.name} · уровень ${activePlayer.level}`;

		if (game.winnerPlayerId) {
			const winner = getPlayer(game, game.winnerPlayerId);
			return {
				title: 'Победа',
				text: [`${winner.name} получает 10 уровень и выигрывает дуэль.`],
			};
		}

		if (game.currentPlayerId === game.botPlayerId) {
			if (hintKind === 'botCombat' || game.phase === 'combat') {
				return {
					title: 'Бой бота',
					text: ['Бот сравнивает свою силу с силой врага и выбирает допустимые карты.'],
				};
			}

			return hintKind === 'botThinking'
				? {
						title: 'Ход бота',
						text: ['Бот оценивает доступные действия.'],
					}
				: {
						title: 'Ход бота',
						text: [
							'Бот выполняет свой ход автоматически.',
							'Действия бота отображаются в журнале игры.',
						],
					};
		}

		if (game.phase === 'combat' && combatStats && hintKind !== 'enemyRevealed') {
			return {
				title: 'Бой',
				meta: `${humanPlayer.name}: ${combatStats.playerPower} силы · Враг: ${combatStats.enemyPower} силы`,
				text: [
					combatStats.isWinning
						? 'Вы побеждаете по силе. Оппонент может вмешаться картами.'
						: 'Силы недостаточно для победы. Используйте боевые карты или перейдите к бегству.',
				],
			};
		}

		switch (hintKind) {
			case 'gameStart':
				return {
					title: 'Дуэль началась',
					text: [`Игрок против бота. Первым ходит ${humanPlayer.name}.`],
				};
			case 'turnPreparation':
				return {
					title: 'Подготовка хода',
					meta: playerMeta,
					text: [
						'Можно сыграть карты, экипировать предметы и применить доступные эффекты.',
						'Когда будете готовы, откройте событие.',
					],
				};
			case 'eventReveal':
				return {
					title: 'Открытие события',
					meta: playerMeta,
					text: ['Нажмите на колоду событий, чтобы открыть верхнюю карту.'],
				};
			case 'enemyRevealed':
				return {
					title: 'Враг обнаружен',
					meta: playerMeta,
					text: ['Открытый враг начинает бой.'],
				};
			case 'eventEffect':
				return {
					title: 'Эффект события',
					meta: playerMeta,
					text: ['Открытая карта применяется сразу.'],
				};
			case 'eventCard':
				return {
					title: 'Карта события',
					meta: playerMeta,
					text: ['Эту карту можно взять в руку или применить, если она доступна.'],
				};
			case 'postEventChoice':
				return {
					title: 'Выбор действия',
					meta: playerMeta,
					text: ['Выберите: вызвать врага из руки или взять скрытую карту события.'],
				};
			case 'combatRestrictions':
				return {
					title: 'Бой',
					text: [
						'Во время боя нельзя менять экипировку, продавать предметы или выполнять подготовительные действия.',
						'Разрешены только карты и эффекты, применимые в бою.',
					],
				};
			case 'intervention':
				return {
					title: 'Вмешательство',
					text: [
						'Оппонент может усилить врага, добавить нового врага или применить боевой эффект.',
					],
				};
			case 'combatWin':
				return {
					title: 'Победа в бою',
					text: ['Враг побеждён. Получите уровни и карты награды.'],
				};
			case 'reward':
				return {
					title: 'Награда',
					text: [
						'Возьмите карты из колоды наград.',
						'После получения награды ход перейдёт к завершению.',
					],
				};
			case 'combatLoss':
				return {
					title: 'Поражение в бою',
					text: ['Победить врага не удалось. Начинается попытка бегства.'],
				};
			case 'escape':
				return {
					title: 'Бегство',
					text: [
						'Игра проверяет, удалось ли избежать последствий боя.',
						'При провале применяется эффект поражения от врага.',
					],
				};
			case 'defeatEffect':
				return {
					title: 'Эффект поражения',
					text: ['Применяется эффект, указанный на карте врага.'],
				};
			case 'handLimit':
				return {
					title:
						handLimitTarget === 'eventReveal'
							? 'Подготовка руки'
							: 'Конец хода',
					text: [
						'В руке должно быть не больше 5 карт.',
						humanPlayer.hand.length > 5
							? 'Нажмите лишние карты в руке, чтобы сбросить их.'
							: handLimitTarget === 'eventReveal'
								? 'Теперь нажмите Готов, чтобы открыть событие.'
								: 'Теперь можно завершить ход.',
					],
				};
			default:
				return {
					title: 'Открытие события',
					meta: playerMeta,
					text: ['Нажмите на колоду событий, чтобы открыть верхнюю карту.'],
				};
		}
	};

	const botHandSlots = Array.from({ length: botPlayer.hand.length }).map(
		(_, index) => `bot-card-${index + 1}`
	);
	const turnHint = getTurnHint();

	return (
		<div
			className={clsx(styles.fieldContainer, {
				[styles.fieldContainerRulesOpen]: isRulesOpen,
			})}
		>
			<img className={styles.fieldLayout} src={field} alt="Игровое поле" />
			<div className={styles.field}>
				<div className={styles.rulesHelp} ref={rulesHelpRef}>
					<button
						aria-label="Сохранить игру"
						className={styles.utilityButton}
						data-status={saveStatus}
						data-tooltip="Сохранить игру"
						type="button"
						onClick={() => void saveCurrentGame(true)}
						disabled={!isSaveReady || isShuffling || saveStatus === 'saving'}
					>
						<img className={styles.utilityIcon} src={saveIcon} alt="" aria-hidden="true" />
					</button>
					<button
						aria-label="Новая игра"
						className={styles.utilityButton}
						data-tooltip="Новая игра"
						type="button"
						onClick={() => void startNewGame(true)}
					>
						<img className={styles.utilityIcon} src={refreshIcon} alt="" aria-hidden="true" />
					</button>
					<button
						aria-controls="rules-panel"
						aria-expanded={isRulesOpen}
						aria-label="Открыть правила"
						className={clsx(styles.utilityButton, styles.rulesButton)}
						data-tooltip="Правила"
						type="button"
						onClick={() => setIsRulesOpen((value) => !value)}
					>
						<img className={styles.utilityIcon} src={helpIcon} alt="" aria-hidden="true" />
					</button>
					{isRulesOpen && (
						<aside className={styles.rulesPanel} id="rules-panel" aria-label="Правила">
							<div className={styles.rulesHeader}>
								<strong>Правила</strong>
								<button
									aria-label="Закрыть правила"
									className={styles.rulesCloseButton}
									type="button"
									onClick={() => setIsRulesOpen(false)}
								>
									<img className={styles.rulesCloseIcon} src={closeIcon} alt="" aria-hidden="true" />
								</button>
							</div>
							<div className={styles.rulesScroll}>
								<div className={styles.rulesContent}>
									{rulesSections.map((section) => (
										<section className={styles.rulesSection} key={section.title}>
											<h2>{section.title}</h2>
											{section.content.map((text) => (
												<p key={text}>{text}</p>
											))}
										</section>
									))}
								</div>
							</div>
						</aside>
					)}
				</div>
				<aside className={styles.turnHud}>
					<span className={styles.phaseTitle}>{turnHint.title}</span>
					{turnHint.meta && <span className={styles.turnBadge}>{turnHint.meta}</span>}
					<div className={styles.phaseStatus}>
						{turnHint.text.map((text) => (
							<span key={text}>{text}</span>
						))}
					</div>
					<div className={styles.phaseActions}>
						{phase === 'preparation' && (
							<button
								className={clsx(styles.actionButton, styles.readyButton)}
								type="button"
								onClick={readyForEventReveal}
							>
								Готов
							</button>
						)}
						{phase === 'doorRevealed' && (
							<button className={styles.actionButton} type="button" onClick={keepDoorCard}>
								В руку
							</button>
						)}
						{phase === 'choice' && (
							<>
								<button className={styles.actionButton} type="button" onClick={lootRoom}>
									Взять скрытое событие
								</button>
								<span className={styles.actionHint}>или выбери врага в руке</span>
							</>
						)}
						{phase === 'combat' && (
							<>
								<button
									className={styles.actionButton}
									type="button"
									onClick={resolveCombatWin}
									disabled={!combatStats?.isWinning}
								>
									Победа
								</button>
								<button
									className={styles.actionButton}
									type="button"
									onClick={resolveCombatLoss}
								>
									Бегство
								</button>
							</>
						)}
						{phase === 'charity' && (
							<>
								<button
									className={clsx(styles.actionButton, {
										[styles.readyButton]: handLimitTarget === 'eventReveal',
									})}
									type="button"
									onClick={finishTurn}
									disabled={humanPlayer.hand.length > 5 || treasureDrawsAvailable > 0}
								>
									{handLimitTarget === 'eventReveal' ? 'Готов' : 'Завершить ход'}
								</button>
								{humanPlayer.hand.length > 5 && (
									<span className={styles.actionHint}>сбрось лишние карты кликом</span>
								)}
							</>
						)}
					</div>
					<div className={styles.gameLog}>
						{game.log.slice(-4).map((entry) => (
							<span key={entry.id}>{entry.text}</span>
						))}
					</div>
				</aside>
				<section className={styles.enemyZone}>
					<div className={clsx(styles.hand, styles.enemyHand)}>
						{(botHandSlots.length > 0 ? botHandSlots : enemyHandSlots.slice(0, 1)).map((slot) => (
							<div className={styles.cardBack} key={slot} />
						))}
					</div>
				</section>
				<section className={styles.arena}>
					<div className={styles.enemyArena}>
					</div>
					<div className={styles.encounterZone}>
						<div
							className={clsx(styles.encounterSlot, {
								[styles.activeEncounter]: Boolean(encounterCard),
							})}
						>
							{encounterCard ? (
								<>
									<MiniCard setIsModalOpen={setIsModalOpen} {...encounterCard} />
									<span className={styles.encounterCardTitle}>
										{encounterCard.card.title}
									</span>
								</>
							) : null}
						</div>
					</div>
					<div
						className={clsx(styles.playerArena, {
							[styles.dragOverArena]: isOver,
						})}
						ref={setPlayerArenaRef}
					>
						{playerArena.length > 0 &&
							playerArena.map((item) => (
								<MiniCard key={item.cardKey} setIsModalOpen={setIsModalOpen} {...item} />
							))}
					</div>
					<fieldset className={styles.deckControls}>
						<legend className={styles.visuallyHidden}>Колоды</legend>
						<button
							className={clsx(styles.deckButton, {
								[styles.activeDeck]: phase === 'kickDoor',
								[styles.shufflingDeck]: isShuffling,
								[styles.emptyDeck]: getDeckLayers('adventures') === 0,
							})}
							type="button"
							onClick={() => drawCard('adventures')}
							disabled={isShuffling || phase !== 'kickDoor' || game.eventDeck.length === 0}
						>
							<span className={styles.deckTitle}>События</span>
							<span className={styles.deckStack}>
								{deckLayerSlots.slice(0, getDeckLayers('adventures')).map((layer) => (
									<span
										className={styles.deckLayer}
										key={`adventures-${layer.id}`}
										style={
											{
												'--layer-index': layer.index,
											} as CSSProperties
										}
									/>
								))}
							</span>
						</button>
						<button
							className={clsx(styles.deckButton, styles.treasureDeck, {
								[styles.activeDeck]: treasureDrawsAvailable > 0,
								[styles.shufflingDeck]: isShuffling,
								[styles.emptyDeck]: getDeckLayers('treasures') === 0,
							})}
							type="button"
							onClick={() => drawCard('treasures')}
							disabled={
								isShuffling || treasureDrawsAvailable <= 0 || game.rewardDeck.length === 0
							}
						>
							<span className={styles.deckTitle}>Награды</span>
							<span className={styles.deckStack}>
								{deckLayerSlots.slice(0, getDeckLayers('treasures')).map((layer) => (
									<span
										className={styles.deckLayer}
										key={`treasures-${layer.id}`}
										style={
											{
												'--layer-index': layer.index,
											} as CSSProperties
										}
									/>
								))}
							</span>
						</button>
					</fieldset>
				</section>
				<section className={styles.playerZone}>
					<section className={clsx(styles.hand, styles.playerHand)}>
						{playerHand.length > 0 &&
							playerHand.map((item, index) => (
								<div
									className={styles.handCard}
									key={item.cardKey}
									style={
										{
											'--card-index': index,
											'--card-count': playerHand.length,
										} as CSSProperties
									}
								>
									<Card
										{...item}
										isActionable={
											(phase === 'choice' && item.card.subtype === CardSubType.creature) ||
											(phase === 'charity' && playerHand.length > 5)
										}
										onCardClick={phase === 'charity' ? discardForCharity : startTrouble}
									/>
								</div>
							))}
					</section>
				</section>
			</div>
		</div>
	);
};

export default Field;
