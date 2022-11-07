import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal, {getInjectedProvider} from 'web3modal';
import {ethers} from "ethers";

let _walletConnectProvider;
let _web3Provider;
let _signer;
let walletType;

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            appName: "CyberCommerce", // Required
            infuraId: 'ba5de5dc817d43ccb4df0572af299ad8',//以太坊连接必填
        },
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "CyberCommerce", // Required
            infuraId: "ba5de5dc817d43ccb4df0572af299ad8", // Required
            //chainId: 4,
        }
    }
};

const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
});

export async function connectToWallet(method) {
    walletType = method;
    if (method === "metamask"){
        let injectedProvider =  getInjectedProvider();
        if (injectedProvider.name === "MetaMask"){
            _walletConnectProvider = await web3Modal.connectTo(injectedProvider.id)
        }
    } else if (method === "walletconnect"){
        _walletConnectProvider = await web3Modal.connectTo('walletconnect')
        //isConnected  _walletConnectProvider.connected
    } else if (method === "coinbase"){
        _walletConnectProvider = await web3Modal.connectTo('coinbasewallet')
    }

    if (_walletConnectProvider){
        _web3Provider = new ethers.providers.Web3Provider(_walletConnectProvider, "any");
        _signer = _web3Provider.getSigner();
    }
}

export function getWeb3Provider() {
    if (!_web3Provider) {
        throw Error("Wallet Provider is not set.")
    }
    return _web3Provider;
}

export async function getSigner() {
    if (!_signer) {
        throw Error("Wallet Signer is not set.")
    }
    return _signer;
}

export async function getWalletAddress() {
    if (_signer) {
        return await _signer.getAddress()
    } else {
        throw Error("Wallet is not connected.");
    }
}

export function disconnect() {
    if (walletType && walletType !=="metamask" &&_walletConnectProvider) {
        _walletConnectProvider.close();
    }
    if (web3Modal) {
        web3Modal.clearCachedProvider();
    }
    _walletConnectProvider = null;
}

export async function isMetaMaskConnected() {
    if (window.ethereum) {
        let accounts = window.ethereum.selectedAddress || window.ethereum.address;
        let isConnected = window.ethereum.isConnected();
        return (accounts && accounts.length && isConnected);
    } else {
        console.log("Ethereum not found.");
        return false;
    }
}

export function isMetaMaskInstalled() {
    if (window.ethereum !== undefined && window.ethereum !== null && window.ethereum.isMetaMask) {
        console.log("window.ethereum","MetaMask is installed")
        return true
    } else {
        console.log("window.ethereum","MetaMask not installed")
        return false;
    }
}

export function createContract(contractAddress, contractABI) {
    if (_signer) {
        return new ethers.Contract(contractAddress, contractABI, _signer);
    }
}

export async function setAccountsChangedCallback(callback) {
    // window.ethereum.on('accountsChanged', callback);
    // Subscribe to accounts change
    _walletConnectProvider.on("accountsChanged", (accounts) => {
        callback(accounts)
    });
}

export async function setDisconnectFromChainCallback(callback) {
    window.ethereum.on('disconnect', callback);
    // Subscribe to session disconnection
    _walletConnectProvider.on("disconnect", async (code, reason) => {
        callback(code, reason)
        await _walletConnectProvider.close();
        await web3Modal.clearCachedProvider();
        // _signer = null
        // _web3Provider = null;
        // _walletConnectProvider = null;
    });
}

export async function onChainChangedCallback(callback) {
    // if (_web3Provider) {
    //     _web3Provider.on("network", (newNetwork, oldNetwork) => {
    //         // When a Provider makes its initial connection, it emits a "network"
    //         // event with a null oldNetwork along with the newNetwork. So, if the
    //         // oldNetwork exists, it represents a changing network
    //         // Mainnet : 1
    //         // Ropsten : 3
    //         // Rinkeby : 4
    //         if (oldNetwork) {
    //             // window.location.reload();
    //             callback(newNetwork.chainId)
    //         }
    //     });
    // }

    // Subscribe to chainId change
    _walletConnectProvider.on("chainChanged", (chainId) => {
        callback(chainId)
    });
}

