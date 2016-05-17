///<reference path="../utils/CEEBz.ts" />

class Badger {
	
	private static badges: Badge[];
	private static playerBadges: Object;
	private static controller: ScoreController;

	static init(controller:ScoreController) {

		var d = <ScoreData>controller.getAsObject();
		this.badges = d.badges;
		this.playerBadges = d.playerBadges;
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

		var badgeseries = {};

		for (var i = badges.length-1; i >= 0; i--) {

			if (badges[i].series && badges[i].series.name) {

				var seriesName = badges[i].series.name;

				if (!badgeseries[seriesName]) {
					badgeseries[seriesName] = badges[i];
				}

				// delete if order is less than current, otherwise store for next iteration
				if (badges[i].series.order < badgeseries[seriesName].series.order) {
					badges.splice(i, 1);
				} else {
					badgeseries[seriesName] = badges[i];
				}
			}

		}

		return badges;
	}

	static getBadgeByID(badgeid:string): Badge {

		for (var i = 0; i < this.badges.length; ++i) {

			if (this.badges[i].id = badgeid) return this.badges[i];

		}

		return null;
	}

	static getManualBadges(): Badge[] {
		var badges: Badge[] = [];

		for (var i = 0; i < this.badges.length; ++i) {

			if (this.badges[i].condition) continue;

			badges.push(this.badges[i]);
		}

		return badges;
	}

	static getTotalBadgesOfType(playerid: string, type: string): number {

		var count = 0;


		return count;
	}

	static playerHasBadge(playerid:string, badge:Badge): number {

		var totalGames = this.controller.getTotalGamesPlayed();
		var played = this.controller.getPlayerTotalGames(playerid);
		var context = {
			/* static data for player */
			"score" : this.controller.getPlayerLastTotalScore(playerid),
			"gamesplayed": played, // player total
			"totalgames": totalGames, // season total
			"attendance": Math.floor(played / totalGames * 100),
			"latecount": NumberCruncher.getPlayLateStarts(playerid),
			"shots": NumberCruncher.getPlayerTotalSuccessfullShots(playerid),
			"powerups": this.controller.getPlayerNumPowerupsEarned(playerid),
			"distance": NumberCruncher.getPlayerDistance(playerid),

			/* variable data per game */
			"rankchange" : 0,
			"late" : false,
			"gamescore" : 0,
			"bonus01" : 0,
			"bonus02" : 0,
			"bonus04" : 0
		}

		


		if (!badge.condition) {

			var count = 0;

			for (var i = 0; i < totalGames; ++i) {

				var r = this.controller.getPlayerResultsForDay(playerid, i);

				if (r && r["manualbadges"]) {

					for (var j = 0; j < r["manualbadges"].length; ++j) {

						var b: Badge = this.getBadgeByID(r["manualbadges"][j]);

						if (b.id == badge.id) {
							count++;
						}
					}
				}

			}

			return count;
		}

		if (badge.multi) {

			var rankChanges = NumberCruncher.getPlayerRankChanges(playerid);
			var count = 0;

			for (var i = 0; i < totalGames; ++i) {
				
				context.rankchange = rankChanges[i] || 0;
				context.late = this.controller.getPlayerIsLate(playerid, i) || false;
				context.gamescore = this.controller.getPlayerScoreForDay(playerid, i);

				context.bonus01 = this.controller.getPlayerBonusesForDay(playerid, "bonus01", i);
				context.bonus02 = this.controller.getPlayerBonusesForDay(playerid, "bonus02", i);
				context.bonus04 = this.controller.getPlayerBonusesForDay(playerid, "bonus04", i);

				//console.log(context);

				if (CEEBz.parse(badge.condition, context)) count++;

			}

			return count;

		} else {
			
			return CEEBz.parse(badge.condition, context) ? 1 : 0;
		}
	}

}