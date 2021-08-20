w = new Worker("miner.js");

minerActive = false;

w.onmessage = function(event) {
	document.getElementById("result").innerHTML = event.data;
};

function startMining(_address) {
	if (!minerActive) {
		w = new Worker("miner.js");
		w.postMessage(_address);
	}
}

function stopMining() {
	w.terminate();
	document.getElementById("result").innerHTML = "stopped";
	minerActive = false;
}