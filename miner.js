minerActive = false;

w.onmessage = function(event) {
	document.getElementById("result").innerHTML = event.data;
};

function startMining(_address) {
	if (!minerActive) {
		w = new Worker("miningWorker.js");
		w.postMessage(_address);
	}
}

function stopMining() {
	w.terminate();
	document.getElementById("result").innerHTML = "stopped";
	minerActive = false;
}