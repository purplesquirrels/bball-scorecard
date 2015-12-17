/// <reference path="AppState" />

class ViewState extends AppState {

	editButton: HTMLButtonElement;
	addButton: HTMLButtonElement;
	
	constructor(controller: ScoreController, app: App) {
		super(controller, app);
	}

	render() {

		var today = new Date();
		var dayToDisplay = 0;//this.controller.getLastCompletedDay();

		//console.log('dayToDisplay', dayToDisplay);

		var source = this.app.templates["view-template"];
		var template:HandlebarsTemplateDelegate = Handlebars.compile(source);
		var update = new Date(this.controller.getGameDate(dayToDisplay));
		var games = this.controller.getTotalGamesPlayed();
		var days = this.controller.getDaysRemaining();
		var context = { 
			title: this.controller.getSeasonName(),
			dates: this.controller.getSeasonDateString(),
			daysleft: String(days) + " day" + (days > 1 || days === 0 ? "s" : "") + " remaining",
			lastupdate: update.getDate() + "-" + (update.getMonth() + 1) + "-" + update.getFullYear(),
			totalgames: " • " + String(games) + " game" + (games > 1 || games === 0 ? "s" : "") + " played",
			rankings: this.controller.getPlayerRankings(dayToDisplay),
			gamenumber: this.controller.getGameNumber(0),
			inProgress: !this.controller.getGameIsComplete(0),
			showDetails: true
		};

		for (var i = context.rankings.length-1; i > 0; i--) {
			if (!this.controller.getPlayerTotalGames(context.rankings[i].id)) {
				context.rankings.splice(i, 1);
			}
		}

		// Change lastupdate to human string (eg Yesterday, 2 days ago)
		var daysBetween = DateUtil.countDaysBetween(update, today, [0, 1, 2, 3, 4, 5, 6]);

		if (daysBetween <= 3) {
			if (daysBetween === 0) context.lastupdate = "today";
			if (daysBetween === 1) context.lastupdate = "yesterday";
			if (daysBetween >= 2) context.lastupdate = daysBetween + " days ago";
		}

		today = new Date();
		var end = new Date(this.controller.getEndDate());

		if ((today.getDate() === end.getDate()) &&
			(today.getMonth() === end.getMonth()) &&
			(today.getFullYear() === end.getFullYear())) {

			context.daysleft = "<img src='images/trophy.png'><br/>GRAND FINAL DAY!";
			context.totalgames = "";
		}

		if (this.controller.getTotalGamesPlayed() === 0) {
			context.lastupdate = "Never";
			context.showDetails = false;
		}

		var ranks = ["row-gold", "row-silver", "row-bronze", "row-iron"];

		for (var i = 0; i < context.rankings.length; ++i) {

			var playerid = context.rankings[i].id;
			var rank = ranks[3];

			if (i > 0) {
				if (context.rankings[i].rank <= 3) {
					rank = ranks[0];
				} else if (context.rankings[i].rank >= 4 && context.rankings[i].rank <= 6) {
					rank = ranks[1];
				} else if (context.rankings[i].rank >= 7 && context.rankings[i].rank <= 9) {
					rank = ranks[2];
				} else {
					rank = ranks[3];
				}
			} else {
				rank = ranks[0];
			}

			context.rankings[i].firstname = this.controller.getPlayerName(playerid);
			context.rankings[i].rankclass = rank;
			context.rankings[i].totalgames = this.controller.getPlayerTotalGames(playerid);
			context.rankings[i].averagescore = this.controller.getPlayerAverageScore(playerid);
			context.rankings[i].rankchange = this.controller.getPlayerRankChange(playerid);
			context.rankings[i].rankdirection = "";

			if (context.rankings[i].rankchange > 0) {
				context.rankings[i].rankdirection = "up";
				context.rankings[i].rankchange = "+" + context.rankings[i].rankchange;
			} else if (context.rankings[i].rankchange < 0) {
				context.rankings[i].rankdirection = "down";
			}

			context.rankings[i].totalboundys = NumberCruncher.getPlayerTotalPointsOfType(playerid, "point04");
			context.rankings[i].totallaps = NumberCruncher.getPlayerTotalLaps(playerid);
			context.rankings[i].rawscore = NumberCruncher.getPlayerRawScore(playerid, false);
			context.rankings[i].highestscore = NumberCruncher.getPlayerHighestScore(playerid);
			context.rankings[i].incompletekeys = NumberCruncher.getPlayerIncompleteKeys(playerid);
			context.rankings[i].percentplayed = NumberCruncher.getPlayerPercentPlayed(playerid);
			context.rankings[i].daysatfirst = NumberCruncher.getPlayerDaysAtFirstPlace(playerid);
			context.rankings[i].latestarts = NumberCruncher.getPlayLateStarts(playerid);
		}

		var html = template(context);

		this.element.innerHTML = html;

		$('.game-details').bind("click", (e:JQueryMouseEventObject) => {

			//var gamedate = new Date(this.controller.getGameDate(0));

			var modalTemplate: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["modal-game-details"]);
			var context = this.getGameDetails(0);

			//for (var i = 0; i < context.numGames; ++i) {
			//	context.games.push({ day: context.numGames - i, isToday: i === 0});
			//}

			var modalhtml = modalTemplate(context);

			document.body.appendChild($(modalhtml).wrap("<div/>").parent()[0]);

			var app = this.app;

			$('.tooltipped').tooltip({ delay: 50 });

			//$('day-select').material_select();

			$('#gamedetails-modal').openModal({
				dismissible: true,
				ready: () => {

					$('.day-select').on('change', (e) => {
						var optionSelected = $("option:selected", e.currentTarget);
						var valueSelected = (<HTMLSelectElement>e.currentTarget).value;

						//console.log(valueSelected);

						var template: HandlebarsTemplateDelegate = Handlebars.compile(app.templates["partial_game-details-table"]);
						var html = template(this.getGameDetails(parseInt(valueSelected, 10)));

						$(".game-details-table").html(html);

						$('.tooltipped').tooltip({ delay: 50 });

						//$('.tooltipped').tooltip({ delay: 50 });
					});

				}, // Callback for Modal open
				complete: function() { } // Callback for Modal close
			});

		});

