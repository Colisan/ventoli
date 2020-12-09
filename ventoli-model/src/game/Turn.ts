import { Player, Unit, Movement, ActiveAbility } from "..";

export default class Turn {
	public actionWishList: Map<Player, Map<Unit, (Movement | ActiveAbility)[]>>
}