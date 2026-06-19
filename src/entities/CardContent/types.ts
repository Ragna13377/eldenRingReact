import type { TCard } from '@shared/types/cardTypes';
import type { ReactNode } from 'react';

export type TCardContentProps = {
	card: TCard;
	extraContentStyle?: string;
	children?: ReactNode;
};
