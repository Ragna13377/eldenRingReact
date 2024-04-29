import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '@/app/store';
import { setHand, getPlayerHandCard } from '@shared/services/PlayerHand/slice';
import { getPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { TChangeModalParams, TKey } from '@shared/types';
import { creatures } from '@shared/storage/creatures';
import Card from '@widgets/Сard';
import MiniCard from '@widgets/MiniCard';
import Modal from '@widgets/Modal';
import { useDropField } from '@pages/Field/hooks';
import field from '@images/field.webp';
import styles from './style.module.scss';


const Field = () => {
	const dispatch = useDispatch();
	const playerArenaRef = useRef<HTMLDivElement>(null);
	const [draggableCard, setDraggableCard] = useState<TKey>('');
	const [modalParams, setIsModalOpen] = useState<TChangeModalParams>({
		isOpen: false,
		hoverCardKey: '',
	});
	const playerHand = useSelector(getPlayerHandCard);
	const playerArena = useSelector(getPlayerArenaCard);
	const { isOver } = useDropField({ playerArenaRef, draggableCard });
	const creaturesData = useMemo(
		() =>
			creatures.slice(31, 36).map((card) => {
				const key: TKey = uuidv4();
				return { card: card, cardKey: key };
			}),
		[]
	);
	useEffect(() => {
		dispatch(setHand(creaturesData));
	}, [dispatch, creaturesData]);
	return (
		<div className={styles.fieldContainer}>
			<img className={styles.fieldLayout} src={field} alt='Игровое поле' />
			<div className={styles.field}>
				<section className={clsx(styles.hand, styles.enemyHand)} />
				<section className={styles.arena}>
					<div className={styles.enemyArena} />
					<div
						className={clsx(styles.playerArena, {
							[styles.dragOverArena]: isOver,
						})}
						ref={playerArenaRef}
					>
						{playerArena.length > 0 &&
							playerArena.map((item) => (
								<MiniCard
									key={item.cardKey}
									setIsModalOpen={setIsModalOpen}
									{...item}
								/>
							))}
					</div>
				</section>
				<section className={clsx(styles.hand, styles.playerHand)}>
					{playerHand.length > 0 &&
						playerHand.map((item) => (
							<Card
								key={item.cardKey}
								dragHandler={setDraggableCard}
								{...item}
							/>
						))}
				</section>
			</div>
			<Modal {...modalParams} />
		</div>
	);
};

export default Field;
