import { Ability, UnitStats } from "..";

const enum Slot {
	"OTHER"=0,
	"HEAD"=1,
	"TORSO"=2,
	"1HAND"=3,
	"2HAND"=4,
	"SHOES"=5,
}

export default class Stuff {
	public abilityList: Ability[]

	public slot: Slot
	
	public bonusStats: UnitStats
}