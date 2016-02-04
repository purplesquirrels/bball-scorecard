///<reference path="../../app" />
///<reference path="../../controller/ScoreController" />

/// <reference path="../../charts/LineChart" />
/// <reference path="../../charts/PieChart" />
/// <reference path="../../charts/BarChart" />
/// <reference path="../../charts/AreaChart" />

interface PlayerDataObject {
	id: string;
	name: string;
	x: number;
	y: number;
}

class StatsView {

	statsRoot: HTMLDivElement;
	app: App;
	controller: ScoreController;

	selectedView: string;

	playerCharts: IChart[];

	constructor(root: HTMLDivElement, controller: ScoreController, app: App) {

		this.statsRoot = root;
		this.app = app;
		this.controller = controller;

		this.playerCharts = [];
		this.selectedView = "season";

		var statHeaderSource = this.app.templates["stats-panel-header"];
		var statHeaderTemplate: HandlebarsTemplateDelegate = Handlebars.compile(statHeaderSource);
		var statheaderhtml = statHeaderTemplate({
			players: this.controller.getAllActivePlayers()
		});

		$(this.statsRoot).append(statheaderhtml);

		$(".stats-menu").on("click", ".stats-menu-item", (e) => {
			var id = $(e.currentTarget).data("id");
			
			if (this.selectedView !== id) {

				$(".stats-menu-item").removeClass("active");

				this.animateOff(() => {
					if (id === "season") {
						this.setSeasonStatView();
					} else {
						this.setPlayerStatView(id, this.selectedView === "season" ? false : true);
					}
				})

				this.selectedView = id;
			}
		});

		this.setSeasonStatView();

	}

	public deconstruct = () => {
		$(".chartTip").remove();
	}

	animateOff = (callback:Function) => {
		//TweenLite.to($(".stat-holder"), 1, { alpha: 0, onComplete: callback });

		$(".chartTip").remove();

		var counter = 0;
		var total = $(".stat-holder").length;

		$(".stat-holder").each((i, el) => {
			TweenLite.to(el, 0.35, { delay: 0.1 + (Math.random() * 0.3), alpha: 0, onComplete:()=>{
				counter++;
				if (counter >= total) {
					callback();
				}
			} });
		});
	}

	animateOn = (callback?: Function) => {

		TweenLite.set($(".stat-holder"), { alpha: 0 });

		$(".stat-holder").each((i ,el) => {
			TweenLite.to(el, 1, { delay: 0.3 + (Math.random() * 0.3), alpha: 1 });
		});

		//TweenLite.to($(".stat-holder"), 1, { delay: 1, alpha: 1 });
	}

