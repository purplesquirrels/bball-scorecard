///<reference path="../../app" />
///<reference path="../../controller/ScoreController" />

/// <reference path="../../charts/LineChart" />
/// <reference path="../../charts/PieChart" />
/// <reference path="../../charts/BarChart" />

class StatsView {

	statsRoot: HTMLDivElement;
	app: App;
	controller: ScoreController;

	constructor(root: HTMLDivElement, controller: ScoreController, app: App) {

		this.statsRoot = root;
		this.app = app;
		this.controller = controller;

		//this.statsRoot).append('<div class="c2-chart"></div>');

		var statHeaderSource = this.app.templates["stats-panel-header"];
		var statHeaderTemplate: HandlebarsTemplateDelegate = Handlebars.compile(statHeaderSource);
		var statheaderhtml = statHeaderTemplate({

		});

		$(this.statsRoot).append(statheaderhtml);

		var statsource = this.app.templates["stats-panel-season-stats"];
		var stattemplate: HandlebarsTemplateDelegate = Handlebars.compile(statsource);
		var stathtml = stattemplate({

		});

		$(this.statsRoot).append(stathtml);



		var _d = this.controller.getAsObject();
		var playerid;

		$(".left-1").prepend('<svg class="chart seasonProg"></svg>');
		var tt = DateUtil.getDaysRemaining(_d.scores[_d.scores.length - 1].date, _d.end_date);

		var seasonProg: PieChart = new PieChart('.seasonProg', {
			//outerRadius: 50,
			innerRadius: 36,
			sortValues: false,
			padAngle: 0,
			progressMode: true,
			data: [
				{
					name: "Played",
					value: _d.scores.length,
					colour: '#29ddc0'
				},
				{
					name: "Remaining",
					value: tt - _d.scores.length,
					colour: '#2e3548'
				}
			]
		});

		$(".left-2").prepend('<svg class="chart daysFirst"></svg>');

		var daysFirst: {}[] = [];

		for (var j = 0; j < _d.players.length; j++) {

			playerid = _d.players[j].id;

			var days = NumberCruncher.getPlayerDaysAtFirstPlace(playerid);

			if (days > 0) {
				var df = {
					"name": _d.players[j].firstname,
					"value": days
				}

				daysFirst.push(df);
			}

		}

		var daysFirstChart: PieChart = new PieChart('.daysFirst', {
			innerRadius: 36,
			sortValues: true,
			padAngle: 0.01,
			data: daysFirst
		});


		var seasonRank: {}[] = [];

		for (var j = 0; j < _d.players.length; j++) {

			playerid = _d.players[j].id;

			if (_d.games[playerid] === 0 || _d.scores[0].values[playerid] === 0) continue;

			// Player rank over time

			for (var i = 0; i < _d.scores.length; i++) {

				if (!_d.scores[i].values[playerid]) continue;

				var pt = {}

				pt.id = playerid;
				pt.name = _d.players[j].firstname;
				pt.x = i;
				pt.y = this.controller.getPlayerRank(playerid, i)//_d.scores[i].values[playerid].rank;


				seasonRank.push(pt);

			}
		}

		$(".right-2").prepend('<svg class="chart seasonRank"></svg>');
		var c1: LineChart = new LineChart(".seasonRank", {
			xlabel: "Time",
			ylabel: "Rank",
			interpolation: "basis", // basis
			//tension: 1.2,
			invertY: true,
			invertX: true,
			data: seasonRank,
			width: 700,
			height: 280,
			scales: false
		});

		$(".right-3").prepend('<svg class="chart playerRaw"></svg>');

		var playerRaw: {}[] = [];

		for (var j = 0; j < _d.players.length; j++) {

			playerid = _d.players[j].id;

			if (_d.games[playerid] === 0 || _d.scores[0].values[playerid] === 0) continue;

			var sc = NumberCruncher.getPlayerRawScore(playerid);

			if (sc > 0) {
				var pr = {
					"name": _d.players[j].firstname,
					"score": sc
				}

				playerRaw.push(pr);
			}

		}

		playerRaw.sort(function(a, b) {
			if (a.score < b.score) return 1;
			if (a.score > b.score) return -1;
			return 0;
		});

		//console.log(playerRaw);
		// /console

		var c3: BarChart = new BarChart(".playerRaw", {
			width: 700,
			height: 280,
			key: "name",
			value: "score",
			data: playerRaw
		});

	}
}