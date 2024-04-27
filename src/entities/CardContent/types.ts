import { TCard } from '@shared/types';
import { ReactNode } from 'react';

export type TCardContentProps = {
	card: TCard;
	extraContentStyle?: string;
	children?: ReactNode;
};
