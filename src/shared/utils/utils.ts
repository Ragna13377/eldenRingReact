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
