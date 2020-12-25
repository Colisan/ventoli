import { ActiveAbility, Tile } from '../..';

export default class Brasier extends ActiveAbility {
	magicalPower = 2;
	isHealing = true;

	public isValidTarget(target: Tile) {
		return (
			target.distanceTo(this.sourceUnit) <=
			3 + this.sourceUnit.bonusMagicalRange
		);
	}

	public isInAoe(tile: Tile, withTarget: Tile) {
		return tile.distanceTo(withTarget) <= 1;
	}
}
