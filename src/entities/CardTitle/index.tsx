import { clsx } from 'clsx';
import React from 'react';
import { TCardTitleProps } from '@entities/CardTitle/types';
import styles from './style.module.scss';

const CardTitle = ({ title, extraClass }: TCardTitleProps) => (
	<div
		className={clsx(
			styles.title,
			{
				[styles.titleCompressed]: title.length > 24,
			},
			extraClass
		)}
	>
		{title}
	</div>
);

export default CardTitle;
