///<reference path="../utils/CEEBz.ts" />

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

			if (!this.badges[i].condition) continue;

			var n = this.playerHasBadge(playerid, this.badges[i]);
			if (n > 0) {
				this.badges[i].count = n;
				badges.push(this.badges[i]);
			}
		}

		return badges;
	}

	static playerHasBadge(playerid:string, badge:Badge): number {

		var totalGames = this.controller.getTotalGamesPlayed();
		var played = this.controller.getPlayerTotalGames(playerid);
		var context = {
			/* static data for player */
			"score" : this.controller.getPlayerLastTotalScore(playerid),
			"gamesplayed": played,
			"totalgames": totalGames,
			"attendance": Math.floor(played / totalGames * 100),
			"latecount": NumberCruncher.getPlayLateStarts(playerid),
			
			/* variable data per game */
			"rankchange" : 0,
			"late" : false,
			"gamescore" : 0
		}

		if (badge.multi) {

			var rankChanges = NumberCruncher.getPlayerRankChanges(playerid);
			var count = 0;

			for (var i = 0; i < totalGames; ++i) {
				
				context.rankchange = rankChanges[i] || 0;
				context.late = this.controller.getPlayerIsLate(playerid, i) || false;
				context.gamescore = this.controller.getPlayerScoreForDay(playerid, i) || 0;

				if (CEEBz.parse(badge.condition, context)) count++;

			}

			return count;

		} else {
			
			return CEEBz.parse(badge.condition, context) ? 1 : 0;
		}
	}

}