minerActive = false;

function setMinerStatus(status) {
	document.getElementById("miningstatus").innerHTML = status;
}

function startMining(_address) {
	if (!minerActive) {
		if (typeof Worker !== "undefined") {
			minerActive = true;
			w = new Worker("miningWorker.js");
			w.onmessage = function(event) {
				setMinerStatus(event.data);
			};
			w.postMessage(_address);
		}
		else {
			setMinerStatus("Error: WebWorker isn't supported on this browser");
		}
	}
}

function stopMining() {
	w.terminate();
	setMinerStatus("Stopped");
	minerActive = false;
}