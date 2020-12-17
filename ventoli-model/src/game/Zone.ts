import { Fight, FightMap, Place, Player, Turn } from "..";

export enum ZoneType {
	TUTORIAL = 0,
	PORT = 1,
	LOWER_TOWN = 2,
	GARDENS = 3,
	HIGHER_TOWN = 4,
	WINDMILL = 5,
	COMMANDERY = 6,
	PRISON = 7,
	TUNNELS = 8,
	CHAPEL = 9,
	THRONE = 10
}

export default class Zone {
	public type: ZoneType

	public placeList: Place[]

	public additionalFightList: Fight[]
}