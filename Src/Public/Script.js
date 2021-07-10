'use strict'
const port = 8080

const ws = new WebSocket(`ws://localhost:${port}/`)

let connected = false

// Unlike Node.js, there is no `on` alias for event Listening aaaaaaaaaaaaaa
ws.addEventListener("open", () => {
	console.log("The connection has been established!")
})

ws.addEventListener("message", (data) => {
	const input = data.data.toLowerCase()
	const warnElem = document.getElementById("warn-user")

	if(input.startsWith("rpc status")) {
		connected = true

		warnElem.innerText = "The RPC has been connected!"
		alert('The RPC has been connected!')
		return
	}

	if(input.startsWith("rpc error")) {
		warnElem.innerText = "Something went wrong while connecting the RPC... Please restart the app"
		console.log(input.slice(11))
	}
})

function getInputValue() {
	if(!connected) return alert("The RPC hasn't been loaded yet!")
	// Getting the required elements...
	const stateElem = document.getElementById("state")
	const detailsElem = document.getElementById("details")
	const imgTextElem = document.getElementById("imgText")

	// Getting the data we need
	const state = stateElem.value.trim()
	const details = detailsElem.value.trim()
	const imgText = imgTextElem.value.trim()

	// Checking the length of the elements
	if(state.length > 24) return alert('The number of characters in the "State" field cannot exceede 24.')
	if(details.length > 24) return alert('The number of characters in the "Details" field cannot exceede 24.')
	if(imgText.length > 24) return alert('The number of characters in the "Image Text" field cannot exceede 24.')

	// Sending the data through the WebSocket
	ws.send(JSON.stringify(
		{
			state,
			details,
			imgText,
		},
	))

	// Clearing the fields or else it looks bad
	stateElem.value = detailsElem.value = imgTextElem.value = ""
		
	// These gave us our required values, let the user know about the successful submission
	alert("Submitted the data successfully!")
}