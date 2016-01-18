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

	static getPlayerRawScore(playerid: string, bonuses:boolean=true): number {

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

	static getPlayerAverageRawScore(playerid: string, bonuses: boolean = true): number {

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
}