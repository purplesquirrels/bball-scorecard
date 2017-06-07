class GameTimer {

    listeners: object;

    constructor() {

        this.listeners = {
            "onTimerUpdate": [],
            "onTimerEnd": []
        }

        if ('serviceWorker' in navigator) {
            this.setupServiceWorker();
        }
        else {
            alert("Your browser doesn't support the game timer. Use a seperate app for timing.");
        }
    }

    public startTimer(duration: number = 30) {
        this.sendMessage({ command: 'startTimer', timerLength: duration });
        this.sendMessage({ command: "ping" });
    }

    public stopTimer() {
        this.sendMessage({ command: 'stopTimer' });
    }

    public pauseTimer() {
        this.sendMessage({ command: 'pauseTimer' });
    }

    public addEventListener(name, func) {
        this.listeners[name].push(func);
    }
    public removeEventListener(name, func) {
        this.listeners[name].filter((func) => {
            return func !== func;
        })
    }

    setupServiceWorker = () => {
        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.register('sw.js')
                .then((reg) => {

                    if ('Notification' in window) {
                        Notification.requestPermission((permission) => {
                            // If the user accepts, let's create a notification
                            if (permission === "granted") {
                            } else {
                                alert('You will need to enable notifications to use the built-in game timer.');
                            }
                        });
                    } else {
                        alert('Notifications not supported. Game timer will not work correctly.');
                    }

                    navigator.serviceWorker.addEventListener('message', (event) => {
                        if (event.data.command === "pong") {
                            this.sendMessage({ command: "ping" });
                        }
                        else if (event.data.command === "timerUpdate") {
                            this.listeners['onTimerUpdate'].forEach(func => {
                                func(event.data);
                            });
                            this.notify({
                                message: "Game in progress : " + event.data.timeleft,
                                requireInteraction: false,
                                tag: 'game-progress'
                            });
                        }
                        else if (event.data.command === "timerEnded") {
                            this.listeners['onTimerEnd'].forEach(func => {
                                func(event.data);
                            });
                            this.notify({
                                message: "Game Over!",
                                requireInteraction: true,
                                tag: 'game-over'
                            });
                        }
                    });

                }).catch(function (error) {
                    alert('Failed to set up game timer.');
                    console.log('SW Registration failed with ' + error);
                });

        }
    }

    sendMessage = (message) => {
        navigator.serviceWorker.ready.then(function () {
            navigator.serviceWorker.controller.postMessage(message);
        });
    }

    notify(options: any) {
        if (!("Notification" in window)) {
            alert(options.message);
            return;
        }

        // Let's check whether notification permissions have already been granted
        if (Notification["permission"] === "granted") {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(options.message, {
                    icon: 'favicon/apple-touch-icon-72x72.png',
                    vibrate: [200, 200, 200, 200, 200, 500, 200, 200, 200, 200, 200, 500, 200, 200, 200, 200, 200, 500, 200, 200, 200, 200, 200, 500],
                    requireInteraction: options.requireInteraction,
                    tag: options.tag
                });
            });
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification["permission"] !== "denied") {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    navigator.serviceWorker.ready.then(function (registration) {
                        registration.showNotification(options.message, {
                            icon: 'favicon/apple-touch-icon-72x72.png',
                            vibrate: [200, 200, 200, 200, 200, 500, 200, 200, 200, 200, 200, 500, 200, 200, 200, 200, 200, 500, 200, 200, 200, 200, 200, 500],
                            requireInteraction: options.requireInteraction,
                            tag: options.tag
                        });
                    });
                }

            });
        }
    }
}