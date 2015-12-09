class EditState extends AppState {

	constructor(controller: ScoreController, app: App) {
		super(controller, app);
	}

	render() {

		$(".app-header").addClass("hidden");


		var source = this.app.templates["newday-template"];
		var template:HandlebarsTemplateDelegate = Handlebars.compile(source);

		var editday = 0;
		var date = new Date(this.controller.getGameDate(editday));
		var gameday = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();

		var context = {
			title: "Edit day",
			date: gameday,
			players: []
		};

		context.players = this.controller.getPlayerScores(editday);

		var html = template(context);

		this.element.innerHTML = html;

		$('.datepicker').pickadate({
			selectMonths: false, // Creates a dropdown to control month
			selectYears: false // Creates a dropdown of 15 years to control year
		});//.prop("disabled", true);
		$('.datepicker').prop("disabled", true);
		
		$('.editmode').on("change input", "input", this.onInputChange);
		
		$('.editmode').on("focus", "input", (e) => {
			var currentTarget = $(e.currentTarget);
			var inputtype = currentTarget.attr("type");

			if (inputtype === "number") {
				currentTarget.select();
			}
		});

		$(".add-player").prop("disabled", true);
		/*$(".add-player").bind("click", (e) => {

			NewPlayerModal.show((player: NewPlayer) => {

				if (player) {
					var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["partial_newday-item"]);
					var html = template(player.scores);

					$(".mainlist tbody").append(html);
				}

			});

		});*/

		$(".cancel-newday").bind("click", (e) => {

			$(".app-header").removeClass("hidden");

			//this.controller.deleteDay(0);
			this.app.setState(StateType.VIEW);
		});

		$(".save-newday").bind("click", (e) => {

			$(".app-header").removeClass("hidden");

			var numPlayers = 0;

			$(".app-header").removeClass("hidden");

			$("[data-value='playing']").each((index, elem) => {
				var checked = $(elem).prop("checked");
				var player = $(elem).data("for");

				if (checked) {
					numPlayers++;
				}

				if (this.controller.getPlayerIsPlaying(player, editday) != checked) {
					// Playing has changed

					this.controller.setPlayerIsPlaying(player, checked, editday);
				}

				
			});

			var cond: string[] = [];
			$(".conditions-select :selected").each((i, e) => { cond.push($(e).val()) })

			this.controller.setDayNumPlayers(numPlayers);
			this.controller.setDayManualConditions(cond);

			this.controller.updatePlayerRankings();

			$.post(Config.PUT_PATH, { 
				auth: "1qaz@WSX",
				data: this.controller.getJSONString()
			})
			.done((data) => {
				console.log("Success");
			})
			.fail((data) => {
				console.log("Error", data);
			})
			.always((data) => {
				console.log("Finished");
				this.app.setState(StateType.VIEW);
			});

		});


		$('select').material_select();
		$('.select-dropdown').prop("disabled", true);
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

					$("[data-for='" + player + "']:not(.isPlaying)").prop("disabled", !checked);
					
					if (!checked) {
						$("[type='number'][data-for='" + player + "']:not(.isPlaying)").val("0");
						$("[type='checkbox'][data-for='" + player + "']:not(.isPlaying)").prop("checked", false);

						this.controller.clearPlayerScores(player, 0);
					}
				}
				break;
		}
	}
	
}