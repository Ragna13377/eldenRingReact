import { RefObject } from 'react';
import { creatureRace } from '@shared/types';

export function setValueSign(value: number): string {
	return value > 0 ? `+${value}` : `${value}`;
}
export function setLevelTextSpelling(value: number): string {
	let levelSpelling = String(Math.abs(value));
	switch (levelSpelling.at(-1)) {
		case '1':
			levelSpelling += ' уровень';
			break;
		case '2':
		case '3':
		case '4':
			levelSpelling += ' уровня';
			break;
		default:
			levelSpelling += ' уровней';
			break;
	}
	return levelSpelling;
}

export function setTargetClassSpelling(
	targetClass: string[],
	changes = true
): string {
	if (changes)
		return targetClass.map((classType) => classType + 'ов').join(' и ');
	else return targetClass.join(' или ');
}

export const removeHoverEffect = <T extends HTMLElement>(
	ref: RefObject<T>,
	style: string
) => {
	ref.current?.classList.remove(style);
};
export const addHoverEffect = <T extends HTMLElement>(
	ref: RefObject<T>,
	style: string
) => {
	ref.current?.classList.add(style);
};

export const getRaceKey = (race: creatureRace): string => {
	switch (race) {
		case creatureRace.beast:
			return 'beast';
		case creatureRace.plant:
			return 'plant';
		case creatureRace.magical:
			return 'magical';
		case creatureRace.undead:
			return 'undead';
		default:
			return '';
	}
};
