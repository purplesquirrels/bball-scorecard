class EditDayState extends AppState {

	static MODE_NEW: string = "new";
	static MODE_EDIT: string = "edit";

	playersLocked: boolean;
	firstPointSet: boolean;

	playersReceivedPowerup: Object;

	constructor(controller: ScoreController, app: App, options:any) {
		super(controller, app, options);
	}

	render(renderoptions?:any) {

		$(".app-header").addClass("hidden");

		this.playersReceivedPowerup = {};

		this.firstPointSet = true;
		this.playersLocked = false;

		this.element.classList.add("edit-state");

		this.controller.saveState();

		if (this.options["mode"] === EditDayState.MODE_NEW) {
			this.firstPointSet = false;
			this.controller.createNewDay();
		}

		var source = this.app.templates["newday-template"];
		var template:HandlebarsTemplateDelegate = Handlebars.compile(source);

		var editday = 0;
		var date = new Date(this.controller.getGameDate(editday));

		var month = date.getMonth() + 1;
		var day = date.getDate();
		var gameday = date.getFullYear() + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day);

		var titles = {};
		titles[EditDayState.MODE_EDIT] = "Edit day";
		titles[EditDayState.MODE_NEW] = "New day";

		var context = { 
			title: titles[this.options["mode"]],
			date: gameday,
			isEdit: this.options["mode"] === EditDayState.MODE_EDIT,
			players: []
		};

		context.players = this.controller.getPlayerScores(editday);

		var html = template(context);

		this.element.innerHTML = html;

		$('.datepicker').pickadate({
			formatSubmit: 'yyyy/mm/dd',
			selectMonths: true, // Creates a dropdown to control month
			selectYears: true // Creates a dropdown of 15 years to control year
		});

		$('.collapsible').collapsible({
			accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});
		
		$('input.isPlaying, input.isLate').on("change", this.onInputChange);
		$('button.point-input').on("click", this.onAddPoint);
		$('button.point-subtract').on("click", this.onSubtractPoint);

		$('.collapsible').on("click", '.accordion-header-blocker', this.stopAndPreventDefault);

		$(".add-player").bind("click", (e) => {

			NewPlayerModal.show((player: NewPlayer) => {

				if (player) {
					var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["partial_newday-item"]);
					//player.scores["played"] = 1;
					var html = template(player.scores);

					$(".playerlist").append(html);


					// remove old listeners
					$('input.isPlaying, input.isLate').off("change", this.onInputChange);
					$('button.point-input').off("click", this.onAddPoint);
					$('button.point-subtract').off("click", this.onSubtractPoint);

					$(".new-powerup").unbind("click", this.newPowerup);
					$(".use-powerup").unbind("click", this.usePowerup);
					$(".add-badge").unbind("click", this.addBadge);

					// add new listeners
					$('input.isPlaying, input.isLate').on("change", this.onInputChange);
					$('button.point-input').on("click", this.onAddPoint);
					$('button.point-subtract').on("click", this.onSubtractPoint);

					$(".new-powerup").bind("click", this.newPowerup);
					$(".use-powerup").bind("click", this.usePowerup);
					$(".add-badge").bind("click", this.addBadge);



					$('.collapsible').on("click", '.accordion-header-blocker', this.stopAndPreventDefault);

					$('.collapsible').on("click", '.accordion-header-blocker', this.stopAndPreventDefault);

					var data = this.controller.getJSONString();
					var command = "update/all";

					this.send(data, command).done((data) => {})
					.fail((data) => {})
					.always((data) => {});


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

		if (this.options["mode"] === EditDayState.MODE_NEW) {

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
		}


		$(".cancel-newday").bind("click", (e) => {

			var msg = Config.MSG_CANCELGAME;

			if (this.options["mode"] === EditDayState.MODE_EDIT) {
				msg = Config.MSG_CANCELUPDATE;
			}

			if (confirm(msg)) {

				$(".app-header").removeClass("hidden");

				this.controller.restoreState();

				this.send(this.controller.getJSONString(), "update/all").done((data) => {
					console.log("Success cancel update");
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

			var msg = Config.MSG_FINISHGAME;

			if (this.options["mode"] === EditDayState.MODE_EDIT) {
				msg = "Save the changes?";
			}

			/*if (this.options["mode"] === EditDayState.MODE_EDIT) {

				$(".app-header").removeClass("hidden");

				this.controller.setDayComplete(0); // ensures day is complete if app unexpectedly quit during new day

				this.saveChanges(true, () => {
					this.app.setState(StateType.VIEW);
				});

			} else if (this.options["mode"] === EditDayState.MODE_NEW) {*/

				

				if (confirm(msg)) {

					$(".app-header").removeClass("hidden");

					this.controller.setDayComplete(0);

					this.saveChanges(true, () => {
						this.app.setState(StateType.VIEW);
					});


					for (var player in this.playersReceivedPowerup) {

						var p_details = this.controller.getPlayerDetails(player);
						var multiple = this.playersReceivedPowerup[player].length > 1;

						var host = window.location.origin + window.location.pathname;
						host = host.split("index.html").join("");

						console.log("send email to", p_details["firstname"]);

						// uncomment when proper email in use
						/*if (!p_details["email"]) {
							continue;
						}*/

						var p_message =
							"<p>Hi {{firstname}},</p><p>You received the following powerup" + (multiple ? "s" : "") + " today: </p>" +
								"<table>{{powerups}}</table>" + 
							"<p>Remember: " + (multiple ? "These" : "This") + " powerup" + (multiple ? "s" : "") + " will expire in 5 played games. Use " + (multiple ? "them" : "it") + " wisely!</p>";

						var powerups = [];

						for (var i = 0; i < this.playersReceivedPowerup[player].length;i++) {
							var powerup_details = this.controller.getPowerupDetails(this.playersReceivedPowerup[player][i]);
							var img = powerup_details.image.split(".svg").join(".png");

							powerups.push('<tr>' +
								'<td width="101px"><img src="' + host + "images/powerup/" + img + '"></td>' +
								'<td><strong>' + (powerup_details.name) + ':</strong> ' + (powerup_details.description) + '</td>' +
								'</tr>');
							//powerups.push("<li><img style='vertical-align:middle' src='" + host + "images/powerup/" + img + "'><strong>" + (powerup_details.name) + " </strong>: " + (powerup_details.description) + "</li>");
						}

						p_message = p_message.split("{{firstname}}").join(p_details["firstname"]);
						p_message = p_message.split("{{powerups}}").join(powerups.join(""));

						$.post(Config.MAIL_PATH, {
							auth: Config.SERVER_KEY,
							//to: p_details["email"],
							to: "ben.foster@learningseat.com", // for testing - to be replaced with above line
							subject: "Bankulator: you received a powerup",
							message: p_message
						}).then(function(e){
							console.log("then", e);
						}).fail(function(e){
							console.log("fail", e);
						});
						
					}

					this.playersReceivedPowerup = {};
				}
			//}

		});


		$(".new-powerup").bind("click", this.newPowerup);
		$(".use-powerup").bind("click", this.usePowerup);
		$(".add-badge").bind("click", this.addBadge);


		$('select').material_select();

		this.saveChanges(true);

		this.startProgressTimer();
	}

	stopAndPreventDefault = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	addBadge = (e) => {
		//badges-selector

		e.stopPropagation();
		e.preventDefault();

		if ($(e.currentTarget).hasClass("disabled")) return;

		var playerid: string = $(e.currentTarget).attr("data-for");

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

			if (badge.id === "powerup" && confirm("Generate powerup for player?")) {

				var powerup: PowerUp = this.controller.generatePowerup();
				this.controller.addPlayerPowerup(playerid, powerup);

				alert("Player received: " + powerup.name + ".");

				if (!this.playersReceivedPowerup[playerid]) {
					this.playersReceivedPowerup[playerid] = [];
				}

				this.playersReceivedPowerup[playerid].push(powerup.id);

			}
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
	}

	newPowerup = (e) => {

		e.preventDefault();
		e.stopPropagation();

		if ($(e.currentTarget).hasClass("disabled")) return;

		if (!confirm("Generate powerup for player?")) return;

		var playerid: string = $(e.currentTarget).attr("data-for");

		var newpowerup: PowerUp = this.controller.generatePowerup();

		this.controller.addPlayerPowerup(playerid, newpowerup, 0);

		if (confirm("Player received: " + newpowerup.name + ".\n\nAdd Powerup badge?")) {
			this.controller.addPlayerManualBadge(playerid, "powerup");

			if (!this.playersReceivedPowerup[playerid]) {
				this.playersReceivedPowerup[playerid] = [];
			}

			this.playersReceivedPowerup[playerid].push(newpowerup.id);
		}

	}

	usePowerup = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if ($(e.currentTarget).hasClass("disabled")) return;

		var playerid: string = $(e.currentTarget).attr("data-for");
		var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["powerup-selector"]);
		var context = {
			//currentbadges: this.controller.getPlayerManualBadgesOnDay(playerid, 0),
			powerups: this.controller.getPlayerPowerups(playerid, true)
		};

		var html = template(context);

		$("body").append(html);

		$(".powerup-selector-wrapper").bind("click", (e) => {
			e.preventDefault();
			e.stopPropagation();

			$(".powerup-selector-wrapper").unbind("click");
			$(".pick-powerup").unbind("click");
			$(".powerup-selector-wrapper").remove();
		});

		$(".pick-powerup").bind("click", (e) => {

			var powerup: string = $(e.currentTarget).attr("data-id");

			if (confirm("Use " + powerup + " power?")) {
				var success = this.controller.usePlayerPowerup(playerid, powerup);

				if (success) {
					alert('Succesfully used ' + powerup);
				} else {
					alert('Unable to use ' + powerup);
				}
			}

		});
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
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");

		var value = parseInt(currentTarget.text(), 10);

		value += 1;

		currentTarget.text(value);

		if (pointtype.indexOf("bonus") > -1) {
			this.controller.setPlayerBonus(player, pointtype, value);
		} else {
			this.controller.setPlayerPoint(player, pointtype, value);
		}

		if (!this.firstPointSet) {

			if (confirm("This is the first point, award player with Pointman badge?")) {

				this.firstPointSet = true;
				this.controller.addPlayerManualBadge(player, "pointman");

			}
		}
	}

	onSubtractPoint = (e: any) => {

		e.preventDefault();
		e.stopPropagation();

		var currentTarget = $(e.currentTarget);
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");
		var targ = $("button.point-input[data-value='" + pointtype + "'][data-for='" + player + "']");

		var value = parseInt(targ.text(), 10);

		if (value <= 0) return;
		
		value -= 1;

		targ.text(value);

		if (pointtype.indexOf("bonus") > -1) {
			this.controller.setPlayerBonus(player, pointtype, value);
		} else {
			this.controller.setPlayerPoint(player, pointtype, value);
		}
	}

	onInputChange = (e:any) => {

		var currentTarget = $(e.currentTarget);
		var inputtype = currentTarget.attr("type");
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");

		switch (inputtype) {
			case "number":
				
				break;
			case "checkbox":

				var checked = currentTarget.prop("checked");

				if (pointtype === "late") {
					this.controller.setPlayerLate(player, checked);
				}
				if (pointtype === "playing") {

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