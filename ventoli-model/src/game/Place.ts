import { Fight, Tile, Zone } from "..";

export default class Place {
	public parentZone: Zone

	public x: number

	public y: number

	public fight: Fight
	
	// public clearedAction: Shop | Hire
}