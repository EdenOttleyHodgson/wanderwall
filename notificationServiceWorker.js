async function onActivate() {
	console.log("activated");
	clients.claim()
}
async function onInstall() {
	console.log("Notification Service Worker Installed")
}
async function onPush(event) {
	console.log("Push recieved: ", event)
	const payload = event.data.json()
	self.registration.showNotification(payload.title), {
		body: payload.body
	};
}
try {
	self.addEventListener("install", (e) => e.waitUntil(onInstall()))

	self.addEventListener("activate", (e) =>
		e.waitUntil(onActivate())

	);

	self.addEventListener("push", (e) =>
		e.waitUntil(onPush(e))
	);
} catch (e) {
	console.error("Service worker error!:", e)

}

