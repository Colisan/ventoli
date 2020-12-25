import { Constructor } from '.';

export default <TBase extends Constructor>(Base: TBase) =>
	class Positionable extends Base {
		private _x: number;
		private _y: number;
		private _z: number;
		private _zThird: number;

		get x(): number {
			return this._x;
		}
		get y(): number {
			return this._y;
		}
		get z(): number {
			return this._z;
		}

		set x(val: number) {
			this._x = val;
		}
		set y(val: number) {
			this._y = val;
		}
		set z(val: number) {
			this._z = val;
			this._zThird = val / 3;
		}

		distanceTo(target: Positionable): number {
			let dx = Math.abs(this.x - target.x);
			let dy = Math.abs(this.y - target.y);
			let dz = Math.floor(Math.abs(this._zThird - target._zThird));
			return dx + dy + dz;
		}
	};
