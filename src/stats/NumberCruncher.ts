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
    static gamescache: Object;

    static init(model: ScoreData) {
        this.model = model;
        this.gamescache = {};
    }

    static getTotalPowerupsGenerated(id: string = "all"): number {
        var count: number = 0;

        for (var p in this.model.powerbank) {
            if (id === "all") {
                count += this.model.powerbank[p].length;
            } else {
                for (var i = 0; i < this.model.powerbank[p].length; i++) {
                    if (this.model.powerbank[p][i].id === id) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    static getTotalDetailedPowerupsGenerated(): any[] {
        //var count:number = 0;
        var types: Object = {
            total: {
                used: 0,
                received: 0
            }
        };

        if (!this.model.powerbank) {
            return [
                {
                    image: "powerup.svg",
                    label: "total",
                    used: 0,
                    received: 0
                }
            ];
        }

        for (var p in this.model.powerbank) {
            types["total"].received += this.model.powerbank[p].length;

            for (var i = 0; i < this.model.powerbank[p].length; i++) {
                if (!types[this.model.powerbank[p][i].id]) {
                    types[this.model.powerbank[p][i].id] = {
                        used: 0,
                        received: 0
                    };
                }

                types[this.model.powerbank[p][i].id].received++;

                if (
                    this.model.powerbank[p][i].used ||
                    this.model.powerbank[p][i].id === "nope" ||
                    this.model.powerbank[p][i].id === "immunity"
                ) {
                    types["total"].used++;
                    types[this.model.powerbank[p][i].id].used++;
                }

                /*if (this.model.powerbank[p][i].id === "nope" || this.model.powerbank[p][i].id === "immunity") {
					types[this.model.powerbank[p][i].id].used++;
				}*/
            }
        }

        return Object.keys(types).map(item => {
            return {
                image:
                    item === "total" || item === "used"
                        ? "powerup.svg"
                        : this.model.powerups[item].image,
                label: item,
                used: types[item].used,
                received: types[item].received
            };
        });
    }

    static getTotalDetailedPowerupsGeneratedForPlayer(playerid: string): any[] {
        var types: Object = {
            total: {
                used: 0,
                received: 0
            }
        };

        if (!this.model.powerbank) {
            return [
                {
                    image: "powerup.svg",
                    label: "total",
                    used: 0,
                    received: 0
                }
            ];
        }

        if (this.model.powerbank[playerid]) {
            types["total"].received += this.model.powerbank[playerid].length;

            for (var i = 0; i < this.model.powerbank[playerid].length; i++) {
                if (!types[this.model.powerbank[playerid][i].id]) {
                    types[this.model.powerbank[playerid][i].id] = {
                        used: 0,
                        received: 0
                    };
                }

                types[this.model.powerbank[playerid][i].id].received++;

                if (
                    this.model.powerbank[playerid][i].used ||
                    this.model.powerbank[playerid][i].id === "nope" ||
                    this.model.powerbank[playerid][i].id === "immunity"
                ) {
                    types["total"].used++;
                    types[this.model.powerbank[playerid][i].id].used++;
                }
            }
        } else {
            return [
                {
                    image: "powerup.svg",
                    label: "total",
                    used: 0,
                    received: 0
                }
            ];
        }

        return Object.keys(types).map(item => {
            return {
                image:
                    item === "total" || item === "used"
                        ? "powerup.svg"
                        : this.model.powerups[item].image,
                label: item,
                used: types[item].used,
                received: types[item].received
            };
        });
    }

    static getPlayerTotalGames(playerid: string): number {
        if (typeof this.gamescache[playerid] !== "undefined") {
            return this.gamescache[playerid];
        }

        const count = this.model.scores
            .map(s => {
                return s.values[playerid] && s.values[playerid].played ? 1 : 0;
            })
            .reduce((a, b) => a + b, 0);

        this.gamescache[playerid] = count;

        return count;
    }

    static getPlayerTotalPointsOfType(
        playerid: string,
        pointtype: string
    ): number {
        var total = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid][pointtype]
            ) {
                total += this.model.scores[i].values[playerid][pointtype];
            }
        }

        return total;
    }

    static getPlayerTotalScore(playerid: string): number {
        var score = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].played === 1
            ) {
                return this.model.scores[i].values[playerid].newtotal;
            }
        }

        return 0;
    }

    static getPlayerDistance(playerid: string): number {
        var dist = 0;
        var distances = {
            point01: 4.3, // 1st key
            point02: 4.3, // 2nd key
            point02B: 12.6, // 3pt line
            point03: 12.6, // 3pt line
            "03-01": 4,
            "03-B": 15,
            "B-01": 14
        };

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].played === 1
            ) {
                for (var p in this.model.points) {
                    if (
                        p !== "boundy" &&
                        this.model.points.hasOwnProperty(p) &&
                        this.model.scores[i].values[playerid][p]
                    ) {
                        dist +=
                            distances[p] *
                            this.model.scores[i].values[playerid][p];
                    }
                }

                if (this.model.scores[i].values[playerid]["boundy"] > 0) {
                    dist +=
                        distances["03-B"] *
                        this.model.scores[i].values[playerid]["boundy"];
                    dist +=
                        distances["B-01"] *
                        this.model.scores[i].values[playerid]["boundy"];
                } else {
                    if (this.model.scores[i].values[playerid]["point01"] > 1) {
                        dist +=
                            distances["03-01"] *
                            (1 +
                                this.model.scores[i].values[playerid][
                                    "boundy"
                                ] -
                                this.model.scores[i].values[playerid][
                                    "point01"
                                ]);
                    }
                }

                dist += 5; // add extra 5 meters average for finishing between points
            }
        }

        return Math.ceil(dist);
    }

    static getPlayerTotalSuccessfullShots(playerid: string): number {
        var shotCounts = {
            point01: 6, // 1st key
            point02: 5, // 2nd key
            point02B: 3, // 2nd key
            point03: 2, // 3pt line
            boundy: 1 // boundy
        };

        var shots = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].played === 1
            ) {
                for (var p in this.model.points) {
                    if (
                        this.model.points.hasOwnProperty(p) &&
                        this.model.scores[i].values[playerid][p]
                    ) {
                        shots +=
                            shotCounts[p] *
                            this.model.scores[i].values[playerid][p];
                    }
                }

                shots += 2.5; // add 2.5 extra shots per game for typically finishing between point shots
            }
        }

        return Math.ceil(shots);
    }

    static getPlayerStreak(
        playerid: string,
        daystart: number = 0,
        threshhold: number = 4
    ): number {
        var streak = 0;

        for (var i = daystart; i < this.model.scores.length; ++i) {
            if (this.model.scores[i].values[playerid].played === 1) {
                var raw = this.getPlayerRawScoreOnDay(playerid, i, true);

                if (raw > threshhold) {
                    streak++;
                } else {
                    break;
                }
            }
        }

        return streak;
    }

    static getPlayerRawScoreOnDay(
        playerid: string,
        day: number = 0,
        bonuses: boolean = false
    ): number {
        var score = 0;

        //for (var i = day; i < this.model.scores.length; ++i) {

        if (
            this.model.scores[day].values[playerid] &&
            this.model.scores[day].values[playerid].played === 1
        ) {
            for (var p in this.model.points) {
                if (
                    this.model.points.hasOwnProperty(p) &&
                    this.model.scores[day].values[playerid][p]
                ) {
                    score +=
                        this.model.points[p].value *
                        this.model.scores[day].values[playerid][p];
                }
            }

            if (bonuses) {
                for (var b in this.model.bonuses) {
                    if (
                        this.model.bonuses.hasOwnProperty(b) &&
                        this.model.scores[day].values[playerid][b] &&
                        b != "late"
                    ) {
                        score +=
                            this.model.bonuses[b].value *
                            this.model.scores[day].values[playerid][b];
                    }
                }
            }
        }
        //}

        return score;
    }

    static getPlayerRawScore(
        playerid: string,
        bonuses: boolean = false
    ): number {
        var score = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].played === 1
            ) {
                for (var p in this.model.points) {
                    if (
                        this.model.points.hasOwnProperty(p) &&
                        this.model.scores[i].values[playerid][p]
                    ) {
                        score +=
                            this.model.points[p].value *
                            this.model.scores[i].values[playerid][p];
                    }
                }

                if (bonuses) {
                    for (var b in this.model.bonuses) {
                        if (
                            this.model.bonuses.hasOwnProperty(b) &&
                            this.model.scores[i].values[playerid][b] &&
                            b != "late"
                        ) {
                            score +=
                                this.model.bonuses[b].value *
                                this.model.scores[i].values[playerid][b];
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

        for (i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].played === 1
            ) {
                score =
                    this.model.scores[i].values[playerid].newtotal -
                    this.model.scores[i].values[playerid].lasttotal;

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

    static getPlayerAverageRawScore(
        playerid: string,
        bonuses: boolean = false
    ): number {
        if (this.getPlayerTotalGames(playerid) > 0) {
            var score = this.getPlayerRawScore(playerid, bonuses);

            return (
                Math.round(score / this.getPlayerTotalGames(playerid) * 100) /
                100
            );
        }

        return 0;
    }

    static getPlayerRankChanges(playerid: string): number[] {
        var ranks: number[] = [];

        for (var i = this.model.scores.length - 1; i >= 0; i--) {
            if (
                i < this.model.scores.length - 1 &&
                this.model.scores[i].values[playerid] &&
                this.model.scores[i + 1].values[playerid]
            ) {
                if (
                    this.getPlayerTotalGames(playerid) &&
                    this.getPlayerTotalGames(playerid) <= 1
                ) {
                    continue;
                }

                if (i < this.model.scores.length - 1) {
                    ranks.push(
                        this.model.scores[i + 1].values[playerid].rank -
                            this.model.scores[i].values[playerid].rank
                    );
                } else {
                    ranks.push(0);
                }
            } else {
                ranks.push(0);
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
                    if (
                        this.model.points.hasOwnProperty(p) &&
                        this.model.scores[i].values[playerid][p]
                    ) {
                        newscore +=
                            this.model.points[p].value *
                            this.model.scores[i].values[playerid][p];
                    }
                }

                for (var b in this.model.bonuses) {
                    if (
                        this.model.bonuses.hasOwnProperty(b) &&
                        this.model.scores[i].values[playerid][b] &&
                        b !== "late"
                    ) {
                        newscore +=
                            this.model.bonuses[b].value *
                            this.model.scores[i].values[playerid][b];
                    }
                }

                var multiplier = this.model.scores[i].values[playerid]
                    .multiplier;

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
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].late
            ) {
                if (this.model.scores[i].values[playerid].late === 1) {
                    total++;
                }
            }
        }

        return total;
    }

    static getPlayerPercentPlayed(playerid: string): number {
        if (this.getPlayerTotalGames(playerid)) {
            return (
                Math.round(
                    this.getPlayerTotalGames(playerid) /
                        this.model.scores.length *
                        1000
                ) / 10
            );
        }

        return 0;
    }

    static getPlayerDaysAtFirstPlace(playerid: string): number {
        var total = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].rank
            ) {
                if (this.model.scores[i].values[playerid].rank === 1) {
                    total++;
                }
            }
        }

        return total;
    }

    static getPlayerDaysInMultiplier(
        playerid: string,
        multiplier: number,
        includelate: boolean = true
    ): number {
        var total = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (
                this.model.scores[i].values[playerid] &&
                this.model.scores[i].values[playerid].played > 0
            ) {
                var rank = this.model.scores[i].values[playerid].rank;
                var late = this.model.scores[i].values[playerid].late === 1;
                var multi = multiplier;

                if (includelate && late) multi = multiplier + 1;

                switch (multi) {
                    case 1:
                        if (rank >= 0 && rank <= 3) total++;
                        break;
                    case 2:
                        if (rank >= 4 && rank <= 6) total++;
                        break;
                    case 3:
                        if (rank >= 7 && rank <= 9) total++;
                        break;
                    case 4:
                        if (rank >= 10) total++;
                        break;
                    case 5:
                        if (late && rank >= 10) total++;
                        break;
                }
            }
        }

        return total;
    }

    static getPlayerIncompleteKeys(playerid: string): number {
        var total = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (this.model.scores[i].values[playerid]) {
                if (
                    this.model.scores[i].values[playerid].played &&
                    this.model.scores[i].values[playerid].point02 === 0
                ) {
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
                value: this.getPlayerTotalBonuses(
                    this.model.players[i].id,
                    true
                )
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

    static getPlayerWithHighestPointsOfType(
        type: string = "boundy"
    ): HighScoreObject {
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
                value: this.getPlayerTotalPointsOfType(
                    this.model.players[i].id,
                    type
                )
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

    static getPlayerTotalBonuses(
        playerid: string,
        countonly: boolean = false
    ): number {
        if (this.model.scores.length === 0) return 0;

        var total: number = 0;

        for (var i = 0; i < this.model.scores.length; ++i) {
            if (this.model.scores[i].values[playerid]) {
                for (var b in this.model.bonuses) {
                    if (this.model.bonuses.hasOwnProperty(b) && b != "late") {
                        if (countonly) {
                            total += this.model.scores[i].values[playerid][b];
                        } else {
                            total +=
                                this.model.scores[i].values[playerid][b] *
                                this.model.bonuses[b].value;
                        }
                    }
                }
            }
        }

        return total;
    }
}
