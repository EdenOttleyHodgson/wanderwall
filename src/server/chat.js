import messages from "../communications/messages.js";

/**
 * Sets up the chat feature.
 * @param {Socket} server - the socket.io app.
 * */
export function setupChat(server) {
	server.locals.chatrooms = new Map();
}

/**
 * Class for managing a chat room and its participants.
 * */
export class Chatroom {
	constructor(socket, userID) {
		this.messages = [];
		this.participants = [{ socket, userID }];
	}
	emitMsg(msg) {
		if (msg.content && msg.displayName) {
			msg.id = this.messages.length;
			this.messages.push(msg);
			for (const sock of this.participants.map((x) => x.socket)) {
				sock.emit(messages.CHAT_MSG, this.messages);
			}
		} else {
			console.error("Bad inner message sent to chat!", msg);
		}
	}
}
