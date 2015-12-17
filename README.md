# bball-scorecard
App for keeping scores from our basketball variation on 'around the world'

# Technology

 * **TypeScript** – the language the app is written in, compiled to JS
 * **Handlebars** – HTML templating system used for the UI
 * **MaterializeCSS** – Material design CSS framework
 * **Gulp** – task runner for watching files and creating built app, which runs on NodeJS

# Requirements

 * Sublime Text 3
   * TypeScript package installed
 * NodeJS
   * Gulp ( npm install --global gulp )

*Note: Instead of ST3 any other tool with the TypeScript compiler (such as Visual Studio) can be used but it is up to you to configure correctly, this is just how my environment is set up.*

# Setup

1. Clone repo
2. Run 'npm install' in root directory

*Note: To view locally you will need to have a local server setup with PHP (I use IIS with the latest PHP add-on installed), and a virtual directory pointing to the build folder. You can then view at **http://localhost/[your virtual directory]/index.html***

# Build

1. Open CMD window to root directory
2. Run gulp watch to begin watching src folder for changes
3. Open app.ts in Sublime Text
4. Press CTRL + B to build project (needs to be run on app.ts otherwise files get created in wrong place)
5. Once built, or any other files are changed, Gulp will copy the new files to the build folder
6. The build folder is the final output