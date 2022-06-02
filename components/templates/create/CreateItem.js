import React, { Component, Fragment } from 'react';
import Image from 'next/image';
import uploadFileS3 from '../../../helpers/s3'
import { createFile, readJson } from '../../../helpers/create-file'
import Web3 from 'web3'
import { 
	Button, 
	ButtonCircle, 
	TextField, 
	TextArea, 
	InputFile, 
	Card,
	CircleProgressBar,
	ModalCustom,
	ProgressBar,
} from '../../elements';
import { 
	AlertDialog, 
	AttributeList,
} from '../../modules';
import { 
	FormAddProperties,
	FormAddLevels,
	FormAddStats,
	FormAddBoosts,
	CardProperties,
	BarLevels,
	ListStats,
	CardBoosts,
} from '../../sections';
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
import attributesJson from '../../../dummy/attribute-list.json';
import imgInputFile from '../../../public/images/input-file.svg';
import iconDocument from '../../../public/icons/icon-document.svg';
import iconStar from '../../../public/icons/icon-star.svg';
import iconGraph from '../../../public/icons/icon-graph.svg';
import iconChart from '../../../public/icons/icon-chart.svg';
import iconPlusDark from '../../../public/icons/icon-plus-dark.svg';

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
			jsonFile: null,
			useJsonFormat: false,
			attributesJson: [],
			propertiesModal: false,
			levelsModal: false,
			statsModal: false,
			boostsModal: false,
		}

		this._onChangeFile = this._onChangeFile.bind(this)
		this._onClickUploadJson = this._onClickUploadJson.bind(this)
		this._onRemoveFile = this._onRemoveFile.bind(this)
		this._onChangeInput = this._onChangeInput.bind(this)
		this._onChangeConfrimText = this._onChangeConfrimText.bind(this)
		this._onClickAction = this._onClickAction.bind(this)
		this._onClickEditForm = this._onClickEditForm.bind(this)
		this._onClickMint = this._onClickMint.bind(this)
		this._onConfirmDelete = this._onConfirmDelete.bind(this)
		this._onCopyClipboard = this._onCopyClipboard.bind(this)
		this._onAddProperty = this._onAddProperty.bind(this)
		this._onShowTextarea = this._onShowTextarea.bind(this)
		this._onShowModal = this._onShowModal.bind(this)
		this._onClickSaveMetadata = this._onClickSaveMetadata.bind(this)
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


	_onCopyClipboard() {
		const { _showMessage } = this.props
		const { item } = this.state
		const { name } = item
	   	/* Get the text field */
	    const valueText = name;
	    /* Copy the text inside the text field */
	    navigator.clipboard.writeText(valueText);
	    _showMessage({
			icon: 'success',
            title: 'Copied!',
            description: 'Item name is copied'
		})
	}


	_onAddProperty(value) {
		console.log(value)
	}


	_onShowTextarea() {
		this.setState(prevState => ({
			useJsonFormat: !prevState.useJsonFormat
		}))
	}


	_onShowModal(value) {
		this.setState(prevState => ({
			[value]: !prevState[value]
		}))
	}


	_onClickSaveMetadata(value) {
		console.log(value)
		this.setState(prevState => ({
			item: {
				...prevState.item, 
				metadata: JSON.stringify(value, null, "\t")
			},
			propertiesModal: false,
			levelsModal: false,
			statsModal: false,
			boostsModal: false,
		}))
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


	// Upload json file
	async _onClickUploadJson(e) {
		const { files } = e.target
		const file = files[0]
		const item = await readJson(file)
		const { attributes } = item
		this.setState({
			item: {
				...item, 
				metadata: JSON.stringify(attributes, null, "\t")
			}
		})
	}


	_changeIsEdit() {
		const { id } = this.props
		const isEdit = id === null ? false : true;
		this.setState({isEdit})
	}


	// render Component
	_renderButtonUploadJson(id, onUploadJson) {
		return (
			<>
				{
    				!id &&
        			<div className="d-flex justify-content-end mb-4">
        			  	<label htmlFor="json-file" className="btn btn-primary">Upload .json</label>
        			  	<input 
        			  		type="file" 
        			  		id="json-file" 
        			  		className="form-control d-none"
        			  		onChange={onUploadJson}
        			  	/>
        			</div>
				}
			</>
		)
	}


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


	_renderTextFieldName(item, isEdit, id, onChange, onCopyText) {
		return (
			<div className="row mb-5">
			    <div className="col-lg-8 col-md-12">
			    	<div className="d-flex align-items-end">
			    	  	<div className="flex-fill">
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
		    	  		{
		    	  			id && !item.minted &&
				    	  	<div className="flex-fill">
				    	  			<Button 
				    	  				type="button"
				    	  				theme="dark ms-2"
				    	  				label="Copy"
				    	  				onClick={onCopyText}
				    	  			/>
				    	  	</div>
		    	  		}
			    	</div>
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

	
	_renderTextAreaMetadata(item, isEdit, onChange, onShow) {
		const label = (
			<div className="d-flex">
				<span className="me-2">Metadata -</span>
				<span className="me-2">Use form wizard.</span>
				<span className="text-primary text-decoration-underline cursor-pointer" onClick={onShow}>Click here</span>
			</div>
		)

		return (
			<div className="row mb-5">
			    <div className="colg-lg-8 col-md-12">
			        <TextArea 
			            id="metadata"
			            name="metadata"
			            label={label}
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


	_renderModalCustom(show, title, description, type, data, onShowModal, onSave) {
		return (
			<>
				{
					show &&
					<ModalCustom 
						title={title}
						description={description}
						onClose={onShowModal} 
						show
					>
					  	<FormAddProperties 
					  		data={data.metadata ? JSON.parse(data.metadata) : []} 
					  		onSave={onSave}
					  	/>
					</ModalCustom>
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

		const icons = [
			iconDocument, 
			iconStar, 
			iconChart, 
			iconGraph
		]
		this.setState(prevState => ({
			attributesJson: attributesJson.map((item, index) => ({
				...item,
				icon: icons[index]
			}))
		}))
	}


	componentDidUpdate(prevProps, prevState) {
		const { id } = this.props
		const { item } = this.state
		
		if (prevProps.id !== id && id === null) {
			this.setState({
				isEdit: false,
				item: initialItem,
			})
		}

		if (prevState.item !== item) {
			// const metadata = JSON.parse(item.metadata)
			// const _filter = metadata.filter(row => (
			// 	row.display_type === 'number'
			// ))
			// console.log(metadata)
			// console.log(_filter)
		}

		// console.log(this.state.jsonFile)
		// console.log(this.state.propertiesModal)
	}


	render() {
		
		const { 
			item, 
			isEdit, 
			confirmText, 
			jsonFile, 
			useJsonFormat, 
			attributesJson, 
			propertiesModal, 
			levelsModal, 
			statsModal, 
			boostsModal, 
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
			_onClickUploadJson, 
			_onRemoveFile, 
			_onChangeInput, 
			_onChangeConfrimText, 
			_onClickAction, 
			_onClickEditForm, 
			_onClickMint, 
			_onConfirmDelete, 
			_onCopyClipboard, 
			_onAddProperty, 
			_onShowTextarea, 
			_onShowModal, 
			_onClickSaveMetadata, 
			_renderButtonUploadJson,  
			_renderInputFile,  
			_renderTextFieldName,  
			_renderTextAreaDescription,  
			_renderTextAreaMetadata,  
			_renderAlert,  
			_renderFormDelete,  
			_renderMessageAlert,  
		} = this

		return (
			<div className="container">
	            <h1 className="mb-4">
	            	{id ? 'Edit Item' : 'Create New Item'}
	            </h1>
	            <div className="row mb-4">
	                <div className="col-lg-8 col-md-12 col-sm-12">
	                	<Card>
	                		<form className="mb-4">
	                			{_renderButtonUploadJson(id, _onClickUploadJson)}
	                			{_renderInputFile(item, isEdit, _onChangeFile, _onRemoveFile)}
	                			{_renderTextFieldName(item, isEdit, id, _onChangeInput, _onCopyClipboard)}
	                			{_renderTextAreaDescription(item, isEdit, _onChangeInput)}
	                			{
	                				useJsonFormat ?
	                				_renderTextAreaMetadata(item, isEdit, _onChangeInput, _onShowTextarea) :
		                			<div className="row mb-5">
										<div className="col-md-12">
											<label className="form-label">
												<div className="d-flex">
													<span className="me-2">Metadata -</span>
													<span className="me-2">Use json format.</span>
													<span className="text-primary text-decoration-underline cursor-pointer" onClick={_onShowTextarea}>Click here</span>
												</div>
											</label>
											<AttributeList 
												theme={`mb-3`}
												icon={attributesJson[0]?.icon}
												title={attributesJson[0]?.title}
												description={attributesJson[0]?.description}
												onClick={() => _onShowModal(`propertiesModal`)}
												disabled={isEdit}
											>
												<CardProperties data={item.metadata ? JSON.parse(item.metadata) : []} />
											</AttributeList>
											<AttributeList 
												theme={`mb-3`}
												icon={attributesJson[1]?.icon}
												title={attributesJson[1]?.title}
												description={attributesJson[1]?.description}
												onClick={() => _onShowModal(`levelsModal`)}
												disabled={isEdit}
											>
												<BarLevels data={item.metadata ? JSON.parse(item.metadata) : []}/>
											</AttributeList>
											<AttributeList 
												theme={`mb-3`}
												icon={attributesJson[2]?.icon}
												title={attributesJson[2]?.title}
												description={attributesJson[2]?.description}
												onClick={() => _onShowModal(`statsModal`)}
												disabled={isEdit}
											>
												<ListStats data={item.metadata ? JSON.parse(item.metadata) : []}/>
											</AttributeList>
											<AttributeList 
												icon={attributesJson[3]?.icon}
												title={attributesJson[3]?.title}
												description={attributesJson[3]?.description}
												onClick={() => _onShowModal(`boostsModal`)}
												disabled={isEdit}
											>
												<CardBoosts data={item.metadata ? JSON.parse(item.metadata) : []} />
											</AttributeList>
										</div>
										{
											propertiesModal &&
											<ModalCustom 
												title="Add Property" 
												description="Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
												onClose={() => _onShowModal('propertiesModal')} 
												show
											>
											  	<FormAddProperties 
											  		data={item.metadata ? JSON.parse(item.metadata) : []} 
											  		onSave={_onClickSaveMetadata}
											  	/>
											</ModalCustom>
										}
										{
											levelsModal &&
											<ModalCustom 
												title="Add Levels" 
												description="Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
												onClose={() => _onShowModal('levelsModal')} 
												show
											>
											  	<FormAddLevels 
											  		data={item.metadata ? JSON.parse(item.metadata) : []} 
											  		onSave={_onClickSaveMetadata}
											  	/>
											</ModalCustom>
										}
										{
											statsModal &&
											<ModalCustom 
												title="Add Stats" 
												description="Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
												onClose={() => _onShowModal('statsModal')} 
												show
											>
											  	<FormAddStats 
											  		data={item.metadata ? JSON.parse(item.metadata): []} 
											  		onSave={_onClickSaveMetadata}
											  	/>
											</ModalCustom>
										}
										{
											boostsModal &&
											<ModalCustom 
												title="Add Boosts" 
												description="Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
												onClose={() => _onShowModal('boostsModal')} 
												show
											>
											  	<FormAddBoosts 
											  		data={item.metadata ? JSON.parse(item.metadata): []} 
											  		onSave={_onClickSaveMetadata}
											  	/>
											</ModalCustom>
										}
									</div>
	                			}
	                			{
    			    				id === null || !isEdit ?
    			    				<Button 
    			    					type="submit"
    			    					label="Save"
    			    					theme="primary rounded-pill px-5 me-2"
    			    					isLoading={isLoadingSave}
    			    					onClick={_onClickAction}
    			    				/> :
    			    				<>
    			    					<Button 
    			    						type="button"
    			    						label="Edit"
    			    						theme="primary rounded-pill px-5 me-2"
    			    						onClick={_onClickEditForm}
    			    					/>
    			    					{
    			    						!item.minted && 
    			    						<Button 
    			    							type="button"
    			    							label="Mint"
    			    							theme="outline-secondary rounded-pill px-5 me-2"
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