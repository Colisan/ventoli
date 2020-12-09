import { Fight, FightMap, Player, Turn } from "..";

export default class Game {
	public player: Player

	public pastFightList: Fight[]

	public currentFight: Fight
}