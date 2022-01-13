window = {}; // window shall be defined
importScripts("web3.min.js");
_web3 = new window.Web3(new window.Web3.providers.HttpProvider("https://speedy-nodes-nyc.moralis.io/81032463e5542d5ab0c32849/polygon/mainnet"));

minerActive = false;
shares = 0;









// pools = ["https://siricoinpool.dynamic-dns.net:5001/"] 






class Wallet {
	constructor(web3Instance) {
		this.web3Instance = web3Instance;
		this.miningAccount = web3.eth.accounts.privateKeyToAccount(web3.utils.soliditySha3((Math.random()*10**17).toFixed()));
	}
	
	convertFromHex(hex) {
		var hex = hex.toString();//force conversion
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}

	convertToHex(str) {
		var hex = '';
		for(var i=0;i<str.length;i++) {
			hex += ''+str.charCodeAt(i).toString(16);
		}
		return hex;
	}
	
	async getAccountInfo(account) {
		return (await (await fetch(`http://136.244.119.124:5005/accounts/accountInfo/${account}`)).json()).result;
	}

	async getHeadTx(account) {
		let accountInfo = (await getAccountInfo(account));
		return accountInfo.transactions[accountInfo.transactions.length-1];
	}

	async buildTransaction(to, tokens) {
		const account = (await this.web3Instance.eth.getAccounts())[0];
		const parent = (await getHeadTx(account));
		let data = {"from":account, "to":this.web3Instance.utils.toChecksumAddress(to), "tokens":tokens, "parent": parent, "type": 0};
		let strdata = JSON.stringify(data);
		const hash = this.web3Instance.utils.soliditySha3(strdata);
		const signature = await this.web3Instance.eth.personal.sign(strdata, account);
		const tx = {"data": data, "sig": signature, "hash": hash, "nodeSigs": {}};
		return this.convertToHex(JSON.stringify(tx));
	}
	
	async buildMiningTransaction(submittedBlock) {
		const account = (await this.web3Instance.eth.getAccounts())[0];
		const parent = (await getHeadTx(this.miningAccount.address));
		let data = {"from":this.miningAccount.address, "to":this.miningAccount.address, "tokens":0, "blockData": submittedBlock, "parent": parent, "type": 1};
		let strdata = JSON.stringify(data);
		const hash = this.web3Instance.utils.soliditySha3(strdata);
		const signature = await this.miningAccount.sign(strdata).signature;
		const tx = {"data": data, "sig": signature, "hash": hash, "nodeSigs": {}};
		return this.convertToHex(JSON.stringify(tx));
	}

	async sendTransaction(signedTx) {
		console.log(signedTx);
		return (await (await fetch(`http://136.244.119.124:5005/send/rawtransaction/?tx=${signedTx}`)).json()).result;
	}
	
	async getTransactionDetails(txid) {
		const result = (await (await fetch(`http://136.244.119.124:5005/get/transactions/{txid}`)).json()).result;
		if result.length > 0 {
			return result[0];
		}
		else {
			return false;
		}
	}
	
	getVrs(sig) {
		return (('0x' + sig.substring(2).substring(128, 130)), ('0x' + sig.substring(2).substring(0, 64)), ('0x' + sig.substring(2).substring(64, 128)))
	}
}

class Miner {
	constructor(node) {
		this.node = node;
		this.clock = (new Date());
		this.web3 = new Web3(window.ethereum);
		this.wallet = new Wallet(this.web3);
		this.accounts = window.ethereum.enable();
		// "localhost:5005"
	}
	
	convertToHex(str) {
		var hex = '';
		for(var i=0;i<str.length;i++) {
			hex += ''+str.charCodeAt(i).toString(16);
		}
		return hex;
	}
	
