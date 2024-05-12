import { ReactNode } from 'react';
import { TCard } from '@shared/types/cardTypes';

export type TCardContentProps = {
	card: TCard;
	extraContentStyle?: string;
	children?: ReactNode;
};
