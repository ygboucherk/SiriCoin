minerActive = false;

function startMining(_address) {
	if (!minerActive) {
		minerActive = true;
		w = new Worker("miningWorker.js");
		w.onmessage = function(event) {
			document.getElementById("miningstatus").innerHTML = event.data;
		};
		w.postMessage(_address);
	}
}

function stopMining() {
	w.terminate();
	document.getElementById("miningstatus").innerHTML = "Stopped";
	minerActive = false;
}