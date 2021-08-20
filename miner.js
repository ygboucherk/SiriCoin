minerActive = false;
threads = []

function threadsStatus(threadNumber, data) {
	_shares = data.split(",")[0]
	_hashrate = data.split(",")[1]
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
	setMinerStatus("running - " + shares + " shares accepted - " + hashrate + " h/s");
}

function setMinerStatus(status) {
	document.getElementById("miningstatus").innerHTML = status;
}

function startMining(_address) {
	if (!minerActive) {
		if (typeof Worker !== "undefined") {
			minerActive = true;
			i = 0;
			while (i < 1) {
				threads[i] = new Worker("miningWorker.js");
				threads[i].onmessage = function(event) {
					threadsStatus(i, event.data);
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
	while (i < threads.length) {
		threads[i].terminate();
		i += 1;
	}
	minerActive = false;
	setMinerStatus("Stopped");
}