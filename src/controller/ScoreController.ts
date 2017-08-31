///<reference path="../stats/NumberCruncher.ts" />

interface ScoreData {
	season_id: number;
	season: number;
	banner: string;
	enableBadges: boolean;
	end_date: string;
	season_name: string;
	players: any[];
	games: Object;
	powerbank: Object;
	points: Object;
	bonuses: Object;
	badges: Badge[];
	powerups: Object;
	playerBadges: Object;
	scores: any[];
	archives: any[];
}

interface Badge {
	id: string;
	name: string;
	multi: boolean;
	manual: boolean;
	image: string;
	count: number;
	description: string;
	condition?: string;
	series: BadgeSeries;
}
interface PowerUp {
	id: string;
	name: string;
	active: boolean;
	description: string;
	chance: number;
	image: string;
	useAgainstPlayer: boolean;
	multi?: boolean;
	count?: number;
	expired?: boolean;
	health?: number;
	healths?: number[];
}

interface BadgeSeries {
	name: string;
	order: number;
}


interface DayConditions {
	temp: number;
	windspd: number;
	winddir: string;
	cloud: string;
	rain: string;
	humidity: number;
	airpressure: number;
}

class ScoreController {

	savedState: ScoreData;
	model: ScoreData;
	ranker: IRanking;
	gameplayercache: any[];


	constructor(model: ScoreData) {

		this.model = model;
		this.savedState = null;
		this.gameplayercache = [];

		if (!window["__editmode"] && this.model.scores.length && this.model.scores[0].staging === true) {
			this.model.scores.shift();
		}

		this.ranker = this.getRankingSystem(Config.RANKING);

	}

	getRankingSystem = (type: string): IRanking => {
		switch (type) {
			case "dense":
				return new DenseRanking();
			case "standard":
			default:
				return new StandardRanking();
		}
	}

	getNewSeason = (options?: any): ScoreData => {

		var seasonIndex: number = this.model.season === 4 ? 1 : this.model.season + 1;
		var date: Date = new Date();
		var endyear: number = date.getFullYear() + (seasonIndex === 4 ? 1 : 0);

		var feb = new Date("1 February " + (endyear))
		feb.setDate(29);

		var seasons = [
			{
				banner: "autumn/Autumn.html",
				name: "Autumn " + endyear,
				end: "31 May " + endyear
			},
			{
				banner: "winter/Winter.html",
				name: "Winter " + endyear,
				end: "31 August " + endyear
			},
			{
				banner: "spring/Spring.html",
				name: "Spring " + endyear,
				end: "30 November " + endyear
			},
			{
				banner: "summer/Summer.html",
				name: "Summer " + endyear,
				end: (feb.getDate() === 29 ? "29" : "28") + " February " + endyear
			}
		]

		var enddate = new Date(seasons[seasonIndex - 1].end);
		enddate.setHours(12);

		var season: ScoreData = {
			season_id: this.model.season_id + 1,
			season: seasonIndex,
			banner: seasons[seasonIndex - 1].banner,
			enableBadges: true,
			end_date: enddate.toString(),
			season_name: seasons[seasonIndex - 1].name,
			players: this.model.players,
			games: {},
			points: this.model.points,
			bonuses: this.model.bonuses,
			badges: this.model.badges,
			playerBadges: {},
			powerbank: {},
			powerups: this.model.powerups,
			scores: [],
			archives: []
		}

		for (var p in season.players) {
			season.games[season.players[p].id] = 0;
		}


		return season;
	}

	/// SAVE / RESTORE STATE

	saveState = () => {
		this.savedState = $.extend(true, {}, this.model);
	}

	restoreState = () => {
		if (this.savedState) {
			this.model = $.extend(true, {}, this.savedState);

			this.savedState = null;
		}
	}

	/// RETRIEVE

	getArchives = (): any[] => {

		if (!this.model.archives) return [];

		var archives = [];

		for (var i = 0; i < this.model.archives.length; ++i) {

			var val = this.model.archives[i];

			val = val.substring(val.lastIndexOf("/") + 1);
			val = val.substring(0, val.length - 5);
			val = val.split("_");

			if (val.length >= 2) {
				archives.push({
					year: parseInt(val[0], 10),
					season: val[1],
					name: (val[1].charAt(0).toUpperCase()) + (val[1].substring(1) + " " + val[0])
				});
			}


		}

		// sort by year, then season
		var order = { "summer": 0, "autumn": 1, "winter": 2, "spring": 3 };

		archives = archives.sort((a, b) => {

			if (a.year < b.year) return 1;
			if (a.year > b.year) return -1;
			return 0;
		});

		archives = archives.sort((a, b) => {
			if (a.year === b.year) {
				if (order[a.season] < order[b.season]) return 1;
				if (order[a.season] > order[b.season]) return -1;
			}
			return 0;
		});

		return archives;
	}

