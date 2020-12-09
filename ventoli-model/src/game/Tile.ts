import { Min } from 'class-validator';
import setPositionable from '../mixin/Positionable';

class BaseTile {
	public depth: number
}

export default class PositionableTile extends setPositionable(BaseTile) {}