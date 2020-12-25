import { Effect, Unit } from '..';

export default class UnitInGame extends Unit {
	public currentHP: number;

	public alterationList: Effect[];
}
