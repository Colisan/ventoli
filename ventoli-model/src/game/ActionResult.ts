import {
	Ability,
	ActiveAbility,
	Effect,
	PassiveAbility,
	Stuff,
	Unit,
} from '..';
import { Length, Max, Min } from 'class-validator';

export default class ActionResult {
	public targetUnit: Unit;

	public physicalDamage: number;
	public magicalDamage: number;

	public physicalHealing: number;
	public magicalHealing: number;

	public addedEffects: Effect[];
}
