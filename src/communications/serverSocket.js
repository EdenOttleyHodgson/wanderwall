import { Chatroom } from "../server/chat.js";
import messages from "./messages.js";

export function registerHandlers(app, io) {
	io.on("connection", (socket) => {
		app.locals.sockets.push(socket);
		socket.onAny((msg) => console.log("message recieved!:", msg));
		socket.on(messages.UPDATE, (msg) => {
			for (const sock of app.locals.sockets) {
				sock.emit(messages.UPDATE, msg);
			}
		});
		socket.on(messages.TOUR_DELETED, (msg) => {
			for (const sock of app.locals.sockets) {
				sock.emit(messages.TOUR_DELETED, msg);
			}
		});
		socket.on(messages.JOIN_TOUR, (msg) => {
			if (msg.tourID && msg.displayName && msg.userID) {
				const chatroom = app.locals.chatrooms.get(msg.tourID);
				if (chatroom) {
					console.log("Join");
					chatroom.participants.push({ socket, userID: msg.userID });
					chatroom.emitMsg({
						displayName: "INFO:",
						content: `${msg.displayName} has joined.`,
					});
				} else {
					console.log("Chatroom made");
					app.locals.chatrooms.set(
						msg.tourID,
						new Chatroom(socket, msg.userID),
					);
				}
			} else {
				console.error("Bad join tour message!", msg);
			}
		});
		socket.on(messages.LEAVE_TOUR, (msg) => {
			if (msg.tourID && msg.displayName && msg.userID) {
				const chatroom = app.locals.chatrooms.get(msg.tourID);
				if (chatroom) {
					const user = chatroom.participants.find(
						(x) => x.userID === msg.userID,
					);
					const index = chatroom.participants.indexOf(user);
					console.log(index);
					console.log(chatroom.participants);
					if (index > -1) {
						chatroom.participants.splice(index, 1);
					}
					chatroom.emitMsg({
						displayName: "INFO:",
						content: `${msg.displayName} has left.`,
					});
					user.socket.emit(messages.LEAVE_TOUR);
				} else {
					console.error(
						`Chatroom with id ${msg.tourID} doesnt exist when it should!!`,
						app.locals.chatrooms,
					);
				}
			} else {
				console.error("Bad leave tour message!", msg);
			}
		});
		socket.on(messages.CHAT_MSG, (msg) => {
			if (msg.tourID && msg.message) {
				console.log("Chat message!:", msg);
				const chatroom = app.locals.chatrooms.get(msg.tourID);
				if (chatroom) {
					chatroom.emitMsg(msg.message);
				} else {
					console.error(
						`Chatroom with id ${msg.tourID} doesnt exist when it should!!`,
						app.locals.chatrooms,
					);
				}
			} else {
				console.error("Bad send chat message!", msg);
			}
		});
		socket.on(messages.GET_BACKEND_URL, (_, callback) => {
			console.log("Backend url requested");
			callback({
				url: process.env.BACKEND_URL || "http://localhost:7071",
				key: process.env.BACKEND_KEY || undefined,
			});
		});
	});
}
