const { register, Client } = require("discord-rpc");
const { clientID } = require("../Config/config.json");
const startTimestamp = new Date();

register(clientID);

const client = new Client({
	transport: "ipc",
});

client.id = clientID;

/**
 * @param {String} state 
 * @param {String} details
 * @param {String} imgText
 */
exports.setActivity = async function setActivity(state, details, imgText) {
	client.setActivity({
		state,
		details,
		startTimestamp,
		instance: false,
	});
}

exports.client = client;