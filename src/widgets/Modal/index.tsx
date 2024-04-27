import React from 'react';
import { createPortal } from 'react-dom';
import { TModalProps } from '@widgets/Modal/types';
import FlavourText from '@entities/FlavourText';
import styles from './style.module.scss';
import clsx from 'clsx';


const Modal = ({ card, isOpen }: TModalProps) => {
	const modal = document.getElementById('root');
	return createPortal(
		<div
			className={clsx(styles.modal, {
				[styles.modalOpen]: isOpen,
			})}
		>
			<div className={styles.content}>
				<FlavourText card={card} />
			</div>
		</div>,
		modal!
	);
};

export default Modal;
