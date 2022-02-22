var prod = false;
var contractAddress = '0x81138641DB95430140dC0A991F8835B148A659e8';
var rpcURL = 'https://testnet-rpc.gochain.io';

if (window.location.href.includes('.gochain.io')) {
	prod = true;
	contractAddress = '0x27A963E69C65b7402DB24060390C01fB80F28bB4';
	rpcURL = 'https://rpc.gochain.io';
}

const testnetChainConfig = {
	chainId: '0x7A69',
	chainName: 'GoChain Testnet',
	nativeCurrency: {
		name: 'GO',
		symbol: 'GO',
		decimals: 18
	},
	rpcUrls: ['https://testnet-rpc.gochain.io'],
	blockExplorerUrls: ['https://testnet-explorer.gochain.io']
};

const mainnetChainConfig = {
	chainId: '0x3C',
	chainName: 'GoChain',
	nativeCurrency: {
		name: 'GO',
		symbol: 'GO',
		decimals: 18
	},
	rpcUrls: ['https://rpc.gochain.io'],
	blockExplorerUrls: ['https://explorer.gochain.io']
};

var chainConfig = testnetChainConfig;
if (prod) {
	chainConfig = mainnetChainConfig;
}

export { prod, contractAddress, rpcURL, chainConfig };
