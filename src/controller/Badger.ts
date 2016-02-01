class Badger {
	
	private static badges: Badge[];
	private static controller: ScoreController;

	static init(controller:ScoreController) {

		var d = <ScoreData>controller.getAsObject();
		this.badges = d.badges;
		this.controller = controller;
	}

	static getAllBadgesForPlayer(playerid:string): Badge[] {

		var badges: Badge[] = [];

		for (var i = 0; i < this.badges.length; ++i) {
			var n = this.playerHasBadge(playerid, this.badges[i]);
			if (n > 0) {
				this.badges[i].count = n;
				badges.push(this.badges[i]);
			}
		}

		return badges;
	}

	static playerHasBadge(playerid:string, badge:Badge): number {

		var when: string;// = this.getValueOfWhen(badge.condition.when, playerid);
		var is: string = badge.condition.is;
		var value: string = badge.condition.value;

		if (badge.multi) {

			when = badge.condition.when;

			switch (when) {
				case "rankchange":

					var ranks = NumberCruncher.getPlayerRankChanges(playerid);
					var count = 0;

					for (var i = 0; i < ranks.length; ++i) {
						if (this.checkCondition(ranks[i], is, value)) {
							count++;
						}
					}
					return count;
				default: return 0;
			}

		} else {

			when = this.getValueOfWhen(badge.condition.when, playerid);
		
			var result = this.checkCondition(when, is, value);

			return result ? 1 : 0;
		}
	}

	private static getValueOfWhen(prop:string, playerid:string):any {

		switch (prop) {
			case "score": return this.controller.getPlayerLastTotalScore(playerid);
		}

		return 0;

	}

	private static checkCondition(val1:any, comparitor:string, val2:any):boolean {

		switch (comparitor) {
			case "==":
				return val1 == val2;
			case "!=":
				return val1 != val2;
			case ">=":
				return val1 >= val2;
			case "<=":
				return val1 <= val2;
			case ">":
				return val1 > val2;
			case "<":
				return val1 < val2;
		}

		return false;
	}

}