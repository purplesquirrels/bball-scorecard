var startTime;
var timer;
var timerLength;

self.addEventListener('install', function(event) {
	console.log("SW installed!", event);
	event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('message', function(event) {

    var data = event.data;
    let time = Date.now();

    console.log("Responding to message from the Page: ", data);

    switch (data.command) {
		case "startTimer" :

			if (timer) {
				clearInterval(timer);
			}


			timerLength = (data.timerLength) * 60 * 1000; // minutes to milliseconds
			console.log("Timer length:", timerLength)

			startTime = time;

			timer = setInterval(onInterval, 1000);
			
			sendMessage({command: "timerStarted", time: startTime});
			break;
		case "pauseTimer" :
			// if (timer) {
			// 	clearInterval(timer);
			// 	sendMessage({'command':'timerPaused', 'time': time});
			// }
			break;
		case "stopTimer" :
			if (timer) {
				clearInterval(timer);
				sendMessage({'command':'timerEnded', 'time': time});
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
		sendMessage({'command':'timerEnded', 'time': time, 'percent': (time - startTime) / timerLength});
		
		timer = null;
		startTime = null;
	}
	else {
		sendMessage({'command':'timerUpdate', 'time': time, 'percent': (time - startTime) / timerLength});
	}
}

function sendMessage(message) {
	self.clients.matchAll().then(function(clientList) {
		for (var i = 0 ; i < clientList.length ; i++) {
			if (clientList[i].frameType === 'top-level' && clientList[i].url.indexOf("/headers/") === -1) {
				clientList[i].postMessage(message);
			}
		}
	});
}