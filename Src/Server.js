"use strict";

// ! Importing and Stuff
const { app, BrowserWindow } = require("electron");
const { join } = require("path");
const { clientID, port } = require("../Config/config.json");
const WebSocket = require("ws");

const WebSocketServer = new WebSocket.Server({
	port,
});
// * Will work on this on the after the configuration of the Application, down in the code

let mainWindow;

/**
 * ! App Events
 * ! Using ! because coloured comments, if you don't use it then get it 
 * ! on https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
 * ! For VSCode, or else you're in bad luck
 */

// When the app's ready, it will load the window
app.on("ready", createWindow);

app.on("activate", () => {
	// Triggered when the app is lauched, or relaunched while running etc
	if(mainWindow === null) createWindow(); // Creates a window IF there is no other window running
	// This is why mainWindow is a global variable, hmm...
});

app.on("window-all-closed", () => {
	// Triggered when all Windows of the app are closed
	app.quit();
});

/**
 * ! Declaring the necessary functions and RPC stuff
 */
function createWindow() {
	// Instanciate the Window the user will see.
	mainWindow = new BrowserWindow({
		width: 340, // Width of the window being opened
		height: 380, // Height of the window
		resizable: true, // Lets the user resize the stuff,
		titleBarStyle: "hidden", // Style of the Window Title Bar (IDK why Aaryan wanted it to be hidden)
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL(`file:///${join(__dirname, "./Public/index.html")}`);

	mainWindow.on("closed", () => {
		// Our mainWindow was closed, so we wanna just free our variable of the responsibility
		mainWindow = null;
	});
}

// ! Working on the WebSocket
WebSocketServer.on("connection", (ws) => {
	console.log("Connected to the websocket!");

	// ws is basically our connection with the client rn
	ws.on("close", () => {
		// Just logging the message, for Dev purposes
		// Triggered when the App disconnects
		console.log("The connection was cut off...");
	});

	ws.on("message", (data) => {
		// Message is kinda like when we get some data from the Frontend
		console.table(JSON.parse(data));
	})
});