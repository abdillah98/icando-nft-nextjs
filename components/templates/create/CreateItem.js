import React, { Component, Fragment } from 'react';
import Image from 'next/image';
import uploadFileS3 from '../../../helpers/s3'
import createFile from '../../../helpers/create-file'
import Web3 from 'web3'
import { 
	Button, 
	TextField, 
	TextArea, 
	InputFile, 
	Card 
} from '../../elements';
import { AlertDialog } from '../../modules';
import { 
	getItemList, 
	getItem, 
	postItem, 
	putItem, 
	deleteItem, 
	postImage, 
	postJsonFile, 
	mintItems 
} from '../../../endpoint'
import { 
	contractABI2, 
	contractAddress2 
} from '../../../contracts'
import imgInputFile from '../../../public/images/input-file.svg';

const initialItem = {
    id: null,
    name: '',
    description: '',
    image: null,
    image_url: '',
    metadata: '',
    metadata_url: '',
}

export default class CreateItem extends Component {

	constructor(props) {
		super(props)

		this.state = {
			item: initialItem,
			isEdit: false,
			confirmText: '',
		}

		this._onChangeFile = this._onChangeFile.bind(this)
		this._onRemoveFile = this._onRemoveFile.bind(this)
		this._onChangeInput = this._onChangeInput.bind(this)
		this._onChangeConfrimText = this._onChangeConfrimText.bind(this)
		this._onClickAction = this._onClickAction.bind(this)
		this._onClickEditForm = this._onClickEditForm.bind(this)
		this._onClickMint = this._onClickMint.bind(this)
		this._onConfirmDelete = this._onConfirmDelete.bind(this)
		this._changeIsEdit = this._changeIsEdit.bind(this)
	}


	// On Change Input file
	_onChangeFile(e) {
		const { files } = e.target
		this.setState(prevState => ({
			item: {
				...prevState.item, 
				image: files[0]
			}
		}))
	}


	// On Remove Input file
	_onRemoveFile() {
		this.setState(prevState => ({
			item: {
				...prevState.item, 
				image: null
			}
		}))
	}


	// On Change Input form
	_onChangeInput(e) {
		const { name, value } = e.target
		this.setState(prevState => ({
			item: {
				...prevState.item, 
				[name]: value
			}
		}))
	}


	// On Change Input confirmText
	_onChangeConfrimText(e) {
		const { value } = e.target
		this.setState({confirmText: value})
	}


	_onClickEditForm() {
		console.log('_onClickEditForm')
		this.setState({isEdit: false})
	}


	async _onClickAction(e) {
		e.preventDefault()
		
		const { item} = this.state
		const { id, _addItem, _updateItem} = this.props

		if (id) {
			await _updateItem(item);
			this.setState({isEdit: true})
		}
		else {
			await _addItem(item);
		}
	}


	async _onClickMint() {
		const { item } = this.state
		const { _mintItems  } = this.props

		await _mintItems(item)
	}


	async _onConfirmDelete(e) {
		e.preventDefault()

		const { id, _deleteItem, _showMessage } = this.props
		const { item, confirmText } = this.state

		if (item.name === confirmText) {
			await _deleteItem(id)
		}
		else {
			_showMessage({
				icon: 'error',
                title: 'Failed!',
                description: 'Item name does not match.'
			})
		}
	}


	_changeIsEdit() {
		const { id } = this.props
		const isEdit = id === null ? false : true;
		this.setState({isEdit})
	}


	// render Component
	_renderInputFile(item, isEdit, onChange, removeFile) {
		return (
			<div className="row mb-5">
				<div className="col-lg-8 col-md-12">
					<InputFile
					    label="Image"
					    id="image"
					    name="image"
					    value={item.image}
					    onChange={onChange}
					    removeFile={removeFile}
					    useRemove={!item.minted}
					    disabled={isEdit}
					    required
					/>
				</div>
			</div>
		)
	}


	_renderTextFieldName(item, isEdit, onChange) {
		return (
			<div className="row mb-5">
			    <div className="col-lg-8 col-md-12">
			        <TextField 
			            id="name"
			            type="text"
			            name="name"
			            label="Name"
			            placeholder="Cute nft #01..."
			            value={item.name}
			            onChange={onChange}
			            disabled={isEdit}
			            required
			        />
			    </div>
			</div>
		)
	}


	_renderTextAreaDescription(item, isEdit, onChange) {
		return (
			<div className="row mb-5">
			    <div className="colg-lg-12 col-md-12">
			       <TextArea 
			            id="description"
			            name="description"
			            label="Description"
			            placeholder="Type your thoughts"
			            value={item.description}
			            onChange={onChange}
			            disabled={isEdit}
			            rows={4}
			        />
			    </div>
			</div>
		)	
	}

	
	_renderTextAreaMetadata(item, isEdit, onChange) {
		return (
			<div className="row mb-5">
			    <div className="colg-lg-8 col-md-12">
			        <TextArea 
			             id="metadata"
			             name="metadata"
			             label="Metadata"
			             placeholder="{...}"
			             value={item.metadata}
			             onChange={onChange}
			             disabled={isEdit}
			             rows={10}
			         />
			    </div>
			</div>
		)
	}