	setPlayerStatView = (playerid: string, update:boolean = false) => {

		var _d = this.controller.getAsObject();
		var dist = NumberCruncher.getPlayerDistance(playerid);
		var badges: Badge[] = Badger.getAllBadgesForPlayer(playerid);

		var statscontext = {
			firstname: this.controller.getPlayerName(playerid),
			boundys: NumberCruncher.getPlayerTotalPointsOfType(playerid, "point04"),
			totallaps: NumberCruncher.getPlayerTotalLaps(playerid),
			rawscore: NumberCruncher.getPlayerRawScore(playerid, false),
			highestscore: NumberCruncher.getPlayerHighestScore(playerid),
			incompletekeys: NumberCruncher.getPlayerIncompleteKeys(playerid),
			percentplayed: NumberCruncher.getPlayerPercentPlayed(playerid),
			daysatfirst: NumberCruncher.getPlayerDaysAtFirstPlace(playerid),
			latestarts: NumberCruncher.getPlayLateStarts(playerid),
			averagerawscore: NumberCruncher.getPlayerAverageRawScore(playerid, false),
			modescore: NumberCruncher.getPlayerModeScore(playerid).score,
			distance: dist > 1000 ? Math.round(dist / 10) / 100 : dist,
			dist_unit: dist > 1000 ? "km" : "m",
			s_shots: NumberCruncher.getPlayerTotalSuccessfullShots(playerid),

			hasBadges: badges.length > 0,
			badges: badges
		};

		var percentplayed = NumberCruncher.getPlayerPercentPlayed(playerid);
		var seasonProgData: {}[] = [
			{
				name: "Played",
				value: percentplayed,
				colour: '#FA9C5B'
			},
			{
				name: "Missed",
				value: 100 - percentplayed,
				colour: '#2e3548'
			}
		];
		

		var seasonRank: PlayerDataObject[] = [];

		for (var j = 0; j < _d.players.length; j++) {

			if (_d.players[j].id === playerid) {

				if (_d.games[playerid] === 0 || _d.scores[0].values[playerid] === 0) continue;

				for (var i = 0; i < _d.scores.length; i++) {

					if (!_d.scores[i].values[playerid]) continue;

					var pt: PlayerDataObject = {
						id : playerid,
						name : _d.players[j].firstname,
						x : i,
						y : this.controller.getPlayerRank(playerid, i)//_d.scores[i].values[playerid].rank;		
					};

					seasonRank.push(pt);
				}

				break;
			}
		}

		//NumberCruncher.getPlayerRawScore()

		var seasonScore: PlayerDataObject[] = [];

		for (var j = 0; j < _d.players.length; j++) {

			if (_d.players[j].id === playerid) {

				if (_d.games[playerid] === 0 || _d.scores[0].values[playerid] === 0) continue;

				//var scores = [];

				for (var i = 0; i < _d.scores.length; i++) {

					if (!_d.scores[i].values[playerid]) continue;

					var pt: PlayerDataObject = <PlayerDataObject>{};

					var dayraw = NumberCruncher.getPlayerRawScoreOnDay(playerid, i, true);

					//scores.push(dayraw);

					pt.id = playerid;
					pt.name = _d.players[j].firstname;
					pt.x = i;
					pt.y = dayraw * 3;//(_d.scores[i].values[playerid].newtotal - _d.scores[i].values[playerid].lasttotal) * 1.5;

					seasonScore.push(pt);

					pt = <PlayerDataObject>{};

					pt.id = "temp";
					pt.name = _d.players[j].firstname;
					pt.x = i;
					pt.y = this.controller.getDayConditions(i).temp / 3.5;

					seasonScore.push(pt);
				}

				break;
			}
		}
		

		/*if (update) {
			console.log("update charts");


			//seasonProg
			this.playerCharts[0].update(seasonProgData);



			// player rank
			this.playerCharts[1].update(seasonRank);


			//player score
			this.playerCharts[2].update(seasonScore);



		} else {*/

			this.playerCharts = [];

			$(this.statsRoot).find(".stat-view").remove();

			var statsource = this.app.templates["stats-panel-player-stats"];
			var stattemplate: HandlebarsTemplateDelegate = Handlebars.compile(statsource);

			var stathtml = stattemplate(statscontext);

			$(this.statsRoot).find(".season-stats-holder").append(stathtml);

			$(".left-1").prepend('<svg class="chart playerAtt"></svg>');

			var seasonProg: PieChart = new PieChart('.playerAtt', {
				innerRadius: 36,
				sortValues: false,
				padAngle: 0,
				progressMode: true,
				data: seasonProgData
			});

			this.playerCharts.push(seasonProg);

			$(".right-2").prepend('<svg class="chart seasonRank"></svg>');
			var c1: AreaChart = new AreaChart(".seasonRank", {
				xlabel: "Time",
				ylabel: "Rank",
				interpolation: "basis", // basis
				//tension: 1.2,
				invertY: true,
				invertX: true,
				data: seasonRank,
				width: 700,
				height: 280,
				scales: false,
				colour: '#3ADDD3'
			});

			this.playerCharts.push(c1);


			
			$(".right-3").prepend('<svg class="chart seasonScore"></svg>');
			var c2: AreaChart = new AreaChart(".seasonScore", {
				xlabel: "Time",
				ylabel: "Score",
				interpolation: "basis",
				invertY: false,
				invertX: true,
				data: seasonScore,
				width: 700,
				height: 280,
				scales: false,
				colour: ['#6c8fee', '#F9B450']
			});

			this.playerCharts.push(c2);
		//}



		this.animateOn();
	}

