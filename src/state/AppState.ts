class AppState {

	controller: ScoreController;
	app: App;
	root: HTMLDivElement;
	element: HTMLDivElement;

	constructor(controller: ScoreController, app: App) {

		this.controller = controller;
		this.app = app;
		this.root = app.root;

		this.element = document.createElement("div");

		this.element.classList.add("app-state");

		this.root.appendChild(this.element);

	}

	render() {}

}