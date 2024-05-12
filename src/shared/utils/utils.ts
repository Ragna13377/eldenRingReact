import { RefObject } from 'react';
import { TCardWithParams, TChangeAction } from '@shared/types/utilityTypes';
import { TWeaponCard } from '@shared/types/cardTypes';

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
export function changeHoverEffect<T extends HTMLElement>(
	ref: RefObject<T>,
	style: string,
	changeAction: TChangeAction
) {
	ref.current?.classList[changeAction](style);
}
export const getEnumKeyByValue = <T extends Record<string, string>>(
	enumObj: T,
	value: T[keyof T]
): keyof T =>
	Object.keys(enumObj).find((key) => enumObj[key] === value) as T[keyof T];
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
	callee: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timeout: ReturnType<typeof setTimeout> | undefined = undefined;
	return function perform(...args: Parameters<T>) {
		if (!timeout) {
			timeout = setTimeout(() => {
				callee(...args);
				clearTimeout(timeout);
				timeout = undefined;
			}, delay);
		}
	};
};
export const isTwoHandedWeapon = (weapon: TCardWithParams | null) => {
	if (weapon) {
		const { hands } = weapon.card as TWeaponCard;
		return hands === 2;
	}
	return false;
};
