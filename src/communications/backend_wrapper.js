import { Stop, TourMetadata } from "../data_classes";
import { subscriptionInfo } from "./notifications";
import { socket, getBackendUrl } from "./clientSocket";
import messages from "./messages";
import { globalState, GlobalState } from "../globalState";

let backend_wrapper = null;

/** Initializes and returns the backend wrapper singleton.
 * @returns {BackendWrapper} - The backend wrapper singleton.
 * */
export async function initializeBackend() {
	if (!backend_wrapper) {
		socket.emit(messages.GET_BACKEND_URL, {}, (msg) => {
			console.log("Backend url recieved", msg);
			backend_wrapper = new BackendWrapper(msg.url, msg.key, socket);
		});
		return backend_wrapper;
	}
	console.warn("Backend already initalized!");
	return null;
}

/** Retrieves the backend wrapper singleton.
 * @returns {BackendWrapper} - The backend wrapper singleton.
 * */
export function getBackend() {
	if (!backend_wrapper) {
		console.warn("Backend not initialized!");
		return null;
	}
	return backend_wrapper;
}

/** Class for easing interactions with the backend.*/
class BackendWrapper {
	/**
	 * Creates the backend wrapper. Do not create one of these yourself, get the singleton from the backend() function.
	 * @param {string} rootUrl - The url of the backend API.
	 * @param {Socket} socket - The socket.io socket for communicating with the JS server.
	 */
	constructor(rootUrl, key, socket) {
		this.rootUrl = rootUrl;
		this.key = key;
		this.authToken = null;
		this.socket = socket;
		console.log("Backend Initialized", this);
	}

	/**
	 * The generic function for making a request to the backend.
	 * Don't call this yourself, use one of the specific endpoint functions.
	 * @param {string} endpoint - The specific endpoint being called.
	 * @param {any} body - The body of the request being sent
	 * @param {string} method - The HTTP method being used.
	 * @param {any} headers - The headers being used in the request.
	 * @return {any} The response from the backend as a JSON object.
	 */
	async fetchFromBackend(endpoint, body, method, headers) {
		console.log("rootUrl", this.rootUrl);
		console.log(this.authToken);
		headers.Authorization = this.authToken;
		let req = { method, headers };
		if (body) {
			console.log(body);
			req.body = JSON.stringify(body);
		}
		let url = `${this.rootUrl}/${endpoint}`;
		if (this.key) {
			url = `${url}?code=${this.key}`;
		}
		console.log(`Sending request to endpoint ${endpoint} with req:`, req);
		const res = await fetch(url, req);
		console.log(`Response from backend endpoint: ${endpoint}`, res); //Debugging!
		if (!res.ok) {
			console.log(res.status);
			console.error(await res.text());
			throw new Error(
				`Fetch to ${endpoint} failed! Response Status: ${res.status}:${res.statusText}`,
			);
		}
		return await res.json();
	}

	/**
	 * Creates a new empty tour.
	 * @param {string} displayName - The creators display name.
	 * @param {string} password - The administrator password for the tour.
	 * @returns {{tourID: string, adminID: string}}
	 */
	async createTour(displayName, password) {
		try {
			const body = { display_name: displayName, password };
			if (subscriptionInfo != null) {
				body.subscription_info = subscriptionInfo.toJSON();
			}
			const res = await this.fetchFromBackend("tour", body, "POST", {}); //Potentially needs to be hashed here?
			console.log("created up andrew", res);
			if (res.tourID && res.adminID) {
				globalState.displayName = displayName;
				socket.emit(messages.UPDATE);
				socket.emit(messages.JOIN_TOUR, {
					tourID: res.tourID,
					displayName,
					userID: res.adminID,
				});
				this.authToken = res.adminID;
				globalState.selfID = res.adminID;
				globalState.isAdmin = true;
				return res;
			}
			console.error(
				"Malformed response from tour creation. Likely server-side bug.",
			);
		} catch (err) {
			alert("Could not create tour!"); // An alert maybe isnt the move, but some way of notifying the user. You can do something with an error variable and conditional rendering maybe.
			throw err;
		}
	}

