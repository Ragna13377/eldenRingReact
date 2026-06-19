import type { TCardTitleProps } from '@entities/CardTitle/types';
import { clsx } from 'clsx';
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
