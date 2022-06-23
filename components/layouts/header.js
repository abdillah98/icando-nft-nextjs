import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Web3 from 'web3'
import { ModalCustom } from '../elements';
import iconPlus from '../../public/icons/icon-wallet.svg';
import iconCheck from '../../public/icons/icon-check.svg';

// const web3 = new Web3(provider)
const web3 = new Web3(Web3.givenProvider)

export default function Header() {
	const [isConnected, setIsConnecte] = useState(false)
	const [currentAccount, setCurrentAccount] = useState(null)
	const [isModal, setIsModal] = useState(false)

	const _detectProvider = () => {
		let provider;
		if (window.ethereum) {
			provider = window.ethereum
		}
		else if (window.web3) {
			provider = window.web3.currentProvider;
		}
		else {
			window.alert('No ethereum browser detected! Check Out Metamask')
		}

		return provider
	}

	const _getAccount = async () => {
		try {
			const accounts = await web3.eth.getAccounts()
			console.log('accounts')
			console.log(accounts)
			if (accounts.length === 0) {
				console.log('Please connect to Metamask')
			}
			if (accounts[0] !== currentAccount) {
				setCurrentAccount(accounts[0])
			}
		}
		catch(error) {
			console.log(error)
		}
	}
	
	const _onClickConnect = async () => {
		const provider = _detectProvider()
		
		if (provider) {
			if (provider !== window.ethereum) {
				console.error('Not window.ethereum provider. Do you have multiple wallets installed?')
			}

			setIsConnecte(true)
			await provider.request({
				method: 'eth_requestAccounts'
			})
			await _getAccount()
			setIsConnecte(false)

		}
	}

	const _onClickOpenContractList = () => {
		setIsModal(!isModal)
	}	

	const isMetaMaskInstalled = () => {
	    return Boolean(window.ethereum && window.ethereum.isMetaMask);
	}

	useEffect(() => {
		_getAccount()
	}, [])

	return (
		<>
			<header className="d-flex justify-content-end align-items-center p-3 mb-4">
				{
					currentAccount ? 
					<h6 className="me-2" title={currentAccount}>
						Accounts: {currentAccount.substring(0, 5)}...
					</h6> :
					<button 
						type="button" 
						className="btn btn-primary"
						// onClick={() => _onClickOpenContractList()}
						onClick={() => _onClickConnect()}
					>
						<div className="d-flex align-items-center">
							<Image src={iconPlus} alt="icon-wallet" />
							<span className="ms-2">
								{isConnected ? 'Loading...' : 'Connect wallet'}
							</span>
						</div>
					</button>
				}
			</header>
			<ModalCustom 
				title={`Select Contract`}
				theme="w-100"
				description={`Select contract address to connect the network.`}
				onClose={_onClickOpenContractList} 
				show={isModal}
			>
				<ul className="list-group rounded-custom-sm">
				  	<li className="list-group-item cursor-pointer d-flex flex-column align-items-start">
				  		<span className="fs-sm text-muted fs-9">ETHEREUM</span>
				  		<div className="d-flex justify-content-between align-items-center">
				  			<span className="me-2">0x345BC6db0d9E697507DC75A94bC207dfa0F19C64</span>
				  			<Image src={iconCheck} width={18} height={18} alt="icon-check" />
				  		</div>
				  		<span className="badge bg-primary text-white">Mainnet</span>
				  	</li>
				  	<li className="list-group-item cursor-pointer d-flex flex-column align-items-start">
				  		<span className="fs-sm text-muted fs-9">POLIGON</span>
				  		<div className="d-flex justify-content-between align-items-center">
				  			<span className="me-2">0x345BC6db0d9E697507DC75A94bC207dfa0F19C64</span>
				  			<Image src={iconCheck} width={18} height={18} alt="icon-check" />
				  		</div>
				  		<span className="badge bg-secondary text-white">Testnet</span>
				  	</li>
				</ul>
			</ModalCustom>
		</>
	)
}