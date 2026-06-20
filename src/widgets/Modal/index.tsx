import CardView from '@widgets/Сard/CardView';
import type { TChangeModalParams } from '@shared/types/utilityTypes';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import styles from './style.module.scss';

const Modal = ({ isOpen, hoveredCard }: TChangeModalParams) => {
	const modal = document.getElementById('root');
	if (!modal) return null;

	return createPortal(
		<div
			className={clsx(styles.modal, {
				[styles.modalOpen]: isOpen,
			})}
		>
			<div className={styles.content}>
				{hoveredCard && (
					<div className={styles.cardPreview}>
						<CardView {...hoveredCard} />
					</div>
				)}
			</div>
		</div>,
		modal
	);
};

export default Modal;
