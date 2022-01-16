async function addToMetamask() {
	if (typeof window.ethereum !== "undefined") {
		await ethereum.request({ method: 'wallet_addEthereumChain', params: [{chainId: '0x138d',chainName: 'SiriCoin',nativeCurrency:{name: 'SiriCoin',symbol: 'SC',decimals: 18},rpcUrls: ['https://siricoin-node-1.dynamic-dns.net/'],blockExplorerUrls :null,}]})
	}
}