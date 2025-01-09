import { createMemoryHistory, createRouter } from "vue-router";
import MainMenu from "./components/MainMenu.vue";
import Participants from "./components/participants/Participants.vue";
import Chat from "./components/chat/Chat.vue";
import TourCreation from "./components/tours/TourCreation.vue";
import Stops from "./components/stops/Stops.vue";
import Debug from "./components/Debug.vue";
import TourInfo from "./components/tours/TourInfo.vue";
import JoinTour from "./components/JoinTour.vue";
import EditTour from "./components/tours/EditTour.vue";
import Settings from "./components/Settings.vue";
const routes = [
	{ path: "/", component: MainMenu, name: "Wanderwall" },
	{ path: "/create", component: TourCreation, name: "Create Tour" },
	{ path: "/participants", component: Participants, name: "Participants" },
	{ path: "/chat", component: Chat, name: "Chat" },
	{ path: "/stops", component: Stops, name: "Stops" },
	{ path: "/tour", component: TourInfo, name: "Tour Info" },
	{ path: "/debug", component: Debug, name: "Debug" },
	{ path: "/settings", component: Settings, name: "Settings" },
	{ path: "/join", component: JoinTour, name: "Join Tour" },
	{ path: "/edit", component: EditTour, name: "Edit Tour" },
];

export default createRouter({ history: createMemoryHistory(), routes });
