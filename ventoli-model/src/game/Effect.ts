import { ActiveAbility, PassiveAbility, Tile, Unit, UnitStats } from "..";

export default class Effect {
	public targetUnit: Unit

	public underlyingPassiveAbility?: PassiveAbility

	public turnsLeft?: number
}