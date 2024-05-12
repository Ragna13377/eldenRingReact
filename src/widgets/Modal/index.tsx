import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { useSelector } from '@/app/store';
import { getPlayerArenaCardById } from '@shared/services/PlayerArena/selectors';
import { TChangeModalParams } from '@shared/types/utilityTypes';
import CardTitle from '@entities/CardTitle';
import FlavourText from '@entities/FlavourText';
import styles from './style.module.scss';

const Modal = ({ isOpen, hoveredCardKey }: TChangeModalParams) => {
	const modal = document.getElementById('root');
	const hoveredCard = useSelector(getPlayerArenaCardById(hoveredCardKey));
	return createPortal(
		<div
			className={clsx(styles.modal, {
				[styles.modalOpen]: isOpen,
			})}
		>
			<div className={styles.content}>
				{hoveredCard && (
					<>
						<FlavourText
							fontExtraClass={styles.modalFont}
							card={hoveredCard.card}
						/>
						<CardTitle
							title={hoveredCard.card.title}
							extraClass={styles.modalTitle}
						/>
					</>
				)}
			</div>
		</div>,
		modal!
	);
};

export default Modal;