	/**
	 * Overwrites the specified tours stops with the provided stops.
	 * @param {string} tourID - The id of the tour being updated.
	 * @param {Stop} stops - The stops overwriting the previous stops.
	 */
	async updateTourStops(tourID, stops) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/stops`,
				stops,
				"PUT",
				{},
			);
			socket.emit(messages.UPDATE);
			console.log(res.message);
		} catch (err) {
			alert("Could not update tour stops!");
			throw err;
		}
	}

	/**
	 * TODO: Document this once we know what it does lmao
	 */
	async ask_ai(tourID, prompt) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/ai`,
				{ prompt },
				"POST",
				{},
			);
			return res;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	/**
	 * Makes a request to the backend for the specified user to become an admin for a tour.
	 * @param {string} tourID - The id of the tour.
	 * @param {string} displayName - The display name of the person requesting to be an admin.
	 * @param {string} password - The administrator password for the tour.
	 * @returns {boolean} If the user was made an admin or not.
	 */
	async requestAdmin(tourID, displayName, password) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/admin`,
				{ display_name: displayName, password },
				"POST",
				{},
			);
			if (res.message === "You are now an admin") {
				//This is maybe evil.
				return true;
			}
			return false;
		} catch (err) {
			alert("Could not process admin request!");
			throw err;
		}
	}

	/**
	 * Gets the metadata for a tour.
	 * @param {string} tourID - The id of the tour.
	 * @returns {TourMetadata}
	 */
	async getTourData(tourID) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}`,
				null,
				"GET",
				{},
			);
			return TourMetadata.fromObject(res);
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Get all the stops of the tour.
	 * @param {string} tourID - The id of the tour.
	 * @returns {Stop[]} - The stops of the tour.
	 */
	async getTourStops(tourID) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/stops`,
				null,
				"GET",
				{},
			);
			return res.map((x) => Stop.fromObject(x));
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Deletes a tour.
	 * @param {string} tourID - The id of the tour.
	 */
	async deleteTour(tourID) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}`,
				{},
				"DELETE",
				{},
			);
			console.log(res.message);
			socket.emit(messages.TOUR_DELETED, tourID);
			socket.emit(messages.UPDATE);
		} catch (err) {
			alert("Could not delete tour!");
			throw err;
		}
	}

	/**
	 * Gets the joincode for a tour.
	 * @param {string} tourID - The id of the tour.
	 * @returns {{joincode: string}}
	 */
	async getTourJoincode(tourID) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/joincode`,
				null,
				"GET",
				{},
			);
			if (res.joincode) {
				return res.joincode;
			}
			console.error(
				"Malformed Message from joincode! - Likely a server side bug.",
				res,
			);
		} catch (err) {
			alert("Could not get joincode!");
			throw err;
		}
	}

	/**
	 * Joins a tour.
	 * @param {string} displayName - The display name of the user joining the tour.
	 * @param {string} joincode - The joincode for the tour.
	 * @returns {string} - The new participant id of the user.
	 */
	async joinTour(displayName, joincode) {
		try {
			const body = { display_name: displayName, joincode };
			console.log(body);
			if (subscriptionInfo !== null) {
				body.subscription_info = subscriptionInfo.toJSON();
			}
			const res = await this.fetchFromBackend(`tour/join`, body, "POST", {});
			if (res.message && res.ID && res.tourID) {
				globalState.displayName = displayName;
				this.authToken = res.ID;
				globalState.selfID = res.ID;
				globalState.currentTourID = res.tourID;
				socket.emit(messages.JOIN_TOUR, {
					tourID: res.tourID,
					displayName: globalState.displayName,
					userID: globalState.selfID,
				});
				socket.emit(messages.UPDATE);
				return res.ID;
			}
			console.error(
				"Malformed Message from join tour! - Likely a server side bug. : ",
				res,
			);
			throw new Error(
				"Malformed Message from join tour! - Likely a server side bug.",
			);
		} catch (err) {
			alert("Could not join tour!");
			throw err;
		}
	}

	/**
	 * Gets the ids and names of participants in a tour.
	 * @param {string} tourID - The id of the tour.
	 * @returns {{ID: string, displayName: string}[]}
	 */
	async getTourParticipants(tourID) {
		if (tourID == null) {
			console.warn("Tour ID is null for getting participants!");
			return null;
		}
		try {
			console.log("ID, participants", tourID);
			const res = await this.fetchFromBackend(
				`tour/${tourID}/participants`,
				null,
				"GET",
				{},
			);
			if (res.every((x) => x.ID && x.displayName)) {
				return res;
			}
			console.error(
				"Malformed Message from get tour participants! - Likely a server side bug, or in this case displayName being camelCase not snake_case",
			);
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Removes a user from the tour.
	 * @param {string} tourID - The id of the tour.
	 * @param {string} participantID - The id of the participant being removed.
	 * @returns  {{message: string}} - The response message from the backend.
	 */
	async removeParticipant(tourID, participantID, displayName) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/participants/${participantID}`,
				{},
				"DELETE",
				{},
			);
			console.log(res);
			socket.emit(messages.LEAVE_TOUR, {
				tourID,
				userID: participantID,
				displayName,
			});
			socket.emit(messages.UPDATE);

			//Update server?, i suppose send a message to the server telling it to get an update from the backend.
		} catch (err) {
			alert("Could not remove participant!"); //This can definitely be done better
			throw err;
		}
	}

	/**
	 *  TODO: Document this once the API we're using is set in stone
	 */
	async getDirections(tourID, stopID) {}

	async getMap(tourID) {
		try {
			return await this.fetchFromBackend(`tour/${tourID}/map`, null, "GET", {});
		} catch (err) {
			alert("Could not get map!");
			throw err;
		}
	}

	async notify(tourID, title, body) {
		try {
			const res = await this.fetchFromBackend(
				`tour/${tourID}/notify`,
				{ title, body },
				"POST",
				{},
			);
			console.log(res.message);
		} catch (err) {
			console.error(err);
		}
	}
	async get_notif_key() {
		try {
			const res = await this.fetchFromBackend(
				"notificationKey",
				null,
				"GET",
				{},
			);
			return res.key;
		} catch (err) {
			alert("Could not get notification key!");
			throw err;
		}
	}
	async update_tour(tourID, changes) {
		try {
			console.log(this.authToken);
			console.log("Committing changes", changes);
			const res = await this.fetchFromBackend(
				`tour/${tourID}`,
				changes,
				"PATCH",
				{},
			);
			console.log(res.message);
			socket.emit(messages.UPDATE);
		} catch (err) {
			alert("Could not update tour!");
			throw err;
		}
	}
	async get_status(tourID) {
		try {
			console.log(this.authToken);
			const res = await this.fetchFromBackend(
				`tour/${tourID}/status`,
				null,
				"GET",
				{},
			);
			console.log(res);
			return res;
		} catch (err) {
			alert("Could not get status!");
			throw err;
		}
	}
}
