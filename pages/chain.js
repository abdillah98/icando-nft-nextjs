import React, { Component, Fragment } from 'react';
import { ChainList } from '../components/templates'
import _chainList from '../dummy/chain.json'
import { 
	getSmartContractList,
	postSmartContract,
	putSmartContract,
	deleteSmartContract,
} from '../endpoint';

export default class Chain extends Component {

	constructor(props) {
		super(props)

		this.state = {
			chainList: _chainList,
			smartContractList: [],
			isLoadingSave: false,
			isLoadingDelete: false,
			message: null
		}

		this._getChainList = this._getChainList.bind(this)
		this._addChain = this._addChain.bind(this)
		this._updateChain = this._updateChain.bind(this)
		this._deleteChain = this._deleteChain.bind(this)
		this._emptyMessage = this._emptyMessage.bind(this)
	}

	async _getChainList() {
		const smartContractList = await getSmartContractList()
		this.setState({smartContractList})
	}

	async _addChain(newChain) {
		const { _getChainList } = this

		this.setState({isLoadingSave: true})

		const response = await postSmartContract(newChain);
		
		if (response.status) {
			await _getChainList()

            this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'success',
	                title: 'Successed!',
	                description: response.message
	            }
            })
		}
		else {
			this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'error',
    	        	title: 'Failed!',
	                description: response.message
	            }
            })
		}
	}

	async _updateChain(newChain) {
		const { _getChainList } = this
		const response = await putSmartContract(newChain);

		if (response.status) {
			await _getChainList()

            this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'success',
	                title: 'Successed!',
	                description: response.message
	            }
            })
		}
		else {
			this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'error',
    	        	title: 'Failed!',
	                description: response.message
	            }
            })
		}
	}

	async _deleteChain(id) {
		const { _getChainList } = this 
		const confirm = window.confirm('Are you sure to delete this contract address?')
		
		if (confirm) {
			
			const response = await deleteSmartContract(id);

			if (response) {
				
				_getChainList()

				this.setState({
	            	isLoadingDelete: false,
	            	message: {
		                icon: 'success',
	                    title: 'Successed!',
	                    description: 'Item delete successfully.'
		            }
	            })
			}
			else {
				this.setState({
                	isLoadingDelete: false,
	            	message: {
		                icon: 'error',
	                    title: 'Failed!',
	                    description: 'Already minted. cannot delete data!'
		            }
	            })
			}
		}
	}

	_emptyMessage() {
    	this.setState({message: null})
    }

	async componentDidMount() {
		const { _getChainList } = this
		await _getChainList()
	}

	componentDidUpdate() {
		console.log('componentDidUpdate')
		const { smartContractList } = this.state
		console.log(smartContractList)
	}

	render() {
		const { 
			chainList, 
			smartContractList,
			message,
			isLoadingSave, 
			isLoadingDelete, 
		} = this.state
		const {
			_addChain,
			_updateChain,
			_deleteChain,
			_emptyMessage,
		} = this

		return (
			<ChainList 
				chainList={chainList} 
				message={message}
				isLoadingSave={isLoadingSave}
				isLoadingDelete={isLoadingDelete}
				smartContractList={smartContractList} 
				_addChain={_addChain} 
				_updateChain={_updateChain} 
				_deleteChain={_deleteChain} 
				_emptyMessage={_emptyMessage} 
			/>
		)
	}
}