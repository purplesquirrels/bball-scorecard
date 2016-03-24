/// <reference path="AppState.ts" />

class AdminState extends AppState {

	
	constructor(controller: ScoreController, app: App) {
		super(controller, app);

		
	}

	render() {

		$(".app-header").addClass("hidden");

		this.element.classList.add("admin-state");

		var source = this.app.templates["admin-template"];
		var template: HandlebarsTemplateDelegate = Handlebars.compile(source);
		
		var context = {
		};



		var html = template(context);

		this.element.innerHTML = html;


		$(".cancel-admin").bind("click", (e) => {

			$(".app-header").removeClass("hidden");

			this.app.setState(StateType.VIEW);
		});


		$(".addplayer-button").bind("click", (e) => {

			var newPlayer = <NewPlayer>this.controller.addPlayer($("#first_name").val());

			var data = this.controller.getJSONString();
			var command = "update/all";

			this.send(data, command).done((data) => { })
				.fail((data) => { })
				.always((data) => { alert("Player [" + (newPlayer.firstname) + "] added!") });


			$("#first_name").val("");

		});
		$(".new-season").bind("click", (e) => {

			var s = this.controller.getNewSeason();
			var modalTemplate: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["modal-new-season"]);
			var context = s;

			var modalhtml = modalTemplate(context);

			document.body.appendChild($(modalhtml).wrap("<div/>").parent()[0]);

			var app = this.app;


			$('#newseason-modal').openModal({
				dismissible: false,
				ready: () => {

					$(".confirm-new-season").on("click", (e) => {

						if (confirm("Are you sure you want to create a new season?\n\nThe current season will be archived.")) {

							var data = JSON.stringify(s);
							var command = "create/season";

							this.send(data, command).done((data) => { alert("New season created!"); })
								.fail((data) => { alert("Error creating new season."); })
							.always((data) => { 
								$('#newseason-modal').closeModal();
							});
						}

					});


				},
				complete: function() {

				}
			});

		});

	}

	send = (data: any, command: string): JQueryXHR => {

		return $.post(Config.API_PATH, {
			auth: Config.SERVER_KEY,
			data: data,
			command: command
		});
	}

}