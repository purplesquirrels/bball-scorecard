class NewDayState extends AppState {

	constructor(controller: ScoreController, app: App) {
		super(controller, app);
	}

	render() {

		$(".app-header").addClass("hidden");

		this.controller.saveState();

		this.controller.createNewDay();

		var source = this.app.templates["newday-template"];
		var template:HandlebarsTemplateDelegate = Handlebars.compile(source);

		var date = new Date();
		var today = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();

		var context = { title: "New day", date: today, players: [] };

		context.players = this.controller.getPlayerScores();

		var html = template(context);

		this.element.innerHTML = html;

		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: true // Creates a dropdown of 15 years to control year
		});
		
		$('.editmode').on("change input", "input", this.onInputChange);

		$('.editmode').on("focus", "input", (e) => {
			var currentTarget = $(e.currentTarget);
			var inputtype = currentTarget.attr("type");

			if (inputtype === "number") {
				currentTarget.select();
			}
		});

		$(".add-player").bind("click", (e) => {

			NewPlayerModal.show((player: NewPlayer) => {

				if (player) {
					var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["partial_newday-item"]);
					var html = template(player.scores);

					$(".mainlist tbody").append(html);
				}

			});

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
					json["observations"]["data"][0]["press"]
				);

			}

		});

		$(".cancel-newday").bind("click", (e) => {

			if (confirm(Config.MSG_CANCELGAME)) {

				$(".app-header").removeClass("hidden");

				this.controller.restoreState();

				this.send().done((data) => {
					//console.log("Success cancel update");
					//console.log(data);
				})
				.fail((data) => {
					//console.log("Error cancel update", data);
				})
				.always((data) => {
					//console.log("Finished cancel update");
				
					this.app.setState(StateType.VIEW);
				});
			}
		});

		$(".save-newday").bind("click", (e) => {

			if (confirm(Config.MSG_FINISHGAME)) {
				this.controller.setDayComplete(0);

				this.saveChanges(() => {
					this.app.setState(StateType.VIEW);
				});
			}

		});


		$('select').material_select();

		this.saveChanges();
	}

	onInputChange = (e:any) => {

		var currentTarget = $(e.currentTarget);
		var inputtype = currentTarget.attr("type");
		var player: string = currentTarget.data("for");
		var pointtype: string = currentTarget.data("value");

		switch (inputtype) {
			case "number":

				var value = parseInt(currentTarget.val(), 10);

				if (pointtype.indexOf("bonus") > -1) {
					this.controller.setPlayerBonus(player, pointtype, value);
				} else {
					this.controller.setPlayerPoint(player, pointtype, value);
				}
				
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

					}

					$("[data-for='" + player + "']:not(.isPlaying)").prop("disabled", !checked);
					
					if (!checked) {
						$("[type='number'][data-for='" + player + "']:not(.isPlaying)").val("0");
						$("[type='checkbox'][data-for='" + player + "']:not(.isPlaying)").prop("checked", false);

						this.controller.clearPlayerScores(player, 0);
					}
					
				}
				break;
		}

		this.saveChanges();
	}

	saveChanges = (callback?:Function) => {

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

		this.send().done((data) => {
			// Success live update
		})
		.fail((data) => {
			// Error live update
			console.log("Error saving live update: ", data);
		})
		.always((data) => {
			// Finished live update
			
			if (typeof callback == "function") {
				callback();
			}
		});
	}

	send = ():JQueryXHR => {

		return $.post(Config.PUT_PATH, {
			auth: "1qaz@WSX",
			data: this.controller.getJSONString()
		});
	}
	
}