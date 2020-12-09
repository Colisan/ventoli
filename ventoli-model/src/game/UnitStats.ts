import { Ability, ActiveAbility, PassiveAbility, Stuff } from "..";
import { Length, Max, Min } from 'class-validator';

export default class UnitStats {
	@Min(1)
	public strengh: number

	@Min(1)
	public defense: number

	@Min(1)
	public magic: number

	@Min(1)
	public willpower: number

	@Min(1)
	public speed: number
}