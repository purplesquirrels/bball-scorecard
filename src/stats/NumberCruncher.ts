interface HighScoreObject {
	value: number;
	playerid: string[];
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

	static getPlayerAverageRawScore(playerid: string, bonuses: boolean = false): number {

		if (this.model.games[playerid] > 0) {

			var score = this.getPlayerRawScore(playerid, bonuses);
			
			return Math.round(score / this.model.games[playerid] * 100) / 100;
		}

		return 0;
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

	static getPlayerWithHighestPointsOfType(type: string = "point04"): HighScoreObject {

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

	
}