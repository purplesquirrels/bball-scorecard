interface ScoreData {
	season_id: number;
	season: number;
	end_date: string;
	season_name: string;
	players: any[];
	games: Object;
	points: Object;
	bonuses: Object;
	scores: any[];
}

class ScoreController {

	savedState: ScoreData;
	model: ScoreData;
	ranker: IRanking;

	constructor(model: ScoreData) {

		this.model = model;
		this.savedState = null;

		this.ranker = this.getRankingSystem(Config.RANKING);

	}

	getRankingSystem = (type:string):IRanking => {
		switch (type) {
			case "dense":
				return new DenseRanking();
			case "standard":
			default:
				return new StandardRanking();
		}
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

	getGameIsComplete = (day:number = 0): boolean => {
		if (this.model.scores[day].complete === 1) {
			return true;
		}

		return false;
	}

	getLastCompletedDay = ():number => {
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

	getSeasonDateString = (): string => {

		return DateUtil.getSeasonDateString(this.model.season);
	}

	getEndDate = (): string => {
		return this.model.end_date;
	}

	getGameDate = (day:number = 0): string => {
		if (this.model.scores.length === 0) {

			var today = new Date();
			var yesterday = new Date(today.toString());
			yesterday.setDate(today.getDate() - 1);


			return yesterday.toString();

		} 
		
		return this.model.scores[day].date;
	}

	getGameNumber = (day:number = 0): number => {
		return this.model.scores.length - day;
	}

	getGameNumPlayers = (day: number = 0): number => {

		if (this.model.scores.length === 0) return 0;

		return this.model.scores[day].numPlayers;
	}


	getGamePlayers = (day: number = 0): any[] => {

		if (this.model.scores.length === 0) return [];

		//return this.model.scores[day].numPlayers;
		var players = [];

		for (var id in this.model.scores[day].values) {
			if (this.model.scores[day].values.hasOwnProperty(id) && this.model.scores[day].values[id].played) {

				var name = "";
				var score = 0;
				var rawscore = 0;
				var bonuses = 0;
				var i = 0;
				var player = {
					firstname: "",
					rank: 0,
					score: 0,
					bonuses: 0,
					rawscore: 0,
					multiplier: 1,
					late: false
				};


				for (i = 0; i < this.model.players.length; ++i) {
					if (this.model.players[i].id == id) {
						name = this.model.players[i].firstname;
						break;
					}
				}

				for (var p in this.model.points) {
					if (this.model.points.hasOwnProperty(p)) {
						player[p] = this.model.scores[day].values[id][p];
						rawscore += (this.model.scores[day].values[id][p] * this.model.points[p].value);
					}
				}

				for (var b in this.model.bonuses) {
					if (this.model.bonuses.hasOwnProperty(b) && b != "late") {
						player[b] = this.model.scores[day].values[id][b];
						bonuses += (this.model.scores[day].values[id][b] * this.model.bonuses[b].value);
					}
				}

				var multiplier = this.model.scores[day].values[id].multiplier;

				if (this.model.scores[day].values[id].late === 1) {
					multiplier += 1;
				}

				player.firstname = name;
				player.rank = this.model.scores[day].values[id].rank
				player.score = this.model.scores[day].values[id].newtotal - this.model.scores[day].values[id].lasttotal;
				player.bonuses = bonuses;
				player.rawscore = rawscore;
				player.multiplier = multiplier;
				player.late = this.model.scores[day].values[id].late === 1;

				
				players.push(player);
			}
		}

		// alphabetical
		players.sort(function(a, b) {
			if (a.score < b.score) return 1;
			if (a.score > b.score) return -1;
			return 0;
		});


		return players;
	}

	getDayConditions = (day: number = 0): Object => {

		if (this.model.scores.length === 0) return {};

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
		result.sort(function(a, b) {
			if(a.firstname < b.firstname) return -1;
			if(a.firstname > b.firstname) return 1;
			return 0;
		});

		return result;
	}

	getPlayerScores = (day:number = 0):any[] => {

		if (this.model.scores.length === 0) return [];

		var result = [];

		for (var i = 0; i < this.model.players.length; ++i) {

			result.push({
				id: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
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
		result.sort(function(a, b) {
			if (a.firstname < b.firstname) return -1;
			if (a.firstname > b.firstname) return 1;
			return 0;
		});

		return result;
	}

	getNumPlayers = (): number => {
		return this.model.players.length;
	}

	getPlayedIDAtIndex = (index:number): string => {
		return this.model.players[index].id;
	}

	getPlayerName = (playerid: string): string => {

		for (var i = 0; i < this.model.players.length; ++i) {

			if (this.model.players[i].id === playerid) {
				return this.model.players[i].firstname;
			}

		}

		return "Player " + playerid + " not found.";
	}

	getPlayerAvatar = (playerid: string): string => {

		for (var i = 0; i < this.model.players.length; ++i) {

			if (this.model.players[i].id === playerid) {
				return this.model.players[i].avatar || "anon.jpg";
			}

		}

		return "anon.jpg";
	}

	getPlayerIsPlaying = (playerid: string, day: number = 0): boolean => {

		if (this.model.scores.length === 0) return false;

		if (typeof this.model.games[playerid] == "undefined") {
			return false;
		}

		return this.model.scores[day].values[playerid].played === 1;

	}

	getPlayerRank = (playerid: string, day:number=0): number => {

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

	getPlayerRankings = (day:number = 0): any[] => {

		if (this.model.scores.length === 0) return [];

		var order:any[] = [];

		for (var i = 0; i < this.getNumPlayers(); ++i) {
			if (day === 0) {
				order.push({ id: this.getPlayedIDAtIndex(i), score: this.getPlayerLastTotalScore(this.getPlayedIDAtIndex(i)) })
			} else {
				order.push({ id: this.getPlayedIDAtIndex(i), score: this.getPlayerTotalScoreOnDay(this.getPlayedIDAtIndex(i), day) })
			}
		}
	
		order = this.ranker.rank(order, "score");

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

	getPlayerTotalScoreOnDay = (playerid: string, day:number = 0): number => {

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

		var ranknow = this.model.scores[0].values[playerid].rank;
		var ranklast;

		if (this.model.scores[1].values[playerid]) {
			ranklast = this.model.scores[1].values[playerid].rank;
		} else {
			return 0;
		}

		return ranklast - ranknow;
	}


	//// UPDATE

	deleteDay = (day:number=0):Object => {
		return this.model.scores.splice(day, 1)[0];
	}

	createNewDay = (): Object => {

		var lastRanks = this.getPlayerRankings();

		var day = {
			"date": new Date().toString(),
			"complete" : 0,
			"numPlayers" : 0,
			"conditions": {
                "temp": 0,
                "windspd": 0,
                "winddir": "-",
                "cloud": "-",
                "rain": "-",
                "manual": []
            },
			"values" : {}
		};

		for (var i = 0; i < this.model.players.length; ++i) {

			var id = this.model.players[i].id;
			var multiplier = 1;

			day.values[id] = this.getNewPlayerScoreObject(id);

			for (var j = 0; j < lastRanks.length;++j) {
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

	getNewPlayerScoreObject = (playerid:string): Object => {

		var newScores = {
			"played": 0,
			"late": 0,
			"rank": 0,
			"multiplier": 1,
			"lasttotal":this.model.scores.length > 0 &&
						this.model.scores[0].values[playerid] ? this.model.scores[0].values[playerid].newtotal : 0, // set to total score from last day
			"newtotal":	this.model.scores.length > 0 &&
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

	addPlayer = (firstname:string, lastname:string=""):Object => {
		
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
			"firstname": firstname,
			"lastname": lastname
		};

		this.model.players.push(player); // add to player list
		this.model.games[player.id] = 0; // add games counter
		this.model.scores[0].values[player.id] = this.getNewPlayerScoreObject(player.id); // add scores object to latest day

		this.model.scores[0].values[player.id].multiplier = this.getPlayerMultiplier(player.id);

		return { id: player.id, firstname: firstname, scores: this.model.scores[0].values[player.id] };
	}

	setDayComplete = (day: number = 0) => {
		this.model.scores[day].complete = 1;
	}

	setDayManualConditions = (value: string[], day: number = 0) => {
		this.model.scores[day].conditions.manual = value;
	}

	setDayConditions = (temp: number, windspd: number, winddir: string, cloud: string, rain: string, humidity:number, airpressure:number, day: number = 0) => {

		this.model.scores[day].conditions["temp"] = temp;
		this.model.scores[day].conditions["windspd"] = windspd;
		this.model.scores[day].conditions["winddir"] = winddir;
		this.model.scores[day].conditions["cloud"] = cloud;
		this.model.scores[day].conditions["rain"] = rain;
		this.model.scores[day].conditions["humidity"] = humidity;
		this.model.scores[day].conditions["airpressure"] = airpressure;
		
	}

	setDayNumPlayers = (value: number, day:number = 0) => {
		this.model.scores[day].numPlayers = value;
	}

	playerIDExists = (playerid:string) => {

		for (var i = 0; i < this.model.players.length; ++i) {
			if (this.model.players[i].id === playerid) {
				return true;
			}
		}

		return false;
	}

	updatePlayerTotal = (playerid:string, day:number = 0) => {

		var playerscore = this.model.scores[day].values[playerid];
		var lasttotal: number = playerscore.lasttotal;
		var newtotal = lasttotal;
		var multiplier = playerscore.multiplier;
		var points = 0;

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

		if (this.model.scores.length > 1) {
			newtotal += (points * multiplier);
		} else {
			newtotal += points; // No multipliers on first day
		}
		

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

	setPlayerPoint = (playerid:string, pointtype:string, value:number, day:number = 0): number => {

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

	setPlayerIsPlaying = (playerid: string, isPlaying: boolean, day:number = 0): boolean => {

		if (typeof this.model.games[playerid] == "undefined") {
			return false;
		}

		var played = this.model.scores[day].values[playerid].played === 1;

		if (isPlaying !== played) {

			if (isPlaying) {
				this.model.games[playerid] += 1;
			} else {
				this.model.games[playerid] -= 1;
			}

		}

		this.model.scores[day].values[playerid].played = isPlaying ? 1 : 0;

		return this.model.games[playerid];
	}
}