	getHashToMine(context) {
		let messagesHash = web3.utils.soliditySha3({"t": "bytes", "v": context.messages});
		return web3.utils.soliditySha3({"t": "bytes32", "v": context.parent}, {"t": "uint256", "v": context.timestamp}, {"t": "bytes32", "v": messagesHash}, {"t": "address", "v": context.miningData.miner});
		// target (uint256), parent (bytes32), timestamp (uint256)
	}

	async getLastBlockHash() {
		return (await (await fetch(`${this.node}/chain/getlastblock`)).json()).result.miningData.proof;
	}
	
	async getMiningInfo() {
		console.log(`${this.node}/chain/miningInfo`);
		return (await (await fetch(`${this.node}/chain/miningInfo`)).json()).result;
	}
	
	async mine() {
		const miningInfo = await this.getMiningInfo();
		let miningData = {"difficulty": miningInfo.difficulty, "miningTarget": miningInfo.target, "miner": (await this.web3.eth.getAccounts())[0], "nonce": (0).toFixed(), "proof": ""}
		let context = {"messages": this.convertToHex("null"), "target": miningInfo.target, "parent": miningInfo.lastBlockHash, "timestamp": (this.clock.getTime()/1000).toFixed(), "miningData": miningData}
		
		const hashToMine = this.getHashToMine(context);
		console.log(`Hash to mine with : ${hashToMine}`);
		let hash = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
		let nonce = 0;
		while (BigInt(hash) >= BigInt(miningInfo.target)) {
			nonce += 1;
			hash = this.web3.utils.soliditySha3({"t": "bytes32", "v": hashToMine}, {"t": "uint256", "v": nonce.toFixed()})
		}
		context.miningData.proof = hash;
		console.log(hash);
		console.log(miningInfo.target);
		context.miningData.nonce = nonce;
		return context;
	}
	
	async mineABlock() {
		await this.accounts; // mining only starts once metamask window loaded
		return (await this.wallet.sendTransaction(await this.wallet.buildMiningTransaction(await this.mine())));
	}
	
	async mineForever() {
		await this.accounts; // mining only starts once metamask window loaded
		while (true) {
			console.log(await this.wallet.sendTransaction(await this.wallet.buildMiningTransaction(await this.mine())));
		}
	}
}

async function getWork() {
    returnValue = {};
    returnValue["target"] = (await _pool.methods.getMiningTarget().call());
    returnValue["challenge"] = (await _pool.methods.getChallengeNumber().call());
    returnValue["difficulty"] = (await _pool.methods.getMiningDifficulty().call());
    return returnValue;
}

async function mine() {
    nonce = 0
	hashes = 0
	begin = Date.now();
	while (BigInt(hash) >= BigInt(miningInfo.target)) {
		nonce += 1;
		hash = this.web3.utils.soliditySha3({"t": "bytes32", "v": hashToMine}, {"t": "uint256", "v": nonce.toFixed()})
		if (nonce%10000 == 0) {
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
		feedback = (await (await fetch(pools[Math.floor(Math.random()*pools.length)] +"submit/"+results.nonce + "/" + results.result + "/" + myAddress)).text());
		console.log(feedback);
		return feedback;
	}
	else {
		feedback = (await (await fetch(pools[Math.floor(Math.random()*pools.length)] +"submit/"+results.nonce + "/" + results.result + "/" + myAddress + "/" + refAddress)).text());
		console.log(feedback);
		return feedback;
	}
}

async function mining() {
	returnValue = {};
	try {
		work = (await getWork());
		console.log(`Got job - challenge : ${work.challenge}, difficulty : ${work.difficulty}`);
		_results = (await mine(work));
		returnValue["feedback"] = await submitWork(_results);
	} catch (e) { returnValue["feedback"] = "Bad"; }
	try {
		returnValue["hashrate"] = _results["hashrate"];
	}
	catch (e) { console.error(e) }
	return returnValue;
}

miner = Miner("http://136.244.119.124:5005/")


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
			feedback = (await mineABlock())[0];
			if (await getTransactionDetails(feedback)) {
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
