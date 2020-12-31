import { Tile, UnitInGame } from '..';
import setPositionable from '../mixin/Positionable';

class BaseUnitOnMap extends UnitInGame {
	public currentTile: Tile;
}

export default class PositionableUnitOnMap extends setPositionable(BaseUnitOnMap) {}
