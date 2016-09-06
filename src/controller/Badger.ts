///<reference path="../utils/CEEBz.ts" />

class Badger {
	
	private static badges: Badge[];
	private static playerBadges: Object;
	private static controller: ScoreController;

	private static unqiuecount: number;
	private static badgecounters: Object;

	static init(controller:ScoreController) {

		var d = <ScoreData>controller.getAsObject();
		this.badges = d.badges;
		this.playerBadges = d.playerBadges;
		this.controller = controller;
		this.unqiuecount = 0;
		this.badgecounters = {};
	}

	static getAllBadgesForPlayer(playerid:string): Badge[] {

		this.unqiuecount = 0;
		this.badgecounters = {};

		var badges: Badge[] = [];

		for (var i = 0; i < this.badges.length; ++i) {

			var n = this.playerHasBadge(playerid, this.badges[i]);

			this.badgecounters[this.badges[i].id] = n;

			if (n > 0) {
				this.badges[i].count = n;
				badges.push(this.badges[i]);

				this.unqiuecount++;
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

	static getNumUniqueBadges(playerid: string): number {

		return this.unqiuecount;
	}
/*
	static getTotalBadgesOfType(playerid: string, type: string): number {

		var count = 0;


		return count;
	}*/

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
			"uniquebadges": this.getNumUniqueBadges(playerid),
			"allweather":   (this.badgecounters["hotstuff"] > 0 && 
							 this.badgecounters["windter"] > 0 && 
							 this.badgecounters["waterlogged"] > 0),

			/* variable data per game */
			"rank": 0,
			"rankchange" : 0,
			"late" : false,
			"gamescore" : 0,
			"gamerank" : 0,
			"lastrank": 0,
			"lastrankchange": 0,
			"lastlate": false,
			"lastgamescore": 0,
			"lastgamerank": 0,
			"lastbonus01": 0,
			"lastbonus02": 0,
			"lastbonus04": 0,
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
			var lastgame = {
				rank: 0,
				bonus01: 0,
				bonus02: 0,
				bonus04: 0,
				rankchange: 0,
				late: false,
				gamescore: 0,
				gamerank: 0
			}

			for (var i = 0; i < totalGames; ++i) {
				
				context.rankchange = rankChanges[totalGames-i] || 0;
				context.late = this.controller.getPlayerIsLate(playerid, i) || false;
				context.gamescore = this.controller.getPlayerScoreForDay(playerid, i);
				context.gamerank = this.controller.getPlayerRankForDay(playerid, i);
				context.rank = this.controller.getPlayerRank(playerid, i);

				context.bonus01 = this.controller.getPlayerBonusesForDay(playerid, "bonus01", i);
				context.bonus02 = this.controller.getPlayerBonusesForDay(playerid, "bonus02", i);
				context.bonus04 = this.controller.getPlayerBonusesForDay(playerid, "bonus04", i);

				context.lastrank = lastgame.rank;
				context.lastrankchange = lastgame.rankchange;
				context.lastlate = lastgame.late;
				context.lastgamescore = lastgame.gamescore;
				context.lastgamerank = lastgame.gamerank;
				context.lastbonus01 = lastgame.bonus01;
				context.lastbonus02 = lastgame.bonus02;
				context.lastbonus04 = lastgame.bonus04;

				if (CEEBz.parse(badge.condition, context)) count++;

				lastgame.rank = context.rank;
				lastgame.rankchange = context.rankchange;
				lastgame.late = context.late;
				lastgame.gamescore = context.gamescore;
				lastgame.gamerank = context.gamerank;
				lastgame.bonus01 = context.bonus01;
				lastgame.bonus02 = context.bonus02;
				lastgame.bonus04 = context.bonus04;

			}

			return count;

		} else {
			
			return CEEBz.parse(badge.condition, context) ? 1 : 0;
		}
	}

}