	_renderButtonArea(item, id, isEdit, isLoadingSave, isLoadingMint, onAction, onEditForm, onMint) {
		return (
			<>
				{
    				id === null || !isEdit ?
    				<Button 
    					type="submit"
    					label="Save"
    					theme="primary"
    					isLoading={isLoadingSave}
    					onClick={onAction}
    				/> :
    				<>
    					<Button 
    						type="button"
    						label="Edit"
    						theme="primary"
    						onClick={onEditForm}
    					/>
    					{
    						!item.minted && 
    						<Button 
    							type="button"
    							label="Mint"
    							theme="outline-secondary"
    							isLoading={isLoadingMint}
    							onClick={onMint}
    						/>
    					}
    				</>
    			}
			</>
		)
	}


	_renderAlert(item) {
		return (
			<>
				{
					item.minted ?
					<div className="alert alert-primary border border-primary rounded-custom-sm p-3 mb-0">
					    <h4>Minted</h4>
					    <p className="my-0">This item already exists on the blockchain network</p>
					</div> :
					<div className="alert alert-warning border border-warning rounded-custom-sm p-3 mb-0">
					    <h4>Change data</h4>
					    <p className="my-0">Press the <code>Edit</code> to change the data on this form.</p>
					</div>
				}
			</>
		)
	}


	_renderFormDelete(item, id, confirmText, isLoading, onChange, onSubmit) {
		return (
			<>
				{
				    id && 
				    !item.minted &&
				    <div className="row mb-4">
				        <div className="col-lg-8 col-md-12 col-sm-12">
				            <Card>
				                <h4>Delete this item</h4>
				                <p>Once you delete an item, there is no going back. Please be certain.</p>
				                <form className="input-group" onSubmit={onSubmit}>
				                    <input 
				                        type="text" 
				                        className="form-control" 
				                        name="confirm" 
				                        placeholder="Please write the item name here..." 
				                        value={confirmText}
				                        onChange={onChange}
				                        required
				                    />
				                    <button 
				                        type="submit" 
				                        id="button-addon2"
				                        className="btn btn-outline-danger px-5" 
				                    >
				                        {isLoading ? 'Loading...' : 'Delete'}
				                    </button>
				                </form>
				            </Card>
				        </div>
				    </div>
				} 
			</>
		)
	}


	_renderMessageAlert(message, emptyMessage) {
		return (
			<>
				{
				    message &&
				    <AlertDialog 
				        message={message} 
				        closeAlert={emptyMessage}
				    />
				}
			</>
		)
	}


	async componentDidMount() {
		const { id, _getItem } = this.props
		const { _changeIsEdit } = this

		// Change isEdit
		_changeIsEdit()
		
		// Get item
		if (id) {
			const response = await _getItem()
			this.setState(prevState => ({
				item: {
					...response, 
					image: response.image_url
				}
			}))
		}
	}


	componentDidUpdate(prevProps, prevState) {
		const { id } = this.props
		
		if (prevProps.id !== id && id === null) {
			this.setState({
				isEdit: false,
				item: initialItem,
			})
		}
	}


	render() {
		
		const { 
			item, 
			isEdit, 
			confirmText 
		} = this.state
		const {
			id,
			message,
			isLoadingSave,
			isLoadingDelete,
			isLoadingMint,
			_emptyMessage,
		} = this.props
		const { 
			_onChangeFile, 
			_onRemoveFile, 
			_onChangeInput, 
			_onChangeConfrimText, 
			_onClickAction, 
			_onClickEditForm, 
			_onClickMint, 
			_onConfirmDelete, 
			_renderInputFile,  
			_renderTextFieldName,  
			_renderTextAreaDescription,  
			_renderTextAreaMetadata,  
			_renderButtonArea,  
			_renderAlert,  
			_renderFormDelete,  
			_renderMessageAlert,  
		} = this

		return (
			<div className="container">
	            <h1 className="mb-4">Create New Item</h1>
	            <div className="row mb-4">
	                <div className="col-lg-8 col-md-12 col-sm-12">
	                	<Card>
	                		<form className="mb-4">	
	                			{_renderInputFile(item, isEdit, _onChangeFile, _onRemoveFile)}
	                			{_renderTextFieldName(item, isEdit, _onChangeInput)}
	                			{_renderTextAreaDescription(item, isEdit, _onChangeInput)}
	                			{_renderTextAreaMetadata(item, isEdit, _onChangeInput)}
	                			{
    			    				id === null || !isEdit ?
    			    				<Button 
    			    					type="submit"
    			    					label="Save"
    			    					theme="primary"
    			    					isLoading={isLoadingSave}
    			    					onClick={_onClickAction}
    			    				/> :
    			    				<>
    			    					<Button 
    			    						type="button"
    			    						label="Edit"
    			    						theme="primary"
    			    						onClick={_onClickEditForm}
    			    					/>
    			    					{
    			    						!item.minted && 
    			    						<Button 
    			    							type="button"
    			    							label="Mint"
    			    							theme="outline-secondary"
    			    							isLoading={isLoadingMint}
    			    							onClick={_onClickMint}
    			    						/>
    			    					}
    			    				</>
    			    			}
	                		</form>
	                		{_renderAlert(item)}	
	                	</Card>	
	                </div>
	            </div>
	            {_renderFormDelete(item, id, confirmText, isLoadingDelete, _onChangeConfrimText, _onConfirmDelete)}      
	            {_renderMessageAlert(message, _emptyMessage)}
	       	</div>
		)
	}
}