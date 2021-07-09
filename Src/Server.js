"use strict";

// ! Importing and Stuff
const { app, BrowserWindow } = require("electron");
const { join } = require("path");
const { port, development } = require("../Config/config.json");
const WebSocket = require("ws");
const { client: RPCClient, setActivity } = require("./RPC");

const WebSocketServer = new WebSocket.Server({
	port,
});
// * Will work on this on the after the configuration of the Application, down in the code

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
	if(BrowserWindow.getAllWindows().length) createWindow(); // Creates a window IF there is no other window running
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
	let mainWindow = new BrowserWindow({
		width: 340, // Width of the window being opened
		height: 380, // Height of the window
		resizable: true, // Lets the user resize the stuff,
		titleBarStyle: "hidden", // Style of the Window Title Bar (IDK why Aaryan wanted it to be hidden)
		webPreferences: {
			nodeIntegration: true,
		},
		autoHideMenuBar: true, // Simply hides the Menu Bar
		center: true, // Shows the Window on the CENTER of the screen,
	});

	mainWindow.loadURL(`file:///${join(__dirname, "./Public/index.html")}`);

	// If the app is under development, it will open devTools, in a separate window!
	if(development) mainWindow.webContents.openDevTools({ mode: "detach" });
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

	RPCClient.on("ready", () => {
		ws.send("RPC Status: Ready");
		console.log("The RPC has loaded!");
	});

	RPCClient.login({ clientId: RPCClient.id })
		.catch(err => {
			ws.send(`RPC Error: ${err.message}`);
		});

	ws.on("message", (res) => {
		const data = JSON.parse(res);
		// Message is kinda like when we get some data from the Frontend
		console.table(data);
		// I need to parse the data, since it is sent using JSON.stringify, yikey

		setActivity(data.state, data.details, data.imgText);
	});
});