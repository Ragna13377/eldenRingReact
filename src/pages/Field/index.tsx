import { clsx } from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '@/app/store';
import { setHand, getPlayerHandCard } from '@shared/services/PlayerHand/slice';
import { getPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { TChangeModalParams, TKey } from '@shared/types/utilityTypes';
import { creatures } from '@shared/storage/creatures';
import { equipments } from '@shared/storage/equipments';
import { weapons } from '@shared/storage/weapons';
import Card from '@widgets/Сard';
import MiniCard from '@widgets/MiniCard';
import Modal from '@widgets/Modal';
import { useDropField } from '@pages/Field/hooks';
import field from '@images/field.webp';
import styles from './style.module.scss';

const Field = () => {
	const dispatch = useDispatch();
	const playerArenaRef = useRef<HTMLDivElement>(null);
	const [modalParams, setIsModalOpen] = useState<TChangeModalParams>({
		isOpen: false,
		hoveredCardKey: '',
	});
	const playerHand = useSelector(getPlayerHandCard);
	const playerArena = useSelector(getPlayerArenaCard);
	const { isOver } = useDropField({ playerArenaRef });
	const cardData = useMemo(
		() =>
			equipments.slice(5, 10).map((card) => {
				const key: TKey = uuidv4();
				return { card: card, cardKey: key };
			}),
		[]
	);
	useEffect(() => {
		dispatch(setHand(cardData));
	}, [dispatch, cardData]);
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
						playerHand.map((item) => <Card key={item.cardKey} {...item} />)}
				</section>
			</div>
			<Modal {...modalParams} />
		</div>
	);
};

export default Field;
