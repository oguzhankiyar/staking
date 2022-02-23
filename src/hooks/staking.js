import React, { createContext, useState, useEffect, useMemo } from 'react'
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import { contractAddress, chainConfig } from '../constants/config';
import ABI from '../constants/abi';

export const StakingContext = createContext(null);

export const StakingProvider = ({ children }) => {
	const [isConnected, setIsConnected] = useState(false);
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(0);
	const [staked, setStaked] = useState(0);
	const [supply, setSupply] = useState(0);
	const [rate, setRate] = useState(0);

	const web3 = new Web3(Web3.givenProvider);
	const contract = new web3.eth.Contract(ABI, contractAddress);
	const decimal = BigNumber('1000000000000000000');

	const check = async () => {
		const { ethereum } = window;
		if (!ethereum) {
			return false;
		}

		try {
			await ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainConfig.chainId }],
			});
			return true;
		} catch (switchError) {
			if (switchError.code === 4902) {
				try {
					await ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [chainConfig],
					});
					return true;
				} catch { }
			}
		}

		return false;
	};

	const connect = async () => {
		const ok = await check();
		if (!ok) {
			setIsConnected(false);
			setAccount(null);
			return;
		}

		const accounts = await web3.eth.requestAccounts();
		if (accounts && accounts.length > 0) {
			setIsConnected(true);
			setAccount(accounts[0]);
		} else {
			setIsConnected(false);
			setAccount(null);
		}
	};

	const disconnect = () => {
		setIsConnected(false);
		setAccount(null);
	};

	const stake = async (amount) => {
		await check();

		try {
			const staked = await contract.methods.balanceOf(account).call()
			await contract.methods.deposit().send({
				from: account,
				value: BigNumber(amount).multipliedBy(decimal).toFixed()
			});

			while ((await contract.methods.balanceOf(account).call()) === staked) {
				await new Promise(resolve => setTimeout(resolve, 1000));
			}

			updateBalance();
			updateStaked();
			updateSupply();

			return true;
		} catch {
			return false;
		}
	};

	const unstake = async (amount) => {
		try {
			const staked = await contract.methods.balanceOf(account).call()
			await contract.methods.withdraw(BigNumber(amount).multipliedBy(decimal).toFixed()).send({
				from: account
			})

			while ((await contract.methods.balanceOf(account).call()) === staked) {
				await new Promise(resolve => setTimeout(resolve, 1000));
			}

			updateBalance();
			updateStaked();
			updateSupply();

			return true;
		} catch {
			return false;
		}
	};

	const updateBalance = async () => {
		if (!account) {
			setBalance(0);
			return;
		}

		const balanceResult = await web3.eth.getBalance(account);
		setBalance(BigNumber(balanceResult) / decimal);
	};

	const updateStaked = async () => {
		if (!account) {
			setStaked(0);
			return;
		}

		const stakedResult = await contract.methods.balanceOf(account).call();
		setStaked(BigNumber(stakedResult) / decimal);
	};

	const updateSupply = async () => {
		if (!contractAddress || !web3.givenProvider) {
			setSupply(0);
			setRate(0);
			return;
		}

		const supplyResult = await contract.methods.totalSupply().call();
		const rateResult = BigNumber(2207520000) * decimal / BigNumber(supplyResult);

		setSupply(BigNumber(supplyResult) / decimal);
		setRate(rateResult);
	};

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, []);

	useEffect(() => {
		updateBalance();
		updateStaked();
		updateSupply();
	}, [account]);

	const values = useMemo(
		() => {
			return {
				check,
				connect,
				disconnect,
				stake,
				unstake,
				isConnected,
				account,
				balance,
				staked,
				supply,
				rate
			};
		}, [isConnected, account, balance, staked, supply, rate]);

	return <StakingContext.Provider value={values}>{children}</StakingContext.Provider>
}

export function useStaking() {
	const context = React.useContext(StakingContext);

	if (context === undefined) {
		throw new Error('useStaking hook must be used with a StakingProvider component');
	}

	return context;
}