	setSeasonStatView = () => {

		$(this.statsRoot).find(".stat-view").remove();

		var statsource = this.app.templates["stats-panel-season-stats"];
		var stattemplate: HandlebarsTemplateDelegate = Handlebars.compile(statsource);

		var statscontext = {
			totalscore_value: "20",
			totalscore_playername: "Greg",

			rawscore_value: "",
			rawscore_playername: "",
			highestscore_value: "",
			highestscore_playername: "",
			boundys_value: "",
			boundys_playername: "",
			laps_value: "",
			laps_playername: ""
		}

		var score: HighScoreObject = NumberCruncher.getPlayerWithHighestScore();
		statscontext.totalscore_value = score.value + "";
		statscontext.totalscore_playername = score.playerid.join("<br>");

		var highraw: HighScoreObject = NumberCruncher.getPlayerWithHighestRawScore();
		statscontext.rawscore_value = highraw.value + "";
		statscontext.rawscore_playername = highraw.playerid.join("<br>");

		var highscore: HighScoreObject = NumberCruncher.getPlayerWithHighestScoringGame();
		statscontext.highestscore_value = highscore.value + "";
		statscontext.highestscore_playername = highscore.playerid.join("<br>");

		var boundys: HighScoreObject = NumberCruncher.getPlayerWithHighestPointsOfType("point04");
		statscontext.boundys_value = boundys.value + "";
		statscontext.boundys_playername = boundys.playerid.join("<br>");

		var laps: HighScoreObject = NumberCruncher.getPlayerWithHighestLaps();
		statscontext.laps_value = laps.value + "";
		statscontext.laps_playername = laps.playerid.join("<br>");


		var stathtml = stattemplate(statscontext);

		

		$(this.statsRoot).find(".season-stats-holder").append(stathtml);



		var _d = this.controller.getAsObject();
		var playerid;

		$(".left-1").prepend('<svg class="chart seasonProg"></svg>');

		var seasonProg: PieChart = new PieChart('.seasonProg', {
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
					value: this.controller.getDaysRemaining(),
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
			innerRadius: 35,
			sortValues: true,
			padAngle: 0.01,
			detailsOnHover: true,
			data: daysFirst
		});


		var seasonRank: {}[] = [];

		for (var j = 0; j < _d.players.length; j++) {

			playerid = _d.players[j].id;

			if (_d.games[playerid] === 0 || _d.scores[0].values[playerid] === 0) continue;

			// Player rank over time

			for (var i = 0; i < _d.scores.length; i++) {

				if (!_d.scores[i].values[playerid]) continue;

				var pt: PlayerDataObject = <PlayerDataObject>{};

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

		var c3: BarChart = new BarChart(".playerRaw", {
			width: 700,
			height: 280,
			key: "name",
			value: "score",
			data: playerRaw,
			sort: "desc"
		});

		var leaders = $(".leader-stat").toArray();

		leaders = leaders.map(function(element, index) {
			return {
				element: $(element),
				final: parseInt($(element).data("value"), 10),
				val: parseInt($(element).find(".leader-stat-ring span").text(), 10)
			}
		});

		var total = leaders.length;
		var complete = 0;
		
		var inter = setInterval(() => {
			for (var i = leaders.length-1; i >= 0; i--) {
				
				if (leaders[i].final === leaders[i].val) {
					complete++;
					leaders.splice(i, 1);
				} else {
					leaders[i].val += 1;
					leaders[i].element.find(".leader-stat-ring span").text(leaders[i].val)
				}
			}

			if (complete === leaders.length) {
				clearInterval(inter);
			}
		}, 20)

		

		this.animateOn();
	}
}