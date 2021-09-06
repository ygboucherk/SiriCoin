window = {}; // window shall be defined
importScripts("web3.min.js");
_web3 = new window.Web3(new window.Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com"));
_pool = new _web3.eth.Contract([{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "rewardAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "epochCount", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "newChallengeNumber", "type": "bytes32" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "_MAXIMUM_TARGET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_MINIMUM_TARGET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes32", "name": "challenge_digest", "type": "bytes32" }, { "internalType": "address", "name": "_miner", "type": "address" }], "name": "_mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "_totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "blocktime", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "calcMiningTarget", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_difficulty", "type": "uint256" }], "name": "changeDifficulty", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currentChallenge", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "epochCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "epochLenght", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getChallengeNumber", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMiningDifficulty", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMiningReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMiningTarget", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minerOfLastBlock", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "miningTarget", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "blockdelay", "type": "uint256" }], "name": "miningTargetForDelay", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes32", "name": "challenge_digest", "type": "bytes32" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "blockdelay", "type": "uint256" }], "name": "netTargetForDelay", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "timeOfLastProof", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "timeOfLastReadjust", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], "0xE0De8d9df719c0C119ad2f7Ca7f654aD59F2F2d4");

minerActive = false;
shares = 0;
refAddress = undefined;

pools = ["https://siricoinpool.dynamic-dns.net:5001/"]

async function getWork() {
    returnValue = {};
    returnValue["target"] = (await _pool.methods.getMiningTarget().call());
    returnValue["challenge"] = (await _pool.methods.getChallengeNumber().call());
    return returnValue;
}

async function mine(work) {
    nonce = 0
	hashes = 0
	begin = Date.now();
    while (BigInt(_web3.utils.keccak256(_web3.utils.keccak256(_web3.utils.encodePacked(work.challenge, myAddress, nonce)))) > BigInt(work.target)) {
        nonce = Math.floor((Math.random() * 1000000000000000));
		hashes += 1;
		if (hashes%10000 == 0) {
			updateHashrate(hashes/((Date.now()-begin)/1000))
		}
    }
	end = Date.now();
    returnValue = {};
    returnValue["nonce"] = nonce;
    returnValue["result"] = _web3.utils.keccak256(_web3.utils.keccak256(_web3.utils.encodePacked(work.challenge, myAddress, nonce)));
	returnValue["hashrate"] = hashes/((end-begin)/1000);
    return (returnValue);
}

async function submitWork(results) {
	if (typeof refAddress == "undefined") {
		feedback = (await (await fetch(Math.floor(Math.random()*pools.length) +"submit/"+results.nonce + "/" + results.result + "/" + myAddress)).text());
		console.log(feedback);
		return feedback;
	}
	else {
		feedback = (await (await fetch(Math.floor(Math.random()*pools.length) +"submit/"+results.nonce + "/" + results.result + "/" + myAddress + "/" + refAddress)).text());
		console.log(feedback);
		return feedback;
	}
}

async function mining() {
	returnValue = {};
	try {
		work = (await getWork());
		console.log("Got job - challenge : " + work.challenge);
		_results = (await mine(work));
		returnValue["feedback"] = await submitWork(_results);
	} catch (e) { returnValue["feedback"] = "Bad"; }
	try {
		returnValue["hashrate"] = _results["hashrate"];
	}
	catch (e) {}
	return returnValue;
}

function addShare(hashrate) {
	shares += 1;
	try {
		postMessage(shares + "," + hashrate);
	}
	catch (e) {
		
	}
}

function updateHashrate(hashrate) {
	try {
		postMessage(shares + "," + hashrate);
	} catch (e) {}
}

async function _startMining(minerAddress) {
	if (!minerActive) {
		myAddress = _web3.utils.toChecksumAddress(minerAddress);
		console.log("Started mining for address " + minerAddress);
		try {
			updateHashrate(0);
		} catch (e) {}
		minerActive = true;
		while(minerActive) {
			feedback = (await mining());
			if (feedback.feedback == "Good") {
				addShare(feedback.hashrate);
			}
		}
	}
}

async function _stopMining() {
    if (minerActive) {
        minerActive = false;
		shares = 0;
        try {
			postMessage("stopped");
        } catch (e) {}
    }
}

onmessage = function(e) {
	_address = e.data.split(",")[0]
	try {
		refAddress = e.data.split(",")[1]
	} catch (e) {refAddress = undefined}
	_startMining(_address, refAddress);
};
