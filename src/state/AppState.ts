class AppState {

	controller: ScoreController;
	app: App;
	root: HTMLDivElement;
	element: HTMLDivElement;

	constructor(controller: ScoreController, app: App) {

		this.controller = controller;
		this.app = app;
		this.root = app.scoreboardRoot;

		this.element = document.createElement("div");

		this.root.appendChild(this.element);

	}

	render() {}

}