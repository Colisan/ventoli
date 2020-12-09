import { FightMap, Player, Turn } from "..";

export default class Fight {
	public map: FightMap

	public playerList: Player[]

	public pastTurnList: Turn[]

	public currentTurn: Turn
}