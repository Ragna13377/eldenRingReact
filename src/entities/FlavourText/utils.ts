import type { equipmentStats } from '@shared/types/commonTypes';
import { setValueSign } from '@shared/utils/utils';

export const getFlavourText = (stats: equipmentStats) => {
	let flavourText = setValueSign(stats.strength);
	flavourText += stats.escape ? ' к бегству. ' : ' к силе. ';
	if (stats?.targetClass) {
		if (stats?.targetClass?.except) {
			flavourText += `Не для ${stats.targetClass.classes.map((cl) => `${cl}a`).join(', ')}.\n`;
		} else {
			flavourText += `Только для ${stats.targetClass?.classes
				.map((cl) => `${cl}a`)
				.join(', ')}.\n`;
		}
	}
	return flavourText;
};
