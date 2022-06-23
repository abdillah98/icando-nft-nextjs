import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import Web3 from 'web3';
import { ItemLists } from '../components/templates';
import { 
	getItemList, 
	deleteItem, 
	putItem, 
	mintItems,
	getSmartContractList,
} from '../endpoint';
import UserContext from '../contexts/UserContext'
import imageDefault from '../public/images/image.png';

// Initial web3js
const web3 = new Web3(Web3.givenProvider)

export default class Items extends Component {
	static contextType = UserContext
	constructor(props) {
		super(props)

		this.state = {
			userRole: null,
			isLoading: false,
			message: null,
			isLoadingMint: false,
			isModal: false,
			itemLists: [],
			smartContractList: [],
		}

		this._getItemList = this._getItemList.bind(this)
		this._updateItems = this._updateItems.bind(this)
		this._mintItems = this._mintItems.bind(this)
		this._getContractList = this._getContractList.bind(this)
		this._emptyMessage = this._emptyMessage.bind(this)
		this._isOpenModal = this._isOpenModal.bind(this)
	}


	async _getItemList() {
		this.setState({isLoading: true});
		const itemLists = await getItemList();
		if (itemLists.length > 0) {
			this.setState({
				isLoading: false, 
				itemLists
			});
		}
	}


	async _updateItems(items) {
		await Promise.all(items.map( async (item) => 
			await putItem({...item, minted: true})
		));
	}

    // On Click Mint nft
    async _mintItems(items, options) {
    	const { _getItemList, _updateItems } = this;

        this.setState({isLoadingMint: true});

        //Interact with smart contract version 2
        const metadataUrl = items.map(item => item.metadata_url);
        const accounts = await web3.eth.getAccounts();
        const { contractAddress, contractABI } = options
        const mintOptions = {
            accounts,
            metadataUrl,
            contractAddress,
            contractABI
        }

        const mint = await mintItems(mintOptions);
        
        if (mint.status) {
            await _updateItems(items);
            Router.push('/collections');
        }
        else {
            this.setState({
            	isLoadingMint: false,
            	isModal: false,
            	message: {
	                icon: 'error',
	                title: 'Failed!',
	                description: mint.message
	            }
            });
        }
    }

    // Get contract list
    async _getContractList() {
        const smartContractList = await getSmartContractList()
        this.setState({smartContractList})
    }

    _isOpenModal() {
        this.setState(prevState => ({isModal: !prevState.isModal}))
    }

    _emptyMessage() {
    	this.setState({message: null});
    }


	async componentDidMount() {
		const userRole = this.context
		const { _getItemList, _getContractList } = this;

		this.setState({userRole})
		await _getItemList();
		await _getContractList();
	}


	componentDidUpdate() {
		console.log(this.state.itemLists)
	}


	render() {

		const { 
			userRole, 
			isLoading, 
			itemLists,
			message,
			smartContractList,
			isLoadingMint,
			isModal,
		} = this.state;
		const { 
			_mintItems,
			_emptyMessage,
			_isOpenModal 
		} = this;

 		return (
			<Fragment>
				<ItemLists 
					userRole={userRole}
					isLoading={isLoading}
					itemLists={itemLists}
					message={message}
					smartContractList={smartContractList}
					isLoadingMint={isLoadingMint}
					isModal={isModal}
					_mintItems={_mintItems}
					_emptyMessage={_emptyMessage}
					_isOpenModal={_isOpenModal}
				/>
			</Fragment>
		)
	}
}