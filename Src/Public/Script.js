'use strict'
// import { port } from "../../Config/config.json";
const port = 8080;

const ws = new WebSocket(`ws://localhost:${port}/`);

// Unlike Node.js, there is no `on` alias for event Listening aaaaaaaaaaaaaa
ws.addEventListener("open", () => {
	console.log("The connection has been established!");
});

function getInputValue() {
	// Getting the required elements...
	const stateElem = document.getElementById("state");
	const detailsElem = document.getElementById("details");
	const imgTextElem = document.getElementById("imgText");

	// Getting the data we need
	const state = stateElem.value;
	const details = detailsElem.value;
	const imgText = imgTextElem.value;

	// Sending the data through the WebSocket
	ws.send(JSON.stringify(
		{
			state,
			details,
			imgText,
		},
	));

	// Clearing the fields or else it looks bad
	stateElem.innerText = detailsElem.innerText = imgTextElem.innerText = "";

	// These gave us our required values, let the user know about the successful submission
	alert("Submitted the data successfully!");
}