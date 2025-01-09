import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupNotificationServiceWorker } from "./communications/notifications";
import router from "./router";
import { initializeBackend } from "./communications/backend_wrapper";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";

initializeBackend();
const app = createApp(App);
app.use(router);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");
