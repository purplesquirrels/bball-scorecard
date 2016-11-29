interface NewPlayer {
	scores: Object;
	id: string;
	firstname: string;
	lastname: string;
	email: string;
}

class NewPlayerModal {

	private static initted: boolean;
	private static showing: boolean;
	private static template: string;
	private static controller: ScoreController;

	static init(template:string, controller:ScoreController) {

		this.template = template;
		this.controller = controller;

		this.initted = true;
	}

	static show(onClose?:Function) {
		if (this.initted && !this.showing) {

			this.showing = true;

			var modalTemplate: HandlebarsTemplateDelegate = Handlebars.compile(this.template);
			var modalhtml = modalTemplate({});

			document.body.appendChild($(modalhtml).wrap("<div/>").parent()[0]);

			var newPlayer: NewPlayer = null;

			$('#newplayer-modal').openModal({
				dismissible: false, // Modal can be dismissed by clicking outside of the modal
				ready: () => {

					$(".confirm-new-player").bind("click", (e) => {
						e.preventDefault();

						newPlayer = <NewPlayer>this.controller.addPlayer($("#p_firstname").val(), $("#p_lastname").val(), $("#p_email").val());

						newPlayer.scores["id"] = newPlayer.id;
						newPlayer.scores["firstname"] = newPlayer.firstname;
						newPlayer.scores["lastname"] = newPlayer.lastname;
						newPlayer.scores["email"] = newPlayer.email;

						console.log(newPlayer)

						/*var template: HandlebarsTemplateDelegate = Handlebars.compile(this.app.templates["partial_newday-item"]);

						var html = template(newPlayer.scores);

						$(".mainlist tbody").append(html);*/

						if (typeof onClose == "function") {
							onClose(newPlayer);
						}
					});

					$(".cancel-button").bind("click", (e) => {
						e.preventDefault();
						$('#newplayer-modal').closeModal();
					});

				},
				complete: () => { 
					this.showing = false;

					if (typeof onClose == "function") {
						onClose(newPlayer);
					}
				}
			});
		}
	}
}