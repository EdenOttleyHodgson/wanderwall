/**
 * Module for most of the server side code, keep stuff in the root server.js to a minimum.
 * */

import { registerHandlers } from "../communications/serverSocket.js";
import { setupChat } from "./chat.js";

import * as dotenv from "dotenv";
/**
 * The setup function for the server. Effectively acts as the servers "main" function.
 * @param {Express} app - The expressjs app.
 * @param {Server} io - The socket.io server.
 * */
export function setupServer(server, io) {
	dotenv.configDotenv();
	console.log(process.env);
	server.locals.sockets = [];
	server.locals.toursToSockets = new Map();
	setupChat(server);
	registerHandlers(server, io);
}
