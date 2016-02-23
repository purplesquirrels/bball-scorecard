class EditState extends AppState {

	playersLocked: boolean;

	constructor(controller: ScoreController, app: App) {
		super(controller, app);
	}

	render() {

		$(".app-header").addClass("hidden");

		this.playersLocked = false;

		this.element.classList.add("edit-state");

		var source = this.app.templates["newday-template"];
		var template:HandlebarsTemplateDelegate = Handlebars.compile(source);

		var editday = 0;
		var date = new Date(this.controller.getGameDate(editday));
		var gameday = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();

		var context = {
			title: "Edit day",
			date: gameday,
			isEdit: true,
			players: []
		};

		context.players = this.controller.getPlayerScores(editday);

		var html = template(context);

		this.element.innerHTML = html;

		//$(".newday-timer").remove();

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
			this.controller.setDayComplete(0); // ensures day is complete if app unexpectedly quit during new day

			this.controller.updatePlayerRankings();

			$.post(Config.PUT_PATH, { 
				auth: Config.SERVER_KEY,
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


		$(".add-badge").bind("click", (e) => {
			//badges-selector

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

					currentTarget.parents(".player-row")[checked ? "addClass" : "removeClass"]("isPlaying");

					$("[data-for='" + player + "']:not(.isPlaying)").prop("disabled", !checked);
					
					if (!checked) {
						$("[type='number'][data-for='" + player + "']:not(.isPlaying)").val("0");
						$("[type='checkbox'][data-for='" + player + "']:not(.isPlaying)").prop("checked", false);
						$(".player-row a[data-for='" + player + "']").addClass("disabled");

						this.controller.clearPlayerScores(player, 0);
					} else {
						$(".player-row a[data-for='" + player + "']").removeClass("disabled");
					}
				}
				break;
		}
	}
	
}