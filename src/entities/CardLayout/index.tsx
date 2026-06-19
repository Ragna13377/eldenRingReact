import type { TCardLayoutProps } from '@entities/CardLayout/types';
import { clsx } from 'clsx';
import styles from './style.module.scss';

const CardLayout = ({ image, title, layout, imageExtraClass }: TCardLayoutProps) => (
	<div className={styles.layoutContainer}>
		<img className={clsx(styles.image, imageExtraClass)} src={image} alt={title} />
		<img className={styles.layout} src={layout} alt="" />
	</div>
);

export default CardLayout;
