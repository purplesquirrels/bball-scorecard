class AppState {

	controller: ScoreController;
	app: App;
	root: HTMLDivElement;
	element: HTMLDivElement;
	options: any;

	constructor(controller: ScoreController, app: App, options: any) {

		this.controller = controller;
		this.app = app;
		this.root = app.scoreboardRoot;
		this.options = options;

		this.element = document.createElement("div");

		this.element.classList.add("app-state");

		this.root.appendChild(this.element);

	}

	render(renderoptions?: any) { }

}