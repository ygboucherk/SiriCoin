minerActive = false;

function startMining(_address) {
	if (!minerActive) {
		minerActive = true;
		w = new Worker("miningWorker.js");
		w.onmessage = function(event) {
			document.getElementById("miningStatus").innerHTML = event.data;
		};
		w.postMessage(_address);
	}
}

function stopMining() {
	w.terminate();
	document.getElementById("miningStatus").innerHTML = "stopped";
	minerActive = false;
}