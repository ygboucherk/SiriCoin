async function addToMetamask() {
	if (typeof window.ethereum !== "undefined") {
		await ethereum.request({ method: 'wallet_addEthereumChain', params: [{chainId: '0x89',chainName: 'Polygon',nativeCurrency:{name: 'Matic',symbol: 'Matic',decimals: 18},rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],blockExplorerUrls :['https://polygonscan.com/'],}]})
		await await ethereum.request({method: 'wallet_watchAsset',params: {type: 'ERC20',options: {address: "0x9eb1F7bc4875A09DfF51B1fb2f80f6B8E0b4EB81",symbol: "SC",decimals: 18,image: "https://sanjaysandy.github.io/SiriCoin/icons/logo.png",},},});
	}
}