class NewDayState extends AppState {

	playersLocked: boolean;

	constructor(controller: ScoreController, app: App) {
		super(controller, app);
	}

	render() {

		$(".app-header").addClass("hidden");

		this.playersLocked = false;

		this.element.classList.add("newday-state");

		this.controller.saveState();

		this.controller.createNewDay();

		var source = this.app.templates["newday-template"];
		var template:HandlebarsTemplateDelegate = Handlebars.compile(source);

		var date = new Date();
		var today = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();

		var context = { 
			title: "New day",
			date: today,
			isEdit: false,
			players: []
		};

		context.players = this.controller.getPlayerScores();

		var html = template(context);

		this.element.innerHTML = html;

		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: true // Creates a dropdown of 15 years to control year
		});

		$('.collapsible').collapsible({
			accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});
		
		//$('.editmode').on("change input", "input", this.onInputChange);
		$('input.isPlaying, input.isLate').on("change", this.onInputChange);
		$('button.point-input').on("click", this.onAddPoint);
		$('button.point-subtract').on("click", this.onSubtractPoint);

		/*$('.editmode').on("focus", "input", (e) => {
			var currentTarget = $(e.currentTarget);
			var inputtype = currentTarget.attr("type");

			if (inputtype === "number") {
				currentTarget.select();
			}
		});*/

		$(".add-player").bind("click", (e) => {

			NewPlayerModal.show((player: NewPlayer) => {

				if (player) {
					var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["partial_newday-item"]);
					var html = template(player.scores);

					$(".mainlist tbody").append(html);
				}

			});

		});

		$(".lock-players").bind("click", (e) => {

			var btn = $(e.currentTarget);

			if (this.playersLocked) {
				$(".player-row:not(.isPlaying)").removeClass("hide-row");

				btn.find('.material-icons').text('lock_open');
				btn.find('span').text('Only show playing');
			} else {
				
				$(".player-row:not(.isPlaying)").addClass("hide-row");

				btn.find('.material-icons').text('lock');
				btn.find('span').text('Show all players');
			}

			this.playersLocked = !this.playersLocked;

		});

		$.getJSON(Config.CURL_PATH + "?url=http://www.bom.gov.au/fwo/IDV60901/IDV60901.95936.json").then((data) => {
			
			var json = data;

			if (json) {

				this.controller.setDayConditions(
					json["observations"]["data"][0]["air_temp"],
					json["observations"]["data"][0]["wind_spd_kmh"],
					json["observations"]["data"][0]["wind_dir"],
					json["observations"]["data"][0]["cloud"],
					json["observations"]["data"][0]["rain_trace"],
					json["observations"]["data"][0]["rel_hum"],
					json["observations"]["data"][0]["press"],
					json["observations"]["data"][0]["apparent_t"]
				);

			}

		});

		$(".cancel-newday").bind("click", (e) => {

			if (confirm(Config.MSG_CANCELGAME)) {

				$(".app-header").removeClass("hidden");

				this.controller.restoreState();

				this.send(this.controller.getJSONString(), "update/all").done((data) => {
					console.log("Success cancel update");
					//console.log(data);
				})
				.fail((data) => {
					console.log("Error cancel update", data);
				})
				.always((data) => {
					console.log("Finished cancel update");
				
					this.app.setState(StateType.VIEW);
				});
			}
		});

		$(".save-newday").bind("click", (e) => {

			if (confirm(Config.MSG_FINISHGAME)) {
				this.controller.setDayComplete(0);

				this.saveChanges(true, () => {
					this.app.setState(StateType.VIEW);
				});
			}

		});

		$(".add-badge").bind("click", (e) => {
			//badges-selector

			e.preventDefault();

			if ($(e.currentTarget).hasClass("disabled")) return;

			var playerid:string = $(e.currentTarget).attr("data-for");

			var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["badges-selector"]);
			var context = {
				currentbadges: this.controller.getPlayerManualBadgesOnDay(playerid, 0),
				badges: Badger.getManualBadges()
			};

			var html = template(context);

			$("body").append(html);

			$(".badges-selector-wrapper").bind("click", (e) => {
				e.preventDefault();
				e.stopPropagation();

				$(".badges-selector-wrapper").unbind("click");

				$(".new-badge").unbind("click");
				$(".current-badge .badge-remove").unbind("click");

				$(".badges-selector-wrapper").remove();
			});

			$(".new-badge").bind("click", (e) => {

				var badge: Badge = Badger.getBadgeByID($(e.currentTarget).attr("data-id"));

				this.controller.addPlayerManualBadge(playerid, badge.id);
			});

			$(".current-badge .badge-remove").bind("click", (e) => {

				e.stopPropagation();

				$(e.currentTarget).parents(".badge").addClass("removed");

				var id: number = parseInt($(e.currentTarget).parents(".badge").attr("data-index"), 10);

				this.controller.deletePlayerManualBadge(playerid, id, 0);

				var remaining = $(".current-badge:not(.removed)");

				for (var i = 0; i < remaining.length; ++i) {

					var bindex = parseInt($(remaining[i]).attr("data-index"), 10);
					if (bindex > id) {
						$(remaining[i]).attr("data-index", bindex - 1); // subtract 1 to offset deleted badge
					}
				}
			});
		})


		$('select').material_select();

		this.saveChanges(true);

		this.startProgressTimer();
	}

	startProgressTimer = () => {

		this.updateProgressTimer();

		var interval = setInterval(() => {

			var done = this.updateProgressTimer();

			if (done) {
				clearInterval(interval);
			}

		}, 1000);
	}

	updateProgressTimer = (): boolean => {

		var time = $(".newday-timer");
		var endDate = new Date(this.controller.getGameDate(0));
		endDate.setMinutes(endDate.getMinutes() + 30);
		var t: TimeObject = DateUtil.getTimeRemaining(endDate.toString());

		time.html([
			('0' + t.minutes).slice(-2),
			('0' + t.seconds).slice(-2)
		].join(":"));

		return t.total <= 0;
	}

	onAddPoint = (e: any) => {

		e.preventDefault();
		e.stopPropagation();


		var currentTarget = $(e.currentTarget);
		//var inputtype = currentTarget.attr("type");
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");
		//console.log("oninputchange", player);

		var value = parseInt(currentTarget.text(), 10);

		value += 1;

		currentTarget.text(value);

		if (pointtype.indexOf("bonus") > -1) {
			this.controller.setPlayerBonus(player, pointtype, value);
		} else {
			this.controller.setPlayerPoint(player, pointtype, value);
		}
	}

	onSubtractPoint = (e: any) => {

		e.preventDefault();
		e.stopPropagation();


		var currentTarget = $(e.currentTarget);
		//var inputtype = currentTarget.attr("type");
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");
		//console.log("oninputchange", player);
		var targ = $("button.point-input[data-value='" + pointtype + "'][data-for='" + player + "']");

		var value = parseInt(targ.text(), 10);

		if (value <= 0) return;
		
		value -= 1;


		//currentTarget.text(value);
		targ.text(value);

		if (pointtype.indexOf("bonus") > -1) {
			this.controller.setPlayerBonus(player, pointtype, value);
		} else {
			this.controller.setPlayerPoint(player, pointtype, value);
		}
	}

	onInputChange = (e:any) => {


		//console.log("oninputchange");

		var currentTarget = $(e.currentTarget);
		var inputtype = currentTarget.attr("type");
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");

		switch (inputtype) {
			case "number":

				/*var value = parseInt(currentTarget.val(), 10);

				if (pointtype.indexOf("bonus") > -1) {
					this.controller.setPlayerBonus(player, pointtype, value);
				} else {
					this.controller.setPlayerPoint(player, pointtype, value);
				}*/
				
				break;
			case "checkbox":

				var checked = currentTarget.prop("checked");

				if (pointtype === "late") {
					this.controller.setPlayerLate(player, checked);
				}
				if (pointtype === "playing") {
					// enable/disable player controls

					var isPlaying = this.controller.getPlayerIsPlaying(player, 0);

					if (isPlaying !== checked) {

						this.controller.setPlayerIsPlaying(player, checked);

						currentTarget.parents(".player-row")[checked ? "addClass" : "removeClass"]("isPlaying");

					}

					$("[data-for='" + player + "']:not(.isPlaying)").prop("disabled", !checked);

					if (!checked) {
						$("button.point-input[data-for='" + player + "']:not(.isPlaying)").text("0");
						$("[type='checkbox'][data-for='" + player + "']:not(.isPlaying)").prop("checked", false);
						$(".player-row a[data-for='" + player + "']").addClass("disabled");

						this.controller.clearPlayerScores(player, 0);
					} else {
						$(".player-row a[data-for='" + player + "']").removeClass("disabled");
					}
					
				}
				break;
		}

		this.saveChanges(false);
	}

	saveChanges = (create:boolean = false, callback?:Function) => {

		var numPlayers = 0;

		$("[data-value='playing']").each((index, elem) => {
			var checked = $(elem).prop("checked");
			var player = $(elem).data("for");

			if (checked) {
				numPlayers++;
			}
		});

		var cond: string[] = [];
		$(".conditions-select :selected").each((i, e) => { cond.push($(e).val()) })

		this.controller.setDayNumPlayers(numPlayers);
		this.controller.setDayManualConditions(cond);

		this.controller.updatePlayerRankings();

		var data;
		var command = "";

		if (create) {
			data = this.controller.getJSONString();
			command = "update/all";
		} else {
			data = this.controller.getDayJSONString(0);
			command = "update/day/0";
		}

		this.send(data, command).done((data) => {
			// Success live update
			//console.log("Succes saving live update: ", data);
			
		})
		.fail((data) => {
			// Error live update
			//console.log("Error saving live update: ", data);
		})
		.always((data) => {
			// Finished live update
			
			if (typeof callback == "function") {
				callback();
			}
		});
	}

	send = (data:any, command:string):JQueryXHR => {

		return $.post(Config.API_PATH, {
			auth: Config.SERVER_KEY,
			data: data,
			command: command
		});
	}
	
}