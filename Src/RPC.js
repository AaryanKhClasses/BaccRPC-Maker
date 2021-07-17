const { register, Client } = require("discord-rpc")
const { clientID } = require("./Config/Config.json")
const startTimestamp = new Date()

register(clientID)

const client = new Client({
	transport: "ipc",
})

client.id = clientID

/**
 * @param {String} state 
 * @param {String} details
 * @param {String} imgText
 */
exports.setActivity = async function setActivity(state, details, imgText) {
	client.setActivity({
		state: state || 'Having a custom RPC',
		details: details || 'BaccRPC Maker',
		startTimestamp,
		largeImageKey: 'logo-large',
		largeImageText: imgText || 'BaccRPC Maker',
		smallImageKey: 'logo-small',
		smallImageText: 'BaccRPC Maker',
		instance: false,
	})
}

exports.client = client