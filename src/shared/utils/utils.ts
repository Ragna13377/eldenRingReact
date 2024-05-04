import { RefObject } from 'react';

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
export const getEnumKeyByValue = <T extends string>(
	enumObj: Record<string, T>,
	value: T
): string =>
	Object.keys(enumObj).find((key) => enumObj[key] === value) as string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T extends (...args: any[]) => any>(
	callee: T,
	timeout: number
) => {
	let timer: NodeJS.Timeout | null = null;
	return function perform(...args: Parameters<T>) {
		if (!timer) {
			timer = setTimeout(() => {
				timer = null;
				callee(...args);
			}, timeout);
		}
	};
};
