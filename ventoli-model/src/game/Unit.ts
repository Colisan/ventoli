import {
	Ability,
	ActiveAbility,
	Effect,
	PassiveAbility,
	Stuff,
	UnitStats,
} from '..';

export default class Unit {
	public name: string;

	public stuffList: Stuff[];

	public chosenActiveAbilityList: ActiveAbility[];

	public chosenPassiveAbilityList: PassiveAbility[];

	public coreStats: UnitStats;

	public currentHP: number;

	public alterationList: Effect[];

	public get currentStrengh() {
		let base = this.coreStats.strengh;
		return base;
	}

	public get bonusMagicalRange() {
		return 0;
	}

	public get bonusPhysicalRange() {
		return 0;
	}
}