		if (context.inProgress) {
			var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["game-in-progress-message"]);
			var html = template({
				messageStyle: "positive"
			});

			$("body").prepend(html);

			this.startProgressTimer();
		}


		$('.collapsible').collapsible({
			accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});

		$('#leaderboard').mixItUp({
			layout: {
				display: 'list-item'
			}
		});

		$(".sort-default").addClass("active");

	}

	startProgressTimer = () => {

		this.updateProgressTimer();

		var interval = setInterval(() => {

			var done = this.updateProgressTimer();

			if (done) {
				clearInterval(interval);
			}

		}, 10000);
	}

	updateProgressTimer = ():boolean => {

		var time = $(".game-in-progress .time-left");
		var endDate = new Date(this.controller.getGameDate(0));
		endDate.setMinutes(endDate.getMinutes() + 30);
		var t: TimeObject = DateUtil.getTimeRemaining(endDate.toString());

		// Need accurate server time for this
		/*time.html([
			('0' + t.hours).slice(-2),
			('0' + t.minutes).slice(-2),
			('0' + t.seconds).slice(-2)
		].join(":"));*/

		var text = "about " + (t.minutes) + " minute" + (t.minutes < 2 ? "" : "s");

		if (t.minutes <= 0 && t.total > 0) {
			text = "less than a minute";
		}

		if (t.total < 0) {
			text = "less than a minute";
		}

		if (t.minutes < 15) {
			$(".game-in-progress").removeClass("positive").addClass("negative");
			$(".game-in-progress .late-bonus").addClass("visible");
		}

		time.html(text);

		return t.total <= 0;
	}

	getGameDetails = (day:number = 0) => {

		var gamedate = new Date(this.controller.getGameDate(day));
		var context = {
			gamenumber: this.controller.getGameNumber(day),
			gamedate: [gamedate.getDate(), gamedate.getMonth() + 1, gamedate.getFullYear()].join("&#8209;"),
			conditions: this.controller.getDayConditions(day),
			numPlayers: this.controller.getGameNumPlayers(day),
			players: this.controller.getGamePlayers(day),
			games: [],
			numGames: this.controller.getTotalGamesPlayed()
		};

		for (var i = 0; i < context.numGames; ++i) {
			context.games.push({ value: i, day: context.numGames - i, isToday: i === 0 });
		}

		return context;
	}

	onEditScores = (e: MouseEvent) => {
		this.app.setState(StateType.EDIT);
	}

	onNewDay = (e: MouseEvent) => {
		this.app.setState(StateType.NEW_DAY);
	}
}