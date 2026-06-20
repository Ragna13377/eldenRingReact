import field from '@images/field.webp';
import { useDropField } from '@pages/Field/hooks';
import { runBotTurn } from '@shared/game/bot/bot-controller';
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
import { getInventory } from '@shared/services/Inventory/slice';
import { getPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { getPlayerHandCard, setHand } from '@shared/services/PlayerHand/slice';
import { deckSizes } from '@shared/storage/decks';
import { CardSubType } from '@shared/types/commonTypes';
import type { TChangeModalParams } from '@shared/types/utilityTypes';
import MiniCard from '@widgets/MiniCard';
import Modal from '@widgets/Modal';
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
	| 'kickDoor'
	| 'doorRevealed'
	| 'combat'
	| 'choice'
	| 'charity'
	| 'finished';

const phaseText: Record<TTurnPhase, string> = {
	shuffle: 'Перетасовка',
	kickDoor: 'Вышиби дверь',
	doorRevealed: 'Реши судьбу карты',
	combat: 'Бой',
	choice: 'Неприятности или нычки',
	charity: 'От щедрот',
	finished: 'Ход завершён',
};

const Field = () => {
	const dispatch = useDispatch();
	const playerArenaRef = useRef<HTMLDivElement>(null);
	const [modalParams, setIsModalOpen] = useState<TChangeModalParams>({
		isOpen: false,
		hoveredCardKey: '',
	});
	const [game, setGame] = useState<GameState>(() => createInitialDuelGame());
	const [isShuffling, setIsShuffling] = useState(true);
	const [statusText, setStatusText] = useState('Колоды перемешиваются.');
	const [treasureDrawsAvailable, setTreasureDrawsAvailable] = useState(0);
	const playerHand = useSelector(getPlayerHandCard);
	const playerArena = useSelector(getPlayerArenaCard);
	const inventory = useSelector(getInventory);
	const { isOver, setNodeRef: setArenaNodeRef } = useDropField();
	const setPlayerArenaRef = useCallback(
		(node: HTMLDivElement | null) => {
			playerArenaRef.current = node;
			setArenaNodeRef(node);
		},
		[setArenaNodeRef]
	);
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
		const initialGame = createInitialDuelGame();
		setGame({ ...initialGame, phase: 'setup' });
		dispatch(setHand([]));
		setIsShuffling(true);
		setStatusText('Колоды перемешиваются.');
		setTreasureDrawsAvailable(0);

		const shuffleTimer = window.setTimeout(() => {
			setGame({ ...initialGame, phase: 'eventReveal' });
			dispatch(setHand(initialGame.players[0].hand));
			setIsShuffling(false);
			setStatusText('Нажми на колоду дверей, чтобы вскрыть верхнюю карту.');
		}, 1200);

		return () => window.clearTimeout(shuffleTimer);
	}, [dispatch]);

	useEffect(() => {
		if (isShuffling || game.currentPlayerId !== game.botPlayerId || game.phase === 'gameOver') {
			return;
		}

		setStatusText('Бот думает.');
		const botTimer = window.setTimeout(() => {
			setGame((prev) => {
				const next = runBotTurn(prev);
				if (next.currentPlayerId === next.humanPlayerId && next.phase !== 'gameOver') {
					setStatusText('Твой ход. Вскрой дверь.');
					return { ...next, phase: 'eventReveal' };
				}
				return next;
			});
		}, 900);

		return () => window.clearTimeout(botTimer);
	}, [game.currentPlayerId, game.phase, game.botPlayerId, isShuffling]);

	useEffect(() => {
		dispatch(setHand(humanPlayer.hand));
	}, [dispatch, humanPlayer.hand]);

	const drawCard = (deckType: 'adventures' | 'treasures') => {
		if (isShuffling) return;
		if (!isHumanTurn) return;
		if (deckType === 'adventures' && game.phase !== 'eventReveal') return;
		if (deckType === 'treasures' && treasureDrawsAvailable <= 0) return;

		if (deckType === 'adventures') {
			setGame((prev) => {
				const [afterDraw, nextCard] = drawEvent(prev);
				if (!nextCard) return addLog(afterDraw, prev.humanPlayerId, 'Колода дверей пуста.');
				const currentHuman = getPlayer(afterDraw, afterDraw.humanPlayerId);
				if (nextCard.card.subtype === CardSubType.creature) {
					const enemyPower = 'strength' in nextCard.card ? nextCard.card.strength : 0;
					setStatusText('За дверью монстр. Сравни силу и реши бой.');
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
						`Ты вскрыл монстра: ${nextCard.card.title}.`
					);
				}
				setStatusText('Это не монстр. Можно взять карту в руку.');
				return addLog(
					{
						...afterDraw,
						phase: 'postEventChoice',
						revealedEvent: nextCard,
					},
					prev.humanPlayerId,
					`Ты вскрыл карту: ${nextCard.card.title}.`
				);
			});
		} else {
			setGame((prev) => {
				const [afterDraw, reward] = drawReward(prev);
				if (!reward) return afterDraw;
				setTreasureDrawsAvailable((value) => Math.max(0, value - 1));
				setStatusText('Сокровище добавлено в руку.');
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
			setStatusText('Выбери: сыграть монстра с руки или взять вторую дверь в руку.');
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
			setStatusText('Вторая дверь взята в руку. Проверь лимит руки.');
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
			setStatusText('Монстр сыгран с руки. Реши бой.');
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
		setStatusText(
			combat.expectedRewardCards > 0
				? `Монстр побеждён. Можно взять сокровища: ${combat.expectedRewardCards}.`
				: 'Монстр побеждён. Проверь лимит руки.'
		);
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
		setStatusText('Бой проигран. Непотребство карты пока не автоматизировано.');
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
		setStatusText('Лишняя карта сброшена. В руке должно остаться не больше пяти.');
	};

	const finishTurn = () => {
		if (humanPlayer.hand.length > 5 || treasureDrawsAvailable > 0) return;
		setGame((prev) => passTurn(addLog(prev, prev.humanPlayerId, 'Ты завершил ход.')));
		setStatusText('Ход бота.');
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

	const botHandSlots = Array.from({ length: botPlayer.hand.length }).map(
		(_, index) => `bot-card-${index + 1}`
	);

	return (
		<div className={styles.fieldContainer}>
			<img className={styles.fieldLayout} src={field} alt="Игровое поле" />
			<div className={styles.field}>
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
						<span className={styles.deckTitle}>Двери</span>
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
						<span className={styles.deckTitle}>Сокровища</span>
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
				<div className={styles.rulesHelp}>
					<button className={styles.rulesButton} type="button">
						?
					</button>
					<div className={styles.rulesScroll}>
						<strong>Ход</strong>
						<span>1. Вскрой дверь. Монстр уходит в бой, другая карта может уйти в руку.</span>
						<span>2. Если монстра не было: сыграй монстра с руки или возьми вторую дверь.</span>
						<span>3. В конце оставь не больше пяти карт в руке.</span>
					</div>
				</div>
				<aside className={styles.turnHud}>
					<span className={styles.phaseTitle}>{phaseText[phase]}</span>
					<span className={styles.turnBadge}>
						{isHumanTurn ? humanPlayer.name : botPlayer.name} · уровень{' '}
						{isHumanTurn ? humanPlayer.level : botPlayer.level}
					</span>
					<span className={styles.phaseStatus}>{statusText}</span>
					{combatStats && (
						<div className={styles.combatScore}>
							<span>Ты: {combatStats.playerPower}</span>
							<span>Враг: {combatStats.enemyPower}</span>
							<span
								className={clsx({
									[styles.scoreWin]: combatStats.isWinning,
									[styles.scoreLose]: !combatStats.isWinning,
								})}
							>
								{combatStats.isWinning
									? `победа +${combatStats.margin}`
									: `не хватает ${combatStats.requiredPowerToWin}`}
							</span>
						</div>
					)}
					<div className={styles.phaseActions}>
						{phase === 'doorRevealed' && (
							<button className={styles.actionButton} type="button" onClick={keepDoorCard}>
								В руку
							</button>
						)}
						{phase === 'choice' && (
							<>
								<button className={styles.actionButton} type="button" onClick={lootRoom}>
									Чистить нычки
								</button>
								<span className={styles.actionHint}>или выбери монстра в руке</span>
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
									Смывка
								</button>
							</>
						)}
						{phase === 'charity' && (
							<>
								<button
									className={styles.actionButton}
									type="button"
									onClick={finishTurn}
									disabled={humanPlayer.hand.length > 5 || treasureDrawsAvailable > 0}
								>
									Завершить ход
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
			<Modal {...modalParams} />
		</div>
	);
};

export default Field;
