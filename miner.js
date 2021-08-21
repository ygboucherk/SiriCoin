minerActive = false;
threads = []

function threadsStatus(threadNumber, data) {
	_shares = Number(data.split(",")[0])
	_hashrate = Number(data.split(",")[1])
	shares = 0;
	hashrate = 0;
	i = 0;
	while (i < threads.length) {
		if (i == threadNumber) {
			shares += _shares;
			hashrate += _hashrate;
			threads[i].hashrate = _hashrate;
			threads[i].shares = _shares;
		}
		else {
			shares += threads[i].shares;
			hashrate += threads[i].hashrate;
		}
		i += 1;
	}
	setMinerStatus("running - " + shares + " shares accepted - " + hashrate + " h/s" + "<br/>Number of threads : " + threads.length);
}

function setMinerStatus(status) {
	document.getElementById("miningstatus").innerHTML = status;
}

function showRecommendedThreads() {
	document.getElementById("threadsInput").placeholder = "Number of mining threads (recommended : " + navigator.hardwareConcurrency + ")"
}

function startMining(_address, _threads) {
	if (!minerActive) {
		if (typeof Worker !== "undefined") {
			minerActive = true;
			i = 0;
			while (i < (_threads || navigator.hardwareConcurrency)) {
				threads[i] = new Worker("miningWorker.js");
				threads[i].threadNumber = i;
				threads[i].onmessage = function(event) {
					threadsStatus(event.target.threadNumber, event.data);
				};
				threads[i].postMessage(_address);
				i += 1;
			}
		}
		else {
			setMinerStatus("Error: WebWorker isn't supported on this browser");
		}
	}
}

function stopMining() {
	i = 0;
	while (i < threads.length) {
		threads[i].terminate();
		threads[i].hashrate = 0;
		threads[i].shares = 0;
		i += 1;
	}
	minerActive = false;
	setMinerStatus("Stopped");
}

showRecommendedThreads();