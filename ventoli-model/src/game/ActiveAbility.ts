import { Ability, Tile, UnitOnMap } from "..";

export default class ActiveAbility implements Ability {
	public physicalPower: number = 0
	public magicalPower: number = 0
	public isHealing: boolean = false

	public sourceUnit: UnitOnMap

	public isValidTarget(tile: Tile) {
		return tile === this.sourceUnit.currentTile
	}

	public isInAoe(tile: Tile, withTarget: Tile) {
		return tile === withTarget
	}
}