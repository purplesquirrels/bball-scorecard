/// <reference path="typing/handlebars.d.ts" />
/// <reference path="typing/jquery.d.ts" />
/// <reference path="typing/gsap/TweenLite.d.ts" />
/// <reference path="typing/d3.d.ts" />
/// <reference path="state/ViewState.ts" />
/// <reference path="state/EditDayState.ts" />
/// <reference path="state/AdminState.ts" />
/// <reference path="state/view/StatsView.ts" />
/// <reference path="modal/NewPlayer.ts" />

interface JQuery {
	pickadate(options?: any): JQuery;
	dropdown(options?: any): JQuery;
	openModal(options?: any): JQuery;
	closeModal(options?: any): JQuery;
	collapsible(options?: any): JQuery;
	material_select(options?: any): JQuery;
	tooltip(options?: any): JQuery;
	mixItUp(options?: any): JQuery;
}

interface WindowLocalStorage {
	setItem(name: string, value: string);
	removeItem(name: string);
}
interface States {
	view: ViewState;
	newDay: EditDayState;
	edit: EditDayState;
	admin: AdminState;
}

class StateType {
	static VIEW: string = "view";
	static NEW_DAY: string = "newDay";
	static EDIT: string = "edit";
	static ADMIN: string = "admin";
}

interface Rectangle {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface IChart {
	update(data: {}[]):void;
}

class App {

	data: ScoreData;
	scoreController: ScoreController;
	root: HTMLDivElement;
	scoreboardRoot: HTMLDivElement;
	statsRoot: HTMLDivElement;
	isStorageAvailable: boolean;

	isArchiveMode: boolean;

	templates: Object;
	buttonActions: Object;

	editButton: HTMLButtonElement;

	states: States;

	constructor(rootSelector: string = ".app") {

		this.isStorageAvailable = this.storageAvailable("localStorage");

		this.buttonActions = {
			"state": (action: string) => {

				this.setState(action);
			}
		}

		this.isArchiveMode = false;

		var seasonYear: string = this.getQueryParamByName("year");
		var season: string = this.getQueryParamByName("season");

		var get = Config.GET_PATH;

		if (seasonYear && season) {
			this.isArchiveMode = true;

			get = "data/archive/" + seasonYear + "_" + season.toLowerCase() + "_archive.json";
		}

		$.getJSON(get).done((data) => {
			this.init(rootSelector, typeof data == "string" ? JSON.parse(data) : data);
		}).fail((data) => {
			
			if (this.isArchiveMode) {

				$.getJSON(Config.GET_PATH).done((data) => {
					this.init(rootSelector, typeof data == "string" ? JSON.parse(data) : data);
				}).fail((data) => {
					$("body").append(data.responseText);
				});

			} else {
				$("body").append(data.responseText);
			}

		});

	}

	init = (rootSelector: string = ".app", data: any) => {

		this.scoreController = new ScoreController(<ScoreData>data);

		NumberCruncher.init(<ScoreData>data);
		Badger.init(this.scoreController);
		
		this.root = <HTMLDivElement>document.querySelector(rootSelector);
		this.scoreboardRoot = <HTMLDivElement>this.root.querySelector(".scoreboard");
		this.statsRoot = <HTMLDivElement>this.root.querySelector(".stats");

		this.templates = {};

		$.get("templates/templates.html?_"+Math.round(Math.random()*100000)).then((data) => {

			$(data).each((index, element) => {

				if (element.nodeName.toLowerCase() === "script"){
					this.templates[element.id] = $(element).html();

					if (element.id.indexOf("partial_") > -1) {
						Handlebars.registerPartial($(element).data("name"), $(element).html());
					}
				}
			});

			this.showInitialView();
		})

	}

	showInitialView = () => {

		$(".initital-preloader").remove(); // removes the preloader

		Handlebars.registerHelper('isPlayingCheck', function(played) {
			return played ? 'checked' : '';
		});
		Handlebars.registerHelper('isLate', function(late) {
			return late ? 'checked' : '';
		});

		Handlebars.registerHelper('isPlayingEnable', function(played) {
			return !played ? 'disabled' : '';
		});

		var isEditable: string = this.getQueryParamByName("edit");

		if (this.isArchiveMode) {
			isEditable = "0";
		}

		var header = document.createElement("div");
		header.classList.add("app-header");

		this.states = {
			"edit": null,
			"view": null,
			"newDay": null,
			"admin": null
		}

		if (isEditable === "1") {

			NewPlayerModal.init(this.templates["modal-new-player"], this.scoreController);

			var headerSource = this.templates["app-header-template"];
			var headerTemplate: HandlebarsTemplateDelegate = Handlebars.compile(headerSource);
			var headerhtml = headerTemplate({
				daynotcreated: this.scoreController.getTotalGamesPlayed() <= 0 || (!DateUtil.dateIsToday(this.scoreController.getGameDate(0))) // last game date less than todays
			});

			header.innerHTML = headerhtml;
			this.scoreboardRoot.appendChild(header);

			$('.header-settings').dropdown({
				inDuration: 300,
				outDuration: 225,
				constrain_width: false, // Does not change width of dropdown to that of the activator
				hover: false, // Activate on hover
				gutter: 0, // Spacing from edge
				belowOrigin: true, // Displays dropdown below the button
				alignment: 'right' // Displays dropdown with edge aligned to the left of button
			});

			$("#settings-dropdown").on("click", "a", this.onSettingsItem);

			this.scoreboardRoot.appendChild(header);

			
			var authSource = this.templates["modal-app-auth"];
			var authTemplate: HandlebarsTemplateDelegate = Handlebars.compile(authSource);
			var authhtml = authTemplate({});

			document.body.appendChild($(authhtml).wrap("<div/>").parent()[0]);


			$('#authmodal').openModal({
				dismissible: false, // Modal can be dismissed by clicking outside of the modal
				ready: function() { 

					$(".pin-button").bind("click", function(e) {
						e.preventDefault();

						var n = $(this).text();
						var o = $(".pin-display").val();

						$(".pin-display").val(o + n);

						$.post(Config.AUTH_PATH, {
							pin: o + n
						}).then((result) => {

							if (result.authenticated) {
								$('#authmodal').closeModal();
							}

							if (result.key) {
								Config.SERVER_KEY = result.key;
							}
						});

					});

				},
				complete: function() {  }
			});
			
			this.states.edit = new EditDayState(this.scoreController, this, {mode:"edit"});
			this.states.newDay = new EditDayState(this.scoreController, this, { mode: "new" });
			this.states.admin = new AdminState(this.scoreController, this);			

		}

		this.states.view = new ViewState(this.scoreController, this, {});

		this.setState(StateType.VIEW);

		/*if (isEditable !== "1") {
			var chartsView: StatsView = new StatsView(this.statsRoot, this.scoreController, this);
		}*/


	}

	onSettingsItem = (e:MouseEvent) => {
		e.preventDefault();

		var action = $(e.currentTarget).data("action");

		action = action.split(":");

		var options = $(e.currentTarget).data("options");


		if (options) {
			//options = JSON.parse(options);
		}

		this.buttonActions[action[0]](action[1], options);
	}

	setState = (state:string, renderoptions?:any) => {

		for (var s in this.states) {
			if (this.states.hasOwnProperty(s)) {
				if (s !== state && this.states[s]) {
					this.states[s].element.style.display = "none";
				}
			}
		}

		this.states[state].render(renderoptions);
		this.states[state].element.style.display = "block";
	}

	private storageAvailable(type):boolean {
		try {
			var storage: WindowLocalStorage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch (e) {
			return false;
		}
	}

	getQueryParamByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	
}