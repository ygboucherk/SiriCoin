minerActive = false;

function startMining(_address) {
	if (!minerActive) {
		w = new Worker("miningWorker.js");
		w.onmessage = function(event) {
			document.getElementById("result").innerHTML = event.data;
		};
		w.postMessage(_address);
	}
}

function stopMining() {
	w.terminate();
	document.getElementById("result").innerHTML = "stopped";
	minerActive = false;
}