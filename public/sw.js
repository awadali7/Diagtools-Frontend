// Service Worker for Push Notifications
self.addEventListener("push", (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const title = data.title || "New Notification";
    const options = {
        body: data.body || data.message || "",
        icon: "/icon-192x192.png",
        badge: "/icon-96x96.png",
        tag: data.tag || "notification",
        data: data.data || {},
        requireInteraction: false,
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const data = event.notification.data;
    const url = data?.url || "/dashboard";

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                // Check if there's already a window/tab open with the target URL
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url === url && "focus" in client) {
                        return client.focus();
                    }
                }
                // If not, open a new window/tab
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});
