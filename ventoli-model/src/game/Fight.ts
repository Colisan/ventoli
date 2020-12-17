import { FightMap, Place, Player, Turn } from "..";

export default class Fight {
	public fightNumber: number

	public parentPlace: Place

	public map: FightMap

	public playerList: Player[]

	public pastTurnList: Turn[]

	public currentTurn: Turn
}