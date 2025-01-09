import { reactive } from "vue";
import router from "./router.js";

export class GlobalState {
	constructor() {
		this.currentTourID = null;
		this.isAdmin = false;
		this.tourStops = null;
		this.tourData = null;
		this.participants = [];
		this.selfID = null;
		this.displayName = "Anonymous";
		this.tourStatus = null;
	}
	reset() {
		this.currentTourID = null;
		this.isAdmin = false;
		this.tourStops = null;
		this.tourData = null;
		this.participants = [];
		this.selfID = null;
		this.displayName = "Anonymous";
		this.tourStatus = null;
		router.replace({ path: "/" });
	}
}

export const globalState = reactive(new GlobalState());
