import { io } from "socket.io-client";
import { reactive, nextTick } from "vue";
import messages from "./messages";
import { GlobalState, globalState } from "../globalState";
import { getBackend } from "./backend_wrapper";
import router from "../router";
import { timeToDate } from "../data_classes";

/**
 * The big object containing everything from the javascript server.
 */
export const socketState = reactive({
	connected: false,
	chatMessages: null,
	// events: []
});

export const socket = io(window.location.host); // Should work?

export function sendChatMsg(tourID, displayName, content) {
	socket.emit(messages.CHAT_MSG, { tourID, message: { displayName, content } });
}

socket.onAny((msg) => {
	console.log("message recieved!: ", msg);
});

socket.on(messages.UPDATE, async (_) => {
	//make some calls to the backend, store them in global state.
	console.log("Updating");
	const backend = getBackend();
	if (backend) {
		if (globalState.currentTourID && globalState.currentTourID != null) {
			console.log(globalState.currentTourID);
			//If your language server is complaining ignore its cause i did the documentation wrong.
			globalState.tourData = await backend.getTourData(
				globalState.currentTourID,
			);
			if (globalState.currentTourID) {
				globalState.participants = await backend.getTourParticipants(
					globalState.currentTourID,
				);
			}

			if (globalState.currentTourID) {
				globalState.tourStops = await backend.getTourStops(
					globalState.currentTourID,
				);
			}
			console.log(globalState.tourStops);

			if (globalState.currentTourID) {
				globalState.tourStops = globalState.tourStops.sort(
					(a, b) => timeToDate(a.time.start) - timeToDate(b.time.start),
				);
			}

			if (globalState.currentTourID) {
				globalState.tourStatus = await backend.get_status(
					globalState.currentTourID,
				);
			}
		}
	}
});

socket.on(messages.CHAT_MSG, (messages) => {
	socketState.chatMessages = messages;
});

socket.on(messages.LEAVE_TOUR, (_) => {
	router.replace({ path: "/" });
	socketState.chatMessages = [];
	globalState.reset();
});

socket.on(messages.TOUR_DELETED, (tourID) => {
	if (tourID === globalState.currentTourID) {
		console.log("Tour deleted!");
		globalState.currentTourID = null;
		nextTick(() => {
			router.replace({ path: "/" });
			globalState.reset();
		});
	}
});

export function getBackendUrl() {
	let backend_url;
	console.log("Getting backend url");
	return backend_url;
}
