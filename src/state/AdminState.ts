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


		$(".new-season").bind("click", (e) => {

			//$(".app-header").removeClass("hidden");

			//this.app.setState(StateType.VIEW);

			//if (confirm("Are you sure you want to start a new season?\n\nStarting a new season will archive the current season.")) {
				var s = this.controller.getNewSeason();

				//new-season-template

				var modalTemplate: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["modal-new-season"]);
				var context = s;

				var modalhtml = modalTemplate(context);

				document.body.appendChild($(modalhtml).wrap("<div/>").parent()[0]);

				var app = this.app;


				$('#newseason-modal').openModal({
					dismissible: true,
					ready: () => {

						


					},
					complete: function() {

					}
				});

			//}
		});

	}

}