interface HighScoreObject {
	value: number;
	playerid: string[];
}

interface PlayerModeScore {
	score: number;
	occurrence: number;
}
class NumberCruncher {

	static model: ScoreData;

	static init(model:ScoreData) {
		this.model = model;
	}

	static getPlayerTotalPointsOfType(playerid:string, pointtype:string):number {

		var total = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] &&
				this.model.scores[i].values[playerid][pointtype]) {
				total += this.model.scores[i].values[playerid][pointtype];
			}

		}

		return total;
	}

	static getPlayerTotalScore(playerid: string): number {

		var score = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] && this.model.scores[i].values[playerid].played === 1) {

				return this.model.scores[i].values[playerid].newtotal;
			}

		}

		return 0;
	}

	static getPlayerDistance(playerid: string): number {
		var dist = 0;
		var distances = {
			"point01": 4.3, // 1st key
			"point02": 4.3, // 2nd key
			"point02B": 12.6, // 3pt line
			"point03": 12.6, // 3pt line
			"03-01" : 4,
			"03-B" : 15,
			"B-01" : 14
		}

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] && this.model.scores[i].values[playerid].played === 1) {

				for (var p in this.model.points) {
					if (p !== "boundy" && 
						this.model.points.hasOwnProperty(p) &&
						this.model.scores[i].values[playerid][p]) {

						dist += (distances[p] * this.model.scores[i].values[playerid][p]);
					}
				}

				if (this.model.scores[i].values[playerid]["boundy"] > 0) {
					dist += (distances["03-B"] * this.model.scores[i].values[playerid]["boundy"]);
					dist += (distances["B-01"] * this.model.scores[i].values[playerid]["boundy"]);
				} else {
					if (this.model.scores[i].values[playerid]["point01"] > 1) {
						dist += (distances["03-01"] * ((1 + this.model.scores[i].values[playerid]["boundy"]) - this.model.scores[i].values[playerid]["point01"]));
					}
				}

				dist += 5; // add extra 5 meters average for finishing between points
			}
		}

		return Math.ceil(dist);
	}

	static getPlayerTotalSuccessfullShots(playerid: string) :number {

		var shotCounts = {
			"point01" : 6, // 1st key
			"point02" : 5, // 2nd key
			"point02B" : 3, // 2nd key
			"point03" : 2, // 3pt line
			"boundy": 1 // boundy
		}

		var shots = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] && this.model.scores[i].values[playerid].played === 1) {

				for (var p in this.model.points) {
					if (this.model.points.hasOwnProperty(p) &&
						this.model.scores[i].values[playerid][p]) {

						shots += (shotCounts[p] * this.model.scores[i].values[playerid][p]);
					}
				}

				shots += 2.5; // add 2.5 extra shots per game for typically finishing between point shots
			}
		}

		return Math.ceil(shots);
	}

	static getPlayerRawScoreOnDay(playerid: string, day:number = 0, bonuses: boolean = false): number {

		var score = 0;

		//for (var i = day; i < this.model.scores.length; ++i) {

			if (this.model.scores[day].values[playerid] && this.model.scores[day].values[playerid].played === 1) {

				for (var p in this.model.points) {
					if (this.model.points.hasOwnProperty(p) &&
						this.model.scores[day].values[playerid][p]) {

						score += (this.model.points[p].value * this.model.scores[day].values[playerid][p]);
					}
				}

				if (bonuses) {
					for (var b in this.model.bonuses) {
						if (this.model.bonuses.hasOwnProperty(b) &&
							this.model.scores[day].values[playerid][b] && b != "late") {

							score += this.model.bonuses[b].value * (this.model.scores[day].values[playerid][b]);
						}
					}
				}
			}
		//}

		return score;
	}

	static getPlayerRawScore(playerid: string, bonuses:boolean=false): number {

		var score = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] && this.model.scores[i].values[playerid].played === 1) {

				for (var p in this.model.points) {
					if (this.model.points.hasOwnProperty(p) &&
						this.model.scores[i].values[playerid][p]) {

						score += (this.model.points[p].value * this.model.scores[i].values[playerid][p]);
					}
				}

				if (bonuses) {
					for (var b in this.model.bonuses) {
						if (this.model.bonuses.hasOwnProperty(b) &&
							this.model.scores[i].values[playerid][b] && b != "late") {

							score += this.model.bonuses[b].value * (this.model.scores[i].values[playerid][b]);
						}
					}
				}
			}
		}

		return score;
	}

	static getPlayerModeScore(playerid: string): PlayerModeScore {

		var scores = {};
		var i = 0;
		var score;

		for  (i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] && this.model.scores[i].values[playerid].played === 1) {

				score = this.model.scores[i].values[playerid].newtotal - this.model.scores[i].values[playerid].lasttotal;

				if (!scores[score]) {
					scores[score] = 1;
				} else {
					scores[score] += 1;
				}

			}
		}

		score = 0;

		for (var s in scores) {
			if (scores.hasOwnProperty(s)) {
				if (scores[s] > score) score = s;
			}
		}

		return { score: score, occurrence: scores[score] };
	}

	static getPlayerAverageRawScore(playerid: string, bonuses: boolean = false): number {

		if (this.model.games[playerid] > 0) {

			var score = this.getPlayerRawScore(playerid, bonuses);
			
			return Math.round(score / this.model.games[playerid] * 100) / 100;
		}

		return 0;
	}

	static getPlayerRankChanges(playerid: string): number[] {
		var ranks: number[] = [];

		for (var i = this.model.scores.length-1; i >= 0; i--) {
			if (this.model.scores[i].values[playerid]) {

				if (i < this.model.scores.length - 1) {
					ranks.push(this.model.scores[i+1].values[playerid].rank - this.model.scores[i].values[playerid].rank);
				} else {
					ranks.push(0);
				}
			}

		}

		return ranks;

	}

	static getPlayerHighestScore(playerid: string): number {

		var score = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid]) {

				var newscore = 0;

				for (var p in this.model.points) {
					if (this.model.points.hasOwnProperty(p) &&
						this.model.scores[i].values[playerid][p]) {

						newscore += (this.model.points[p].value * this.model.scores[i].values[playerid][p]);
					}
				}

				for (var b in this.model.bonuses) {
					if (this.model.bonuses.hasOwnProperty(b) &&
						this.model.scores[i].values[playerid][b] && b !== "late") {

						newscore += this.model.bonuses[b].value * (this.model.scores[i].values[playerid][b]);
					}
				}

				var multiplier = this.model.scores[i].values[playerid].multiplier;

				if (this.model.scores[i].values[playerid].late === 1) {
					multiplier = this.model.bonuses["late"].value;
				}

				newscore *= multiplier;

				if (newscore > score) {
					score = newscore;
				}
			}

		}

		return score;
	}

	static getPlayLateStarts(playerid: string): number {

		var total = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] &&
				this.model.scores[i].values[playerid].late) {

				if (this.model.scores[i].values[playerid].late === 1) {
					total++;
				}
			}

		}

		return total;
	}

	static getPlayerPercentPlayed(playerid: string): number {

		if (this.model.games[playerid]) {
			return Math.round(this.model.games[playerid] / this.model.scores.length * 1000) / 10;
		}

		return 0;
	}

	static getPlayerDaysAtFirstPlace(playerid: string): number {

		var total = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid] &&
				this.model.scores[i].values[playerid].rank) {

				if (this.model.scores[i].values[playerid].rank === 1) {
					total++;
				}
			}

		}

		return total;
	}

	static getPlayerIncompleteKeys(playerid: string): number {

		var total = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid]) {

				if (this.model.scores[i].values[playerid].played &&
					this.model.scores[i].values[playerid].point02 === 0) {

					total++;
				}
			}

		}

		return total;
	}

	static getPlayerTotalLaps(playerid: string): number {

		var total = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid]) {
				
				if (this.model.scores[i].values[playerid].point03 > 0) {
					
					total += this.model.scores[i].values[playerid].point03;
				}
			}

		}

		return total;
	}

	static getPlayerWithHighestLaps(): HighScoreObject {

		var i = 0;
		var laps: any[] = [];
		var result: HighScoreObject = {
			value: 0,
			playerid: []
		};

		for (i = 0; i < this.model.players.length; ++i) {
			laps.push({
				playerid: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
				value: this.getPlayerTotalLaps(this.model.players[i].id)
			});
		}

		laps.sort(function(a, b) {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
			return 0;
		});

		result.value = laps[0].value;

		for (i = 0; i < laps.length; ++i) {
			if (i === 0) {
				result.playerid.push(laps[i].firstname);
				continue;
			}
			if (laps[i].value === laps[i - 1].value) {
				result.playerid.push(laps[i].firstname);
			} else {
				break;
			}
		}
		return result;
	}

	static getPlayerWithHighestRawScore(): HighScoreObject {
		var i = 0;
		var scores: any[] = [];
		var result: HighScoreObject = {
			value: 0,
			playerid: []
		};

		for (i = 0; i < this.model.players.length; ++i) {
			scores.push({
				playerid: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
				value: this.getPlayerRawScore(this.model.players[i].id, false)
			});
		}

		scores.sort(function(a, b) {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
			return 0;
		});

		result.value = scores[0].value;

		for (i = 0; i < scores.length; ++i) {
			if (i === 0) {
				result.playerid.push(scores[i].firstname);
				continue;
			}
			if (scores[i].value === scores[i - 1].value) {
				result.playerid.push(scores[i].firstname);
			} else {
				break;
			}
		}
		return result;
	}

	static getPlayerWithHighestBonuses(): HighScoreObject {
		var i = 0;
		var scores: any[] = [];
		var result: HighScoreObject = {
			value: 0,
			playerid: []
		};

		for (i = 0; i < this.model.players.length; ++i) {
			scores.push({
				playerid: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
				value: this.getPlayerTotalBonuses(this.model.players[i].id, true)
			});
		}

		scores.sort(function(a, b) {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
			return 0;
		});

		result.value = scores[0].value;

		for (i = 0; i < scores.length; ++i) {
			if (i === 0) {
				result.playerid.push(scores[i].firstname);
				continue;
			}
			if (scores[i].value === scores[i - 1].value) {
				result.playerid.push(scores[i].firstname);
			} else {
				break;
			}
		}

		return result;
	}

	static getPlayerWithHighestScore(): HighScoreObject {
		var i = 0;
		var scores: any[] = [];
		var result: HighScoreObject = {
			value: 0,
			playerid: []
		};

		for (i = 0; i < this.model.players.length; ++i) {
			scores.push({
				playerid: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
				value: this.getPlayerTotalScore(this.model.players[i].id)
			});
		}

		scores.sort(function(a, b) {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
			return 0;
		});

		result.value = scores[0].value;

		for (i = 0; i < scores.length; ++i) {
			if (i === 0) {
				result.playerid.push(scores[i].firstname);
				continue;
			}
			if (scores[i].value === scores[i - 1].value) {
				result.playerid.push(scores[i].firstname);
			} else {
				break;
			}
		}
		return result;
	}

	static getPlayerWithHighestScoringGame(): HighScoreObject {
		var i = 0;
		var scores: any[] = [];
		var result: HighScoreObject = {
			value: 0,
			playerid: []
		};

		for (i = 0; i < this.model.players.length; ++i) {
			scores.push({
				playerid: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
				value: this.getPlayerHighestScore(this.model.players[i].id)
			});
		}

		scores.sort(function(a, b) {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
			return 0;
		});

		result.value = scores[0].value;

		for (i = 0; i < scores.length; ++i) {
			if (i === 0) {
				result.playerid.push(scores[i].firstname);
				continue;
			}
			if (scores[i].value === scores[i - 1].value) {
				result.playerid.push(scores[i].firstname);
			} else {
				break;
			}
		}
		return result;
	}

	static getPlayerWithHighestPointsOfType(type: string = "boundy"): HighScoreObject {

		var i = 0;
		var points: any[] = [];
		var result: HighScoreObject = {
			value: 0,
			playerid: []
		};

		for (i = 0; i < this.model.players.length; ++i) {
			points.push({
				playerid: this.model.players[i].id,
				firstname: this.model.players[i].firstname,
				value: this.getPlayerTotalPointsOfType(this.model.players[i].id, type)
			});
		}

		points.sort(function(a, b) {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
			return 0;
		});

		result.value = points[0].value;

		for (i = 0; i < points.length; ++i) {
			if (i === 0) {
				result.playerid.push(points[i].firstname);
				continue;
			}
			if (points[i].value === points[i - 1].value) {
				result.playerid.push(points[i].firstname);
			} else {
				break;
			}
		}
		return result;
	}

	static getPlayerTotalBonuses(playerid:string, countonly:boolean = false): number {

		if (this.model.scores.length === 0) return 0;

		var total:number = 0;

		for (var i = 0; i < this.model.scores.length; ++i) {

			if (this.model.scores[i].values[playerid]) {

				for (var b in this.model.bonuses) {
					if (this.model.bonuses.hasOwnProperty(b) && b != "late") {
						if (countonly) {
							total += (this.model.scores[i].values[playerid][b]);
						} else {
							total += (this.model.scores[i].values[playerid][b] * this.model.bonuses[b].value);
						}
					}
				}
			}

		}

		return total;
	}

	
}