	badgesEnabled = (): boolean => {

		return this.model.enableBadges === true;
	}

	getGameIsComplete = (day: number = 0): boolean => {
		if (this.model.scores.length <= 0) return true;

		if (this.model.scores[day].complete === 1) {
			return true;
		}

		return false;
	}

	getLastCompletedDay = (): number => {
		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].complete === 1) {
				return i
			}

		}

		return 0;
	}

	getAsObject = (): ScoreData => {
		return $.extend(true, {}, this.model);
	}

	getJSONString = (): string => {
		//return JSON.stringify(this.model, null, 4); // nice formatting
		return JSON.stringify(this.model); // compressed
	}

	getDayJSONString = (day: number = 0): string => {
		//return JSON.stringify(this.model, null, 4); // nice formatting
		return JSON.stringify(this.model.scores[day]); // compressed
	}

	getSeasonDateString = (): string => {

		return DateUtil.getSeasonDateString(this.model.season);
	}

	getSeasonBanner = (): string => {
		return this.model.banner;
	}

	getEndDate = (): string => {
		return this.model.end_date;
	}

	getGameDate = (day: number = 0): string => {
		if (this.model.scores.length === 0) {

			var today = new Date();
			var yesterday = new Date(today.toString());
			yesterday.setDate(today.getDate() - 1);


			return yesterday.toString();

		}

		return this.model.scores[day].date;
	}

	getGameNumber = (day: number = 0): number => {
		return this.model.scores.length - day;
	}

	getGameNumPlayers = (day: number = 0): number => {

		if (this.model.scores.length === 0) return 0;

		return this.model.scores[day].numPlayers;
	}

	getAllActivePlayers = (): any[] => {
		var players = [];

		for (var i = 0; i < this.model.players.length; ++i) {

			if (this.model.games[this.model.players[i].id] > 0 &&
				this.getPlayerLastTotalScore(this.model.players[i].id) > 0) {
				players.push(this.model.players[i]);
			}

		}

		players.sort(function (a, b) {
			if (a.firstname > b.firstname) return 1;
			if (a.firstname < b.firstname) return -1;
			return 0;
		});

		return players;
	}


	getGamePlayers = (day: number = 0): any[] => {

		if (this.model.scores.length === 0) return [];

		//if (this.gameplayercache[day]) return this.gameplayercache[day];

		//return this.model.scores[day].numPlayers;
		var players: any[] = [];

		for (var id in this.model.scores[day].values) {
			if (this.model.scores[day].values.hasOwnProperty(id) && this.model.scores[day].values[id].played) {

				var name = "";
				var score = 0;
				var rawscore = 0;
				var bonuses = 0;
				var i = 0;
				var player = {
					id: id,
					firstname: "",
					rank: 0,
					score: 0,
					bonuses: 0,
					rawscore: 0,
					multiplier: 1,
					late: false,
					powerup: false,
					numpowerups: 0,
					receivedPowerups: [],
					usedPowerup: false,
					usedPowerups: []
				};


				for (i = 0; i < this.model.players.length; ++i) {
					if (this.model.players[i].id == id) {
						name = this.model.players[i].firstname;
						break;
					}
				}

				for (var p in this.model.points) {
					if (this.model.points.hasOwnProperty(p)) {
						player[p] = this.model.scores[day].values[id][p] || 0;
						if (player[p] > 0) {
							rawscore += (this.model.scores[day].values[id][p] * this.model.points[p].value);
						}
					}
				}

				for (var b in this.model.bonuses) {
					if (this.model.bonuses.hasOwnProperty(b) && b != "late") {
						player[b] = this.model.scores[day].values[id][b] || 0;
						if (player[b] > 0) {
							bonuses += (this.model.scores[day].values[id][b] * this.model.bonuses[b].value);
						}
					}
				}

				var multiplier = this.model.scores[day].values[id].multiplier;

				if (this.model.scores[day].values[id].late === 1) {
					multiplier += 1;
				}

				player.firstname = name;
				player.rank = this.model.scores[day].values[id].rank;
				player.score = this.model.scores[day].values[id].newtotal - this.model.scores[day].values[id].lasttotal;
				player.bonuses = bonuses;
				player.rawscore = rawscore;
				player.multiplier = multiplier;
				player.late = this.model.scores[day].values[id].late === 1;
				player.numpowerups = 0;

				if (this.model.scores[day].values[id].manualbadges) {
					var receivedPowerups = this.getPlayerPowerupsReceivedOnDay(id, day);
					if (receivedPowerups.length > 0) {
						player.powerup = true;
						player.numpowerups = receivedPowerups.length;
						player.receivedPowerups = receivedPowerups;
					} else {
						player.powerup = this.model.scores[day].values[id].manualbadges.indexOf("powerup") > -1;
						player.numpowerups = 1;
						player.receivedPowerups = [];
					}
				}

				var usedpowerups = this.getPlayerPowerupsUsedOnDay(id, day);

				player.usedPowerup = usedpowerups.length > 0;
				player.usedPowerups = usedpowerups;

				players.push(player);
			}
		}

		players.sort(function (a, b) {
			if (a.score < b.score) return 1;
			if (a.score > b.score) return -1;
			return 0;
		});

		var gamerank = 0;
		var lastscore = 9999;

		for (var i = 0; i < players.length; ++i) {

			if (players[i].score < lastscore) {
				lastscore = players[i].score;

				gamerank++;
			}

			players[i].scorerank = gamerank;
		}

		this.gameplayercache[day] = players;

		return players;
	}

	getDayConditions = (day: number = 0): DayConditions => {

		if (this.model.scores.length === 0) return <DayConditions>{};

		return this.model.scores[day].conditions;
	}

	getTotalGamesPlayed = (): number => {
		return this.model.scores.length;
	}

	getDaysRemaining = (): number => {

		var includetoday: boolean = true;

		if (this.model.scores.length > 0) {
			if (new Date(this.model.scores[0].date).getDate() === new Date().getDate()) {
				includetoday = false;
			}
		}

		return DateUtil.getDaysRemaining("" + new Date(), this.model.end_date) - (includetoday ? 0 : 1);
	}

	getSeasonNumber = (): number => {
		return this.model.season_id;
	}

	getSeasonName = (): string => {
		return this.model.season_name;
	}

	getPlayerNames = (): any[] => {

		var result = [];

		for (var i = 0; i < this.model.players.length; ++i) {

			result.push({
				id: this.model.players[i].id,
				firstname: this.model.players[i].firstname
			});

		}

		// alphabetical
		result.sort(function (a, b) {
			if (a.firstname < b.firstname) return -1;
			if (a.firstname > b.firstname) return 1;
			return 0;
		});

		return result;
	}

	getPlayerScores = (day: number = 0): any[] => {

		if (this.model.scores.length === 0) return [];

		var result = [];

		for (var i = 0; i < this.model.players.length; ++i) {

			result.push({
				id: this.model.players[i].id,
				active: this.model.players[i].active,
				firstname: this.model.players[i].firstname,
				lastname: this.model.players[i].lastname,
				played: this.model.scores[day].values[this.model.players[i].id].played,
				late: this.model.scores[day].values[this.model.players[i].id].late
			});

			for (var p in this.model.points) {
				if (this.model.points.hasOwnProperty(p)) {
					result[i][p] = this.model.scores[day].values[result[i].id][p];
				}
			}

			for (var b in this.model.bonuses) {
				if (this.model.bonuses.hasOwnProperty(b) && b != "late") {
					result[i][b] = this.model.scores[day].values[result[i].id][b];
				}
			}

		}

		// alphabetical
		result.sort(function (a, b) {
			if (a.firstname < b.firstname) return -1;
			if (a.firstname > b.firstname) return 1;
			return 0;
		});

		return result;
	}

	getNumPlayers = (): number => {
		return this.model.players.length;
	}

	getPlayedIDAtIndex = (index: number): string => {
		return this.model.players[index].id;
	}

	getBadgeByID = (badgeid: string): Badge => {

		for (var i = 0; i < this.model.badges.length; ++i) {
			if (this.model.badges[i].id === badgeid) return this.model.badges[i];
		}

		return null;
	}

	getPlayerName = (playerid: string): string => {

		for (var i = 0; i < this.model.players.length; ++i) {

			if (this.model.players[i].id === playerid) {
				return this.model.players[i].firstname;
			}

		}

		return "Player " + playerid + " not found.";
	}

	getPlayerDetails = (playerid: string): Object => {
		//return this.model.players[playerid];

		for (var i = 0; i < this.model.players.length; ++i) {

			if (this.model.players[i].id === playerid) {
				return this.model.players[i];
			}

		}

		return {};
	}

	getPowerupDetails = (powerup: string): PowerUp => {
		return this.model.powerups[powerup];
	}


	getPlayerPowerupsReceivedOnDay = (playerid: string, day: number = 0): any[] => {

		if (!this.model.powerbank) return [];

		var p = this.model.powerbank[playerid] || [];
		var totalgames = this.model.scores.length;

		var powerups = [];

		for (var i = 0; i < p.length; ++i) {

			if (totalgames - p[i].game === day) {

				var p2 = $.extend(true, {}, p[i]);

				p2["dataindex"] = i;
				powerups.push(p2);
			}

		}

		return powerups;

	}
	getPlayerPowerupsUsedOnDay = (playerid: string, day: number = 0): any[] => {

		if (!this.model.powerbank) return [];

		var p = this.model.powerbank[playerid] || [];
		var totalgames = this.model.scores.length;

		var powerups = [];

		for (var i = 0; i < p.length; ++i) {

			if (p[i].used && totalgames - p[i].gameused === day) {

				var p2 = $.extend(true, {}, p[i]);

				p2["dataindex"] = i;
				powerups.push(p2);
			}

		}

		return powerups;

	}

	getPlayerManualBadgesOnDay = (playerid: string, day: number = 0): any[] => {

		var b = this.model.scores[day].values[playerid].manualbadges;

		var badges = [];

		for (var i = 0; i < b.length; ++i) {
			var b2 = this.getBadgeByID(b[i]);

			if (b2) {
				// make copy so not to modify original
				b2 = $.extend(true, {}, b2);
				b2["dataindex"] = i;

				badges.push(b2);
			}
		}

		return badges;
	}

	getPlayerAvatar = (playerid: string): string => {

		for (var i = 0; i < this.model.players.length; ++i) {

			if (this.model.players[i].id === playerid) {
				return this.model.players[i].avatar || "anon.jpg";
			}

		}

		return "anon.jpg";
	}

	getPlayerIsLate = (playerid: string, day: number = 0): boolean => {

		if (typeof this.model.scores[day].values[playerid] == "undefined") {
			return false;
		}

		return this.model.scores[day].values[playerid].late === 1;
	}

	getPlayerIsPlaying = (playerid: string, day: number = 0): boolean => {

		if (this.model.scores.length === 0) return false;

		if (typeof this.model.scores[day].values[playerid] == "undefined") {
			return false;
		}

		return this.model.scores[day].values[playerid].played === 1;

	}

	getPlayerRank = (playerid: string, day: number = 0): number => {

		var ranks = this.getPlayerRankings(day);

		for (var i = 0; i < ranks.length; ++i) {
			if (ranks[i].id === playerid) {
				return ranks[i].rank;
			}
		}

		if (ranks[ranks.length - 1].score === 0) {
			return ranks[ranks.length - 1].rank;
		}
		return ranks[ranks.length - 1].rank + 1;
	}

	getPlayerMultiplier = (playerid: string, day: number = 0): number => {

		var ranks = this.getPlayerRankings(day);

		for (var i = 0; i < ranks.length; ++i) {
			if (ranks[i].id === playerid) {
				return ranks[i].multiplier;
			}
		}

		return ranks[ranks.length - 1].multiplier; // last player multiplier
	}

	getPlayerRankings = (day: number = 0): any[] => {

		if (this.model.scores.length === 0) return [];

		var order: any[] = [];
		var total: number = this.getNumPlayers();

		for (var i = 0; i < total; ++i) {

			var playerid: string = this.getPlayedIDAtIndex(i);
			var player: Object = {
				id: playerid,
				averagerawscore: NumberCruncher.getPlayerAverageRawScore(playerid, true),
				score: this.getPlayerTotalScoreOnDay(playerid, day)
			};

			order.push(player);
		}

		order = this.ranker.rank(order, "score", "averagerawscore");

		return order;
	}

	getPlayerLastTotalScore = (playerid: string): number => {

		if (this.model.scores.length === 0) return 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid]) {
				return this.model.scores[i].values[playerid].newtotal;
			}

		}

		return 0;

	}

	getPlayerResultsForDay = (playerid: string, day: number = 0): Object => {
		if (this.model.scores.length === 0) return null;

		if (this.model.scores[day].values[playerid]) {
			return this.model.scores[day].values[playerid];
		}

		return null;

	}

	getPlayerRankForDay = (playerid: string, day: number = 0): number => {

		var players = this.getGamePlayers(day);
		var rank = this.model.scores.length;

		for (var i = 0; i < players.length; ++i) {
			if (players[i].id === playerid) {
				rank = players[i].scorerank - 1;
				break;
			}
		}

		return rank;

	}

	getPlayerScoreForDay = (playerid: string, day: number = 0): number => {

		if (this.model.scores.length === 0) return -1;

		if (this.model.scores[day].values[playerid] && this.model.scores[day].values[playerid].played) {
			return this.model.scores[day].values[playerid].newtotal - this.model.scores[day].values[playerid].lasttotal;
		}

		return -1;

	}

	getPlayerTotalScoreOnDay = (playerid: string, day: number = 0): number => {

		if (this.model.scores.length === 0) return 0;

		if (this.model.scores[day].values[playerid]) {
			return this.model.scores[day].values[playerid].newtotal;
		}

		return 0;

	}

	getPlayerTotalGames = (playerid: string): number => {

		if (this.model.games[playerid]) {
			return this.model.games[playerid];
		}

		return 0;
	}

	getPlayerAverageScore = (playerid: string): number => {

		var total = this.getPlayerTotalGames(playerid);
		var score = this.getPlayerLastTotalScore(playerid);

		if (!total && !score) return 0;

		return Math.round(score / total * 100) / 100;

	}

	getPlayerRankChange = (playerid: string): number => {

		if (this.model.scores.length < 2) return 0;

		if (this.model.games[playerid] && this.model.games[playerid] <= 1) {
			return 0;
		}

		var ranknow = this.model.scores[0].values[playerid].rank;
		var ranklast;

		if (this.model.scores[1].values[playerid]) {
			ranklast = this.model.scores[1].values[playerid].rank;
		} else {
			return 0;
		}

		return ranklast - ranknow;
	}

	getPlayerBonusesForDay = (playerid: string, bonus: string, day: number = 0): number => {

		if (this.model.scores.length === 0) return 0;

		//console.log('getPlayerBonusCount', bonus);

		//var total:number = 0;

		//for (var i = 0; i < this.model.scores.length; ++i) {

		if (this.model.scores[day].values[playerid] &&
			this.model.scores[day].values[playerid][bonus] >= 1) {

			//console.log(playerid, bonus, this.model.scores[i].values[playerid][bonus])

			return this.model.scores[day].values[playerid][bonus];
		}

		//}

		return 0;
	}

	getPlayersDaysSinceLastGame = (playerid: string): number => {

		if (this.model.scores.length === 0) return 0;

		var today: Date = new Date();

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] &&
				this.model.scores[i].values[playerid].played > 0) {

				var gametime: Date = new Date(this.model.scores[i].date);

				return DateUtil.countDaysBetween(gametime, today, [1, 2, 3, 4, 5]);

				// get days between
			}

		}


		return 0;
	}

	getPlayerActivePowerupIDs = (playerid: string, includetoday: boolean = true, separate: boolean = false): PowerUp[] => {

		var powerups: PowerUp[] = [];

		if (!this.model.powerbank || !this.model.powerbank[playerid]) return powerups;

		for (var powerup in this.model.powerups) {

			var count = 0;
			var lowestHealth = 5;
			var min = includetoday ? -1 : 0;
			var pups = [];

			for (var i = 0; i < this.model.powerbank[playerid].length; i++) {

				if (this.model.powerbank[playerid][i].id === powerup &&
					this.model.powerbank[playerid][i].health > min &&
					!this.model.powerbank[playerid][i].used) {
					count++;


					pups.push(this.model.powerbank[playerid][i]);

					if (this.model.powerbank[playerid][i].health < lowestHealth) {
						lowestHealth = this.model.powerbank[playerid][i].health;
					}
				}
			}

			if (count) {
				if (separate) {
					for (var i = 0; i < pups.length; ++i) {
						powerups.push(this.model.powerups[powerup].id);
					}

				} else {
					powerups.push(this.model.powerups[powerup].id);
				}


			}
		}

		return powerups;
	}

	getPlayerPowerups = (playerid: string, includetoday: boolean = false, separate: boolean = false): PowerUp[] => {

		var powerups: PowerUp[] = [];

		if (!this.model.powerbank || !this.model.powerbank[playerid]) return powerups;

		for (var powerup in this.model.powerups) {

			var count = 0;
			var lowestHealth = 5;
			var healths = [];
			var min = includetoday ? -1 : 0;
			var pups = [];

			for (var i = 0; i < this.model.powerbank[playerid].length; i++) {

				if (this.model.powerbank[playerid][i].id === powerup &&
					this.model.powerbank[playerid][i].health > min &&
					!this.model.powerbank[playerid][i].used) {
					count++;

					healths.push(this.model.powerbank[playerid][i].health);

					pups.push(this.model.powerbank[playerid][i]);

					if (this.model.powerbank[playerid][i].health < lowestHealth) {
						lowestHealth = this.model.powerbank[playerid][i].health;
					}
				}
			}

			if (count) {

				healths = healths.sort((a, b) => {
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				});

				healths.length = 5; // limit to 5

				//healths.splice(0, 1);

				if (separate) {

					for (var i = 0; i < pups.length; ++i) {
						powerups.push({
							id: this.model.powerups[powerup].id,
							name: this.model.powerups[powerup].name,
							active: this.model.powerups[powerup].active !== false ? true : false,
							description: this.model.powerups[powerup].description,
							chance: this.model.powerups[powerup].chance,
							image: this.model.powerups[powerup].image,
							useAgainstPlayer: this.model.powerups[powerup].useAgainstPlayer,
							multi: count > 1,
							count: count,
							health: pups[i].health,
							healths: healths//healths.length > 1 ? healths : []
						});
					}

				} else {
					powerups.push({
						id: this.model.powerups[powerup].id,
						name: this.model.powerups[powerup].name,
						active: this.model.powerups[powerup].active !== false ? true : false,
						description: this.model.powerups[powerup].description,
						chance: this.model.powerups[powerup].chance,
						image: this.model.powerups[powerup].image,
						useAgainstPlayer: this.model.powerups[powerup].useAgainstPlayer,
						multi: count > 1,
						count: count,
						health: lowestHealth,
						healths: healths//healths.length > 1 ? healths : []
					});
				}


			}
		}

		powerups = powerups.sort((a, b) => {
			if (a["health"] < b["health"]) {
				return -1;
			}
			else if (a["health"] > b["health"]) {
				return 1;
			} else {
				if (a["count"] < b["count"]) {
					return -1;
				} else {
					return 0;
				}
			}
			//return 0;
		});

		//console.log(powerups)

		return powerups;

	}

	//// UPDATE

	deleteDay = (day: number = 0): Object => {
		return this.model.scores.splice(day, 1)[0];
	}

	createNewDay = (): Object => {

		var lastRanks = this.getPlayerRankings();

		var day = {
			"date": new Date().toString(),
			"staging": true,
			"complete": 0,
			"numPlayers": 0,
			"conditions": {
				"temp": 0,
				"apptemp": 0,
				"windspd": 0,
				"winddir": "-",
				"cloud": "-",
				"rain": "-",
				"humidity": 0,
				"airpressure": 0,
				"manual": []
			},
			"values": {}
		};

		for (var i = 0; i < this.model.players.length; ++i) {

			var id = this.model.players[i].id;
			var multiplier = 1;

			day.values[id] = this.getNewPlayerScoreObject(id);

			for (var j = 0; j < lastRanks.length; ++j) {
				if (lastRanks[j].id === id) {
					multiplier = lastRanks[j].multiplier;
					break;
				}
			}

			day.values[id].multiplier = multiplier;

		}

		this.model.scores.unshift(day);

		return day;

	}


	startGame = (day = 0) => {
		this.model.scores[day].staging = false;
		this.model.scores[day].date = new Date().toString();
	}

	getNewPlayerScoreObject = (playerid: string): Object => {

		var newScores = {
			"played": 0,
			"late": 0,
			"rank": 0,
			"multiplier": 1,
			"manualbadges": [],
			"lasttotal": this.model.scores.length > 0 &&
				this.model.scores[0].values[playerid] ? this.model.scores[0].values[playerid].newtotal : 0, // set to total score from last day
			"newtotal": this.model.scores.length > 0 &&
				this.model.scores[0].values[playerid] ? this.model.scores[0].values[playerid].newtotal : 0 // set to total score from last day
		};

		for (var p in this.model.points) {
			if (this.model.points.hasOwnProperty(p)) {
				newScores[p] = 0;
			}
		}

		for (var b in this.model.bonuses) {
			if (this.model.bonuses.hasOwnProperty(b)) {
				newScores[b] = 0;
			}
		}

		return newScores;
	}

	addPlayer = (firstname: string, lastname: string = "", email: string = ""): Object => {

		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var newid = "";

		do {
			newid = alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
				alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
				alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
				(Math.floor(Math.random() * 10)) +
				(Math.floor(Math.random() * 10)) +
				(Math.floor(Math.random() * 10));
		} while (this.playerIDExists(newid));

		var player = {
			"id": newid,
			"active": true,
			"firstname": firstname,
			"lastname": lastname,
			"email": email,
			"avatar": ((firstname.split(" ").join("_")) + ".jpg").toLowerCase()
		};

		this.model.players.push(player); // add to player list
		this.model.games[player.id] = 0; // add games counter
		this.model.scores[0].values[player.id] = this.getNewPlayerScoreObject(player.id); // add scores object to latest day

		this.model.scores[0].values[player.id].multiplier = this.getPlayerMultiplier(player.id);

		return { id: player.id, firstname: player.firstname, lastname: player.lastname, email: player.email, avatar: player.avatar, scores: this.model.scores[0].values[player.id] };
	}

	setDayComplete = (day: number = 0) => {
		this.model.scores[day].staging = false;
		this.model.scores[day].complete = 1;
	}

	setDayManualConditions = (value: string[], day: number = 0) => {
		this.model.scores[day].conditions.manual = value;
	}

	setDayConditions = (temp: number, windspd: number, winddir: string, cloud: string, rain: string, humidity: number, airpressure: number, apptemp: number, day: number = 0) => {

		this.model.scores[day].conditions["temp"] = temp;
		this.model.scores[day].conditions["apptemp"] = apptemp;
		this.model.scores[day].conditions["windspd"] = windspd;
		this.model.scores[day].conditions["winddir"] = winddir;
		this.model.scores[day].conditions["cloud"] = cloud;
		this.model.scores[day].conditions["rain"] = rain;
		this.model.scores[day].conditions["humidity"] = humidity;
		this.model.scores[day].conditions["airpressure"] = airpressure;

	}

	setDayNumPlayers = (value: number, day: number = 0) => {
		this.model.scores[day].numPlayers = value;
	}

	playerIDExists = (playerid: string) => {

		for (var i = 0; i < this.model.players.length; ++i) {
			if (this.model.players[i].id === playerid) {
				return true;
			}
		}

		return false;
	}

	updatePlayerTotal = (playerid: string, day: number = 0) => {

		var playerscore = this.model.scores[day].values[playerid];
		var lasttotal: number = playerscore.lasttotal;
		var newtotal = lasttotal;
		var multiplier = 1;
		var points = 0;

		// only apply multipliers after day 1
		if (this.model.scores.length > 1) {
			multiplier = playerscore.multiplier;
		}

		// late bonus multiplier always applies
		if (playerscore.late) {
			multiplier += 1;
		}

		for (var p in this.model.points) {
			if (this.model.points.hasOwnProperty(p)) {
				points += (playerscore[p] * this.model.points[p].value);
			}
		}
		for (var b in this.model.bonuses) {
			if (this.model.bonuses.hasOwnProperty(b) && b != "late") {
				points += (playerscore[b] * this.model.bonuses[b].value);
			}
		}

		newtotal += (points * multiplier);

		this.model.scores[day].values[playerid].newtotal = newtotal;

	}

	clearPlayerScores = (playerid: string, day: number = 0) => {

		for (var p in this.model.points) {
			this.model.scores[day].values[playerid][p] = 0;
		}
		for (var b in this.model.bonuses) {
			this.model.scores[day].values[playerid][b] = 0;
		}

		this.model.scores[day].values[playerid].late = 0;

		this.updatePlayerTotal(playerid, day);

	}

	updatePlayerRankings = (day: number = 0) => {
		var rankings = this.getPlayerRankings();

		for (var i = 0; i < rankings.length; ++i) {
			this.model.scores[day].values[rankings[i].id].rank = rankings[i].rank;
		}
	}

	addPlayerManualBadge = (playerid: string, badgeid: string, day: number = 0) => {

		if (!this.model.scores[day].values[playerid]) {
			return;
		}

		this.model.scores[day].values[playerid].manualbadges.push(badgeid);
	}

	addPlayerPowerup = (playerid: string, powerup: PowerUp, day: number = 0) => {

		if (!this.model.scores[day].values[playerid]) {
			return;
		}

		if (!this.model.powerbank[playerid]) {
			this.model.powerbank[playerid] = [];
		}

		this.model.powerbank[playerid].push({
			id: powerup.id,
			date: new Date().toString(),
			game: this.model.scores.length - day,
			used: false,
			health: typeof powerup.health === "undefined" ? 5 : powerup.health,
			dateused: "",
			gameused: -1,
			usedagainst: ""
		});

	}

	usePlayerPowerup = (playerid: string, powerup: string, against: string = ""): boolean => {

		if (!this.model.powerbank || !this.model.powerbank[playerid]) {
			return false;
		}

		var oldest = 6;
		var id = -1;

		for (var i = 0; i < this.model.powerbank[playerid].length; i++) {
			if (this.model.powerbank[playerid][i].id === powerup &&
				!this.model.powerbank[playerid][i].used) {

				//this.model.powerbank[playerid][i].used = true;
				//this.model.powerbank[playerid][i].dateused = new Date().toString();
				//this.model.powerbank[playerid][i].gameused = this.model.scores.length;

				//return true;
				if (this.model.powerbank[playerid][i].health < oldest) {
					id = i;
				}
			}
		}

		if (id > -1) {
			this.model.powerbank[playerid][id].used = true;
			this.model.powerbank[playerid][id].dateused = new Date().toString();
			this.model.powerbank[playerid][id].gameused = this.model.scores.length;
			this.model.powerbank[playerid][id].usedagainst = against;

			return true;
		}

		return false;
	}

	getPlayerNumPowerupsEarned = (playerid: string): number => {

		if (!this.model.powerbank || !this.model.powerbank[playerid]) {
			return 0;
		}

		return this.model.powerbank[playerid].length;
	}

	decayPowerups = (playerid: string, amount: number) => {

		if (!this.model.powerbank || !this.model.powerbank[playerid]) {
			return;
		}

		for (var i = 0; i < this.model.powerbank[playerid].length; i++) {

			if (!this.model.powerbank[playerid][i].used) {
				this.model.powerbank[playerid][i].health += amount;
			}
		}

	}

	generatePowerup = (exclude: string[] = []) => {

		var powerups: PowerUp[] = Object.keys(this.model.powerups)
			.map(p => this.model.powerups[p])
			.filter(p => p.active !== false)
			.filter(p => !exclude.includes(p.id));

		// for (var p in this.model.powerups) {
		// 	// filter out inactive powerups

		// 	if (exclude.includes(p)) {
		// 		continue;
		// 	}

		// 	if (this.model.powerups[p].active !== false) {
		// 		powerups.push(this.model.powerups[p]);
		// 	}
		// }

		var total = 0;

		for (var i = 0; i < powerups.length; i++) {
			total += powerups[i].chance;
		}

		var rand = Math.random() * total;
		var result = -1;

		for (var i = 0; i < powerups.length; i++) {
			var powerup = powerups[i];

			if (rand < powerup.chance) {
				result = i;
				break;
			}

			rand -= powerup.chance;
		}

		//var result:number = Math.floor(Math.random() * powerups.length);
		//console.log(powerups[result]);

		return powerups[result];

	}

	deletePlayerManualBadge = (playerid: string, badgeindex: number, day: number = 0) => {

		if (!this.model.scores[day].values[playerid]) {
			return;
		}

		this.model.scores[day].values[playerid].manualbadges.splice(badgeindex, 1);
	}


	setPlayerPoint = (playerid: string, pointtype: string, value: number, day: number = 0): number => {

		if (!this.model.scores[day].values[playerid]) {
			return -1;
		}

		this.model.scores[day].values[playerid][pointtype] = value;

		this.updatePlayerTotal(playerid, day);

		return this.model.scores[day].values[playerid][pointtype];
	}

	setPlayerBonus = (playerid: string, bonustype: string, value: number, day: number = 0): number => {

		if (!this.model.scores[day].values[playerid]) {
			return -1;
		}

		this.model.scores[day].values[playerid][bonustype] = value;

		this.updatePlayerTotal(playerid, day);

		return this.model.scores[day].values[playerid][bonustype];
	}

	setPlayerLate = (playerid: string, late: boolean, day: number = 0): boolean => {

		if (!this.model.scores[day].values[playerid]) {
			return false;
		}

		this.model.scores[day].values[playerid].late = late ? 1 : 0;

		this.updatePlayerTotal(playerid, day);

		return this.model.scores[day].values[playerid].late;
	}

	setPlayerIsPlaying = (playerid: string, isPlaying: boolean, day: number = 0): boolean => {

		if (typeof this.model.games[playerid] == "undefined") {
			return false;
		}

		var played = this.model.scores[day].values[playerid].played === 1;

		if (isPlaying !== played) {

			if (isPlaying) {
				this.model.games[playerid] += 1;
				this.decayPowerups(playerid, - 1);
			} else {
				this.model.games[playerid] -= 1;
				this.decayPowerups(playerid, 1);
			}

		}

		this.model.scores[day].values[playerid].played = isPlaying ? 1 : 0;

		return this.model.games[playerid];
	}
}