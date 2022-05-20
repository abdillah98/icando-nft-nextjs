import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import Web3 from 'web3';
import { ItemLists } from '../components/templates';
import { 
	getItemList, 
	deleteItem, 
	putItem, 
	mintItems 
} from '../endpoint';

// Initial web3js
const web3 = new Web3(Web3.givenProvider)

export default class Items extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoading: false,
			message: null,
			isLoadingMint: false,
			itemLists: [],
		}

		this._getItemList = this._getItemList.bind(this)
		this._updateItems = this._updateItems.bind(this)
		this._mintItems = this._mintItems.bind(this)
		this._emptyMessage = this._emptyMessage.bind(this)
	}


	async _getItemList() {
		this.setState({isLoading: true});
		const itemLists = await getItemList();
		this.setState({isLoading: false, itemLists});
	}


	async _updateItems(items) {
		await Promise.all(items.map( async (item) => 
			await putItem({...item, minted: true})
		));
	}

    // On Click Mint nft
    async _mintItems(items) {
    	const { _getItemList, _updateItems } = this;

        this.setState({isLoadingMint: true});

        //Interact with smart contract version 2
        const metadataUrl = items.map(item => item.metadata_url);
        const accounts = await web3.eth.getAccounts();
        const mint = await mintItems(metadataUrl, accounts[0]);
        
        if (mint.status) {
            await _updateItems(items);
            Router.push('/collections');
            // this.setState({
            // 	isLoadingMint: false,
            // 	message: {
	           //      icon: 'success',
	           //      title: 'Editable',
	           //      description: mint.message
	           //  }
            // })
        }
        else {
            this.setState({
            	isLoadingMint: false,
            	message: {
	                icon: 'error',
	                title: 'Failed!',
	                description: mint.message
	            }
            });
        }
    }

    _emptyMessage() {
    	this.setState({message: null});
    }


	async componentDidMount() {
		const { _getItemList } = this;

		await _getItemList();
	}


	componentDidUpdate() {
		// console.log(this.state.itemLists)
	}


	render() {

		const { 
			isLoading, 
			itemLists,
			message,
			isLoadingMint,
		} = this.state;
		const { 
			_mintItems,
			_emptyMessage 
		} = this;

 		return (
			<Fragment>
				<ItemLists 
					isLoading={isLoading}
					itemLists={itemLists}
					message={message}
					isLoadingMint={isLoadingMint}
					_mintItems={_mintItems}
					_emptyMessage={_emptyMessage}
				/>
			</Fragment>
		)
	}
}