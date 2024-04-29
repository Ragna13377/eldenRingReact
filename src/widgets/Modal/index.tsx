import clsx from 'clsx';
import React from 'react';
import { createPortal } from 'react-dom';
import FlavourText from '@entities/FlavourText';
import { TChangeModalParams } from '@shared/types';
import { useSelector } from '@/app/store';
import { getPlayerArenaCardById } from '@shared/services/PlayerArena/selectors';
import CardTitle from '@entities/CardTitle';
import styles from './style.module.scss';

const Modal = ({ isOpen, hoverCardKey }: TChangeModalParams) => {
	const modal = document.getElementById('root');
	const hoverCard = useSelector(getPlayerArenaCardById(hoverCardKey));
	return createPortal(
		<div
			className={clsx(styles.modal, {
				[styles.modalOpen]: isOpen,
			})}
		>
			<div className={styles.content}>
				{hoverCard && (
					<>
						<FlavourText
							fontExtraClass={styles.modalFont}
							card={hoverCard.card}
						/>
						<CardTitle
							title={hoverCard.card.title}
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
