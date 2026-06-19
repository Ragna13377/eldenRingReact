import CardTitle from '@entities/CardTitle';
import FlavourText from '@entities/FlavourText';
import { getPlayerArenaCardById } from '@shared/services/PlayerArena/selectors';
import type { TChangeModalParams } from '@shared/types/utilityTypes';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { useSelector } from '@/app/store';
import styles from './style.module.scss';

const Modal = ({ isOpen, hoveredCardKey }: TChangeModalParams) => {
	const modal = document.getElementById('root');
	const hoveredCard = useSelector(getPlayerArenaCardById(hoveredCardKey));
	if (!modal) return null;

	return createPortal(
		<div
			className={clsx(styles.modal, {
				[styles.modalOpen]: isOpen,
			})}
		>
			<div className={styles.content}>
				{hoveredCard && (
					<>
						<FlavourText fontExtraClass={styles.modalFont} card={hoveredCard.card} />
						<CardTitle title={hoveredCard.card.title} extraClass={styles.modalTitle} />
					</>
				)}
			</div>
		</div>,
		modal
	);
};

export default Modal;
