import {
	Ability,
	abilityEffect,
	Punishment,
	punishmentEffect,
} from '@shared/types';
import {
	setLevelTextSpelling,
	setTargetClassSpelling,
	setValueSign,
} from '@shared/utils/utils';

export const AbilityAction = {
	changeEscape: {
		getDescription: (props: Ability) => {
			if (props.type !== abilityEffect.changeEscape) return null;
			const { value } = props;
			switch (value) {
				case -Infinity:
					return 'Бегство невозможно.';
				case Infinity:
					return 'Можешь пройти мимо, не вступая в битву.';
				default:
					return `${setValueSign(value)} к бегству.`;
			}
		},
	},
	changeStrength: {
		getDescription: (props: Ability) => {
			if (props.type !== abilityEffect.changeStrength) return null;
			const { value, targetClass } = props;
			if (value === -Infinity)
				return `${setTargetClassSpelling(targetClass, false)} автоматически побеждает его.`;
			else
				return `${setValueSign(value)} против ${setTargetClassSpelling(targetClass)}.`;
		},
	},
	absolutePunishment: {
		getDescription: (props: Ability) => {
			if (props.type !== abilityEffect.absolutePunishment) return null;
			const { value } = props;
			return `Даже при успешном бегстве теряешь ${setLevelTextSpelling(value)}.`;
		},
	},
	onlyCharacteristic: {
		getDescription: (props: Ability) => {
			if (props.type !== abilityEffect.onlyCharacteristic) return null;
			const { value } = props;
			switch (value) {
				case 'level':
					return 'Сражайся с ним только уровнем.';
				case 'buff':
					return 'Сражайся с ним только магией.';
				default:
					throw new Error('Invalid value');
			}
		},
	},
	pursuit: {
		getDescription: (props: Ability) => {
			if (props.type !== abilityEffect.pursuit) return null;
			const { value } = props;
			return `Не преследует никого ниже ${value} уровня.`;
		},
	},
};
export const PunishmentAction = {
	changeLevel: {
		getDescription: (props: Punishment) => {
			if (props.type !== punishmentEffect.changeLevel) return null;
			const { value, optional } = props;
			let description = '';
			switch (value) {
				case 'death':
					description = 'Смерть.';
					break;
				case 'D6':
					description = 'Потеряй D6 уровней.';
					break;
				case 'firstLevel':
					description = 'Становишься 1 уровнем.';
					break;
				default:
					description = `Теряешь ${setLevelTextSpelling(value)}.`;
					break;
			}
			if (optional) {
				switch (value) {
					case 'death':
						description = ` Убивает ${optional!.targetClass}а.`;
						break;
					case 'D6':
						description = ` ${optional!.targetClass} теряет D6 уровней.`;
						break;
					case 'firstLevel':
						description = ` ${optional!.targetClass} становится 1 уровнем.`;
						break;
					default:
						description = ` ${optional!.targetClass} теряет ${setLevelTextSpelling(value)}.`;
						break;
				}
			}
			return description;
		},
	},
	removeClothes: {
		getDescription: (props: Punishment) => {
			if (props.type !== punishmentEffect.removeClothes) return null;
			const { value } = props;
			return `Теряешь ${value}.`;
		},
	},
	discard: {
		getDescription: (props: Punishment) => {
			if (props.type !== punishmentEffect.discard) return null;
			const { value } = props;
			switch (value) {
				case 'D6':
					return 'Потеряй D6 карт из руки.';
				case 'all':
					return 'Сбрось всю руку';
				default:
					return `Сбрось ${value} карт.`;
			}
		},
	},
	discardEnemy: {
		getDescription: (props: Punishment) => {
			if (props.type !== punishmentEffect.discardEnemy) return null;
			const { value } = props;
			return `Другой игрок забирает ${value} карт из руки.`;
		},
	},
	removeClass: {
		getDescription: (props: Punishment) => {
			if (props.type !== punishmentEffect.removeClass) return null;
			return 'Теряешь свой класс.';
		},
	},
};
