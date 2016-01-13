/// <reference path="typing/handlebars.d.ts" />
/// <reference path="typing/jquery.d.ts" />
/// <reference path="typing/d3.d.ts" />
/// <reference path="state/ViewState" />
/// <reference path="state/NewDayState" />
/// <reference path="state/EditState" />
/// <reference path="modal/NewPlayer" />

/// <reference path="charts/LineChart" />
/// <reference path="charts/PieChart" />

interface JQuery {
	pickadate(options?: any): JQuery;
	dropdown(options?: any): JQuery;
	openModal(options?: any): JQuery;
	closeModal(options?: any): JQuery;
	collapsible(options?: any): JQuery;
	material_select(options?: any): JQuery;
	tooltip(options?: any): JQuery;
	mixItUp(options?: any): JQuery;
}
interface States {
	view: ViewState;
	newDay: NewDayState;
	edit: EditState;
}

class StateType {
	static VIEW: string = "view";
	static NEW_DAY: string = "newDay";
	static EDIT: string = "edit";
}

interface Rectangle {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

class App {

	data: ScoreData;
	scoreController: ScoreController;
	root: HTMLDivElement;
	scoreboardRoot: HTMLDivElement;
	statsRoot: HTMLDivElement;

	templates: Object;
	buttonActions: Object;

	editButton: HTMLButtonElement;

	states: States;

	constructor(rootSelector: string = ".app") {

		this.buttonActions = {
			"state": (action: string) => {

				this.setState(action);
			}
		}

		$.getJSON(Config.GET_PATH).done((data) => {
			this.init(rootSelector, typeof data == "string" ? JSON.parse(data) : data);
		}).fail((data) => {
			$("body").append(data.responseText);
		});

	}

	init = (rootSelector: string = ".app", data: any) => {

		this.scoreController = new ScoreController(<ScoreData>data);

		NumberCruncher.init(<ScoreData>data);
		
		this.root = <HTMLDivElement>document.querySelector(rootSelector);
		this.scoreboardRoot = <HTMLDivElement>this.root.querySelector(".scoreboard");
		this.statsRoot = <HTMLDivElement>this.root.querySelector(".stats");

		this.templates = {};

		$.get("templates/templates.html").then((data) => {

			$(data).each((index, element) => {

				if (element.nodeName.toLowerCase() === "script"){
					this.templates[element.id] = $(element).html();

					if (element.id.indexOf("partial_") > -1) {
						Handlebars.registerPartial($(element).data("name"), $(element).html());
					}
				}
			});

			this.showInitialView();
		})

	}

	showInitialView = () => {

		$(".initital-preloader").remove(); // removes the preloader

		Handlebars.registerHelper('isPlayingCheck', function(played) {
			return played ? 'checked' : '';
		});
		Handlebars.registerHelper('isLate', function(late) {
			return late ? 'checked' : '';
		});

		Handlebars.registerHelper('isPlayingEnable', function(played) {
			return !played ? 'disabled' : '';
		});

		var isEditable: string = this.getQueryParamByName("edit");

		var header = document.createElement("div");
		header.classList.add("app-header");

		this.states = {
			"edit": null,
			"view": null,
			"newDay": null
		}

		if (isEditable === "1") {

			NewPlayerModal.init(this.templates["modal-new-player"], this.scoreController);

			var headerSource = this.templates["app-header-template"];
			var headerTemplate: HandlebarsTemplateDelegate = Handlebars.compile(headerSource);
			var headerhtml = headerTemplate({
				daynotcreated: this.scoreController.getTotalGamesPlayed() <= 0 || (!DateUtil.dateIsToday(this.scoreController.getGameDate(0))) // last game date less than todays
			});

			header.innerHTML = headerhtml;
			this.scoreboardRoot.appendChild(header);

			$('.header-settings').dropdown({
				inDuration: 300,
				outDuration: 225,
				constrain_width: false, // Does not change width of dropdown to that of the activator
				hover: false, // Activate on hover
				gutter: 0, // Spacing from edge
				belowOrigin: true, // Displays dropdown below the button
				alignment: 'right' // Displays dropdown with edge aligned to the left of button
			});

			$("#settings-dropdown").on("click", "a", this.onSettingsItem);

			this.scoreboardRoot.appendChild(header);

			
			var authSource = this.templates["modal-app-auth"];
			var authTemplate: HandlebarsTemplateDelegate = Handlebars.compile(authSource);
			var authhtml = authTemplate({});

			document.body.appendChild($(authhtml).wrap("<div/>").parent()[0]);


			$('#authmodal').openModal({
				dismissible: false, // Modal can be dismissed by clicking outside of the modal
				ready: function() { 

					$(".pin-button").bind("click", function(e) {
						e.preventDefault();

						var n = $(this).text();
						var o = $(".pin-display").val();

						$(".pin-display").val(o + n);

						$.post(Config.AUTH_PATH, {
							pin: o + n
						}).then((result) => {
							if (result.authenticated) {
								$('#authmodal').closeModal();
							}
						});

					});

				},
				complete: function() {  }
			});
			
			this.states.edit = new EditState(this.scoreController, this);
			this.states.newDay = new NewDayState(this.scoreController, this);
			

		}

		this.states.view = new ViewState(this.scoreController, this);

		this.setState(StateType.VIEW);


		/////// CHARTS


		//this.statsRoot).append('<div class="c2-chart"></div>');

		var statHeaderSource = this.templates["stats-panel-header"];
		var statHeaderTemplate: HandlebarsTemplateDelegate = Handlebars.compile(statHeaderSource);
		var statheaderhtml = statHeaderTemplate({
			
		});

		$(this.statsRoot).append(statheaderhtml);

		var statsource = this.templates["stats-panel-season-stats"];
		var stattemplate: HandlebarsTemplateDelegate = Handlebars.compile(statsource);
		var stathtml = stattemplate({

		});

		$(this.statsRoot).append(stathtml);



		var _d = this.scoreController.getAsObject();
		var playerid;
		
		$(".left-1").prepend('<svg class="chart seasonProg"></svg>');
		var tt = DateUtil.getDaysRemaining(_d.scores[_d.scores.length - 1].date, _d.end_date);

		var seasonProg: PieChart = new PieChart('.seasonProg', {
			//outerRadius: 50,
			innerRadius: 36,
			sortValues: false,
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
				pt.y = this.scoreController.getPlayerRank(playerid, i)//_d.scores[i].values[playerid].rank;


				seasonRank.push(pt);

			}
		}

		$(".right-2").prepend('<svg class="chart seasonRank"></svg>');
		var c1: LineChart = new LineChart(".seasonRank", {
			xlabel: "Time",
			ylabel: "Rank",
			interpolation: "basis",
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

			var sc = this.scoreController.getPlayerLastTotalScore(playerid);

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
		// /console

		var c3: BarChart = new BarChart(".playerRaw", {
			width: 700,
			height: 280,
			key: "name",
			value: "score",
			data: playerRaw
		});


	}

	onSettingsItem = (e:MouseEvent) => {
		e.preventDefault();

		var action = $(e.currentTarget).data("action");

		action = action.split(":");

		this.buttonActions[action[0]](action[1]);
	}

	setState = (state:string) => {

		for (var s in this.states) {
			if (this.states.hasOwnProperty(s)) {
				if (s !== state && this.states[s]) {
					this.states[s].element.style.display = "none";
				}
			}
		}

		this.states[state].render();
		this.states[state].element.style.display = "block";
	}

	private getQueryParamByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	
}