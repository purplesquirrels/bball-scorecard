var startTime;
var timer;
var timerLength;
var keepalive = true;

self.addEventListener('install', function (event) {
	event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('message', function (event) {

	var data = event.data;
	let time = Date.now();

	switch (data.command) {
		case "ping":
			if (keepalive) setTimeout(() => sendMessage({ command: "pong" }), 500);
			break;
		case "startTimer":

			if (timer) clearInterval(timer);

			timerLength = (data.timerLength) * 60 * 1000; // minutes to milliseconds

			startTime = time;

			timer = setInterval(onInterval, 1000);

			sendMessage({ command: "timerStarted", time: startTime });
			break;
		case "pauseTimer":
			// if (timer) {
			// 	clearInterval(timer);
			// 	sendMessage({'command':'timerPaused', 'time': time});
			// }
			break;
		case "stopTimer":
			if (timer) {
				clearInterval(timer);
				sendMessage({ 'command': 'timerEnded', 'time': time });
			}

			timer = null;
			startTime = null;
			break;
	}
});

function onInterval() {
	let time = Date.now();

	if (time - startTime > timerLength) {
		clearInterval(timer);
		sendMessage({ 'command': 'timerEnded', 'time': time, 'timeleft': `00:00`, 'percent': 1 });

		timer = null;
		startTime = null;
		keepalive = false;
	}
	else {

		let diff = new Date(0);
		diff.setMilliseconds(timerLength - (time - startTime));
		let mins = diff.getMinutes();
		let secs = diff.getSeconds();

		mins = mins < 10 ? "0" + mins : mins;
		secs = secs < 10 ? "0" + secs : secs;

		sendMessage({ 'command': 'timerUpdate', 'time': time, 'timeleft': `${mins}:${secs}`, 'percent': (time - startTime) / timerLength });
	}
}

function sendMessage(message) {
	self.clients.matchAll().then(function (clientList) {
		for (var i = 0; i < clientList.length; i++) {
			if (clientList[i].frameType === 'top-level' && clientList[i].url.indexOf("/headers/") === -1) {
				clientList[i].postMessage(message);
			}
		}
	});
}