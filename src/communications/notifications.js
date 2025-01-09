import { getBackend } from "./backend_wrapper";

let serviceWorkerRegistration = null;
let vapidPublicKey = null;
export let subscriptionInfo = null;
export async function setupNotificationServiceWorker() {
	try {
		if ("serviceWorker" in navigator) {
			serviceWorkerRegistration = await navigator.serviceWorker.register(
				"./notificationServiceWorker.js",
			);
			console.log("Registration successful:", serviceWorkerRegistration);
			// console.log("Plag")
			const key_res = await getBackend().get_notif_key(); // console.log("Plag")
			vapidPublicKey = key_res;

			const subscription =
				await serviceWorkerRegistration.pushManager.getSubscription();
			if (
				subscription &&
				subscription.options.applicationServerKey === vapidPublicKey
			) {
				subscriptionInfo = subscription;
			} else {
				if (subscription) {
					await subscription.unsubscribe();
				}
				subscriptionInfo =
					await serviceWorkerRegistration.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: vapidPublicKey,
					});
			}
			console.log("Subscription successful", subscriptionInfo);
			// serviceWorkerRegistration = navigator.serviceWorker
			// 	.register("./src/notifications/notificationServiceWorker.js")
			// 	.then(
			// 		async (registration) => {
			// 			console.log("Registration successful:", registration);
			// 			serviceWorkerRegistration = registration;
			// 			console.log("slag");
			// 			const key_res = await fetch(PUBLIC_KEY_ROUTE);
			// 			console.log("Plag");
			// 			console.log(key_res);
			// 			// vapidPublicKey = urlBase64ToUint8Array(await key_res.text());
			// 			vapidPublicKey = await key_res.text();
			// 			console.log(vapidPublicKey);
			// 			subscriptionInfo = serviceWorkerRegistration.pushManager.subscribe({
			// 				userVisibleOnly: true,
			// 				applicationServerKey: vapidPublicKey,
			// 			});
			// 		},
			// 		(error) => {
			// 			console.error("Service worker registration failed:", error);
			// 		},
			// 	);
		} else {
			console.error("Service workers unsupported!");
		}
	} catch (e) {
		console.error("Could not setup notifications!: ", e);
	}
}
