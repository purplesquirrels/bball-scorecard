/// <reference path="AppState.ts" />

class AdminState extends AppState {

	emailTimer: number;

	
	constructor(controller: ScoreController, app: App, options:any) {
		super(controller, app, options);
	}

	render(renderoptions?:any) {

		this.emailTimer = -1;

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


		/*$(".addplayer-button").bind("click", (e) => {

			var newPlayer = <NewPlayer>this.controller.addPlayer($("#first_name").val());

			var data = this.controller.getJSONString();
			var command = "update/all";

			this.send(data, command).done((data) => { })
				.fail((data) => { })
				.always((data) => { alert("Player [" + (newPlayer.firstname) + "] added!") });


			$("#first_name").val("");

		});
*/
		$(".send-test-email").bind("click", (e) => {

			if (this.emailTimer !== -1) return;

			var email:string = $("#email").val();

			var regex:RegExp = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gi;
			var result:string[] = regex.exec(email);

			if (!result || !result[0]) return;

			this.emailTimer = setTimeout(() => { this.emailTimer = -1}, 5000);

			console.log("Sending test email");

			var p_message = "<p>Hi test,</p><p>This is a test email sent from the Bankulator admin.</p>";

			$.post(Config.MAIL_PATH, {
				auth: Config.SERVER_KEY,
				to: result[0],
				subject: "Bankulator: test email",
				message: p_message
			}).then((e) => {

				console.log("then", e);

				$("#email").val("");

			}).fail((e) => {

				alert("There was an error sending email.");

				console.log("fail", e);

			}).always(() => {

				if (this.emailTimer !== -1) {
					clearTimeout(this.emailTimer);
					this.emailTimer = -1;
				}

			});
		})

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

							s.season_name = $("#season-name").val();
							s.banner = $("#season-banner").val();
							//s.end_date = $("#season-end").val();

							var data = JSON.stringify(s);
							var command = "create/season";

							this.send(data, command).done((data) => {
								console.log(data);
								alert("New season created!");
							})
							.fail((data) => {
								console.log(data);
								alert("Error creating new season.");
							})
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

		$(".addplayer-button").bind("click", (e) => {

			var s = {};
			var modalTemplate: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["modal-new-player"]);
			var context = s;

			var modalhtml = modalTemplate(context);

			document.body.appendChild($(modalhtml).wrap("<div/>").parent()[0]);

			var app = this.app;

			$('#newplayer-modal').openModal({
				dismissible: false,
				ready: () => {

					$(".confirm-new-player").on("click", (e) => {

						if (confirm("Are you sure you want to add a new player?")) {

							var newPlayer = <NewPlayer>this.controller.addPlayer($("#p_firstname").val(), $("#p_lastname").val(), $("#p_email").val());

							var data = this.controller.getJSONString();
							var command = "update/all";

							this.send(data, command)
							.done((data) => { })
							.fail((data) => { })
							.always((data) => { 
								//alert(`Player [${newPlayer.firstname} ${newPlayer.lastname}] added!`)
								$('#newplayer-modal').closeModal();
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