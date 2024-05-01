import { setValueSign } from '@shared/utils/utils';
import { equipmentStats } from '@shared/types';

export const getFlavourText = (stats: equipmentStats) => {
	let flavourText = setValueSign(stats.strength);
	flavourText += stats.escape ? ' к бегству. ' : ' к силе. ';
	if (stats?.targetClass) {
		if (stats?.targetClass?.except) {
			flavourText += `Не для ${stats.targetClass.classes.map((cl) => cl + 'a').join(', ')}.\n`;
		} else {
			flavourText += `Только для ${
				stats.targetClass &&
				stats.targetClass.classes.map((cl) => cl + 'a').join(', ')
			}.\n`;
		}
	}
	return flavourText;
};
