import React, { Component, Fragment } from 'react';
import Router, { withRouter } from 'next/router'
import Web3 from 'web3'
import uploadFileS3 from '../helpers/s3'
import { createFile, createMetadata } from '../helpers/create-file'
import { CreateItem } from '../components/templates'
import { 
	getItemList, 
	getItem, 
	postItem, 
	putItem, 
	deleteItem, 
	postImage, 
	postJsonFile, 
	mintItems 
} from '../endpoint'

const web3 = new Web3(Web3.givenProvider)

export default class Index extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			message: null,
			confirmText: '',
			isLoadingSave: false,
			isLoadingDelete: false,
			isLoadingMint: false,
		}

		this._getItem = this._getItem.bind(this)
		this._addItem = this._addItem.bind(this)
		this._updateItem = this._updateItem.bind(this)
		this._deleteItem = this._deleteItem.bind(this)
		this._mintItems = this._mintItems.bind(this)
		this._emptyMessage = this._emptyMessage.bind(this)
		this._showMessage = this._showMessage.bind(this)
	}

	async _getItem() {
		const { id } = this.props

		if (id) {
	        const response = await getItem(id);
	        return response
		}
	}

	// Post add item
    async _addItem(item) {
        this.setState({isLoadingSave: true})
        const image_url = await postImage(item)
        const addItem = await postItem(item, image_url)
        
        // Response
        if (addItem.status) {
            const getItem = await getItemList();
            const jsonObject = {
                id: getItem[0].id,
                name: item.name,
                description: item.description,
                image: image_url,
                attributes: item.metadata.length > 0 
                	? JSON.parse(item.metadata) 
                	: item.metadata,
            }
            
            const metadataUrl = await createMetadata(jsonObject)

            await putItem({
                ...getItem[0], 
                image_url: image_url,
                metadata_url: metadataUrl,
            })

            this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'success',
	                title: 'Successed!',
	                description: addItem.message,
	                data: addItem.data
	            }
            })

            Router.push('/items')
        }
        else {
            this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'error',
	                title: 'Failed!',
	                description: addItem.message,
	                data: addItem.data
	            }
            })

        }
    }


    // Put edit item
    async _updateItem(item) {
    	const { _getItem } = this
    	const { id } = this.props

    	this.setState({isLoadingSave: true})
    	
    	const jsonObject = {
    	    id: item.id,
    	    name: item.name,
    	    description: item.description,
    	    image: item.image_url,
    	    attributes: item.metadata.length > 0 
            	? JSON.parse(item.metadata) 
            	: item.metadata,
    	}
    	const metadataUrl = await createMetadata(jsonObject)
    	const image_url = await postImage(item)
    	const updateItem = typeof item.image === 'string' 
    	    ? await putItem({...item, metadata_url: metadataUrl})
    	    : await putItem({...item, metadata_url: metadataUrl}, image_url)

    	// Response
    	if (updateItem.status) {
            this.setState({
            	isLoadingSave: false,
            	message: {
	                icon: 'success',
	                title: 'Successed!',
	                description: updateItem.message
	            }
            })
    	    await _getItem(id)
    	}
    	else {
            this.setState({
            	isLoadingSave: false,
            	message: {
	                 icon: 'error',
    	        	title: 'Failed!',
	                description: updateItem.message
	            }
            })
    	    await _getItem(id)
    	}
    }


    // Delete item
    async _deleteItem(id) {
        if (id) {
        	
        	this.setState({isLoadingDelete: true})

            const removeItem = await deleteItem(id)
            
            if (removeItem) {
	            this.setState({
	            	isLoadingDelete: false,
	            	message: {
		                icon: 'success',
	                    title: 'Successed!',
	                    description: 'Item delete successfully.'
		            }
	            })
                Router.push('/items')
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


    // On Click Mint nft
    async _mintItems(item) {
    	const { id } = this.props
    	const { _getItem } = this

        this.setState({isLoadingMint: true})
        
        //Interact with smart contract version 2
        const metadataUrl = [item.metadata_url];
        const accounts = await web3.eth.getAccounts()
        const mint = await mintItems(metadataUrl, accounts[0])
        
        if (mint.status) {
            await putItem({...item, minted: true})
            await _getItem(id)
            this.setState({
            	isLoadingMint: false,
            	message: {
	                icon: 'success',
	                title: 'Editable',
	                description: mint.message
	            }
            })
        }
        else {
            this.setState({
            	isLoadingMint: false,
            	message: {
	                icon: 'error',
	                title: 'Failed!',
	                description: mint.message
	            }
            })
        }
    }


    _emptyMessage() {
    	this.setState({message: null})
    }


    _showMessage(message) {
    	this.setState({
    		message: {...message}
    	})
    }


	componentDidMount() {
		// console.log(this.state.itemId)
		// this._getItem()
	}


	render() {
		const {
			message,
			isLoadingSave,
			isLoadingDelete,
			isLoadingMint,
		} = this.state
		const { id } = this.props
		const {
			_getItem,
			_addItem,
			_updateItem,
			_deleteItem,
			_mintItems,
			_emptyMessage,
			_showMessage,
		} = this
 
		return (
			<>
				<CreateItem 
					id={id}
					message={message}
					isLoadingSave={isLoadingSave}
					isLoadingDelete={isLoadingDelete}
					isLoadingMint={isLoadingMint}
					_getItem={_getItem}
					_addItem={_addItem}
					_updateItem={_updateItem}
					_deleteItem={_deleteItem}
					_mintItems={_mintItems}
					_emptyMessage={_emptyMessage}
					_showMessage={_showMessage}
				/>	
			</>
		)
	}
}

	// This gets called on every request
export async function getServerSideProps(context) {
	const id = context.query.id || null
  	// Pass data to the page via props
  	return { props: { id } }
}