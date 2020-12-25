import { Min } from 'class-validator';
import { FightMap } from '..';
import setPositionable from '../mixin/Positionable';

class BaseTile {
	public parentFightMap: FightMap;

	public depth: number;
}

export default class PositionableTile extends setPositionable(BaseTile) {}
