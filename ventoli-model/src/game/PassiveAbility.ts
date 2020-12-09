import { Ability, Unit, UnitStats } from "..";

export default class PassiveAbility implements Ability {
	public targetUnit: Unit
	
	public addedStats: UnitStats
}