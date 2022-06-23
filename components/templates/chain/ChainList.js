import React, { Component, Fragment } from 'react';
import Image from 'next/image';
import { 
	Button, 
	ButtonCircle, 
	TextField, 
	TextArea, 
	SelectOption, 
	Card,
	ModalCustom,
} from '../../elements';
import {
	AlertDialog
} from '../../modules';
import {
	initialForm,
	initialForm2,
	typeOptions,
	nameOptions,
} from '../../../constants/chain'
import iconDelete from '../../../public/icons/icon-delete.svg';
import iconEdit from '../../../public/icons/icon-edit.svg';

export default class ChainList extends Component {

	constructor(props) {
		super(props)

		this.state = {
			chain: initialForm,
			isModal: false,
			action: 'add',
			isHover: false,
			smartContract: initialForm2,
		}

		this._onDeleteChain = this._onDeleteChain.bind(this)
		this._onToggleModal = this._onToggleModal.bind(this)
		this._onChangeInput = this._onChangeInput.bind(this)
		// this._onAddChain = this._onAddChain.bind(this)
		this._onEditChain = this._onEditChain.bind(this)
		this._onSubmitChain = this._onSubmitChain.bind(this)
		this._onHoverContract = this._onHoverContract.bind(this)
	}

	_onDeleteChain(id) {
		const { _deleteChain } = this.props
		_deleteChain(id)
	}

	_onToggleModal() {
		this.setState(prevState => ({
			isModal: !prevState.isModal,
			action: 'add',
			smartContract: initialForm2
		}))
	}


	_onChangeInput(e) {
		const { name, value } = e.target
		const { _formatInputForm } = this

		this.setState(prevState => ({
			smartContract: {
				...prevState.smartContract, 
				[name]: _formatInputForm(name, value)
			}
		}))
	}

	_onEditChain(smartContract) {
		const { _onToggleModal } = this
		console.log(smartContract.contract_abi)
		
		_onToggleModal()
		
		this.setState(prevState => ({
			action: 'edit',
			smartContract: smartContract
		}))
	}

	async _onSubmitChain(e) {
		e.preventDefault()
		const { smartContract, action } = this.state
		const { _addChain, _updateChain } = this.props
		const { _onToggleModal } = this
		const { chain_name } = smartContract

		// const newSmartContract = {
		// 	...smartContract, 
		// 	chain_name: nameOptions[chain_name].name
		// }
		
		if (action === 'add') {
			console.log(smartContract)
			await  _addChain(smartContract)
			this.setState({smartContract: initialForm2})
			_onToggleModal()
		}
		else {
			console.log(smartContract)
			await  _updateChain(smartContract)
			this.setState({smartContract: initialForm2})
			_onToggleModal()
		}
	}

	_onHoverContract() {
		this.setState(prevState => ({
			isHover: !prevState.isHover
		}))
	}

	_formatInputForm(name, value) {
		let newValue = null;

		if (name === 'chain_type') {
			newValue = parseInt(value)
		}
		else if (name === 'chain_name') {
			newValue = parseInt(value)
		}
		else {
			newValue = value
		}

		return newValue
	}

	componentDidUpdate(prevProps, prevState) {
		const { isModal, smartContract } = this.state

		if (prevState.isModal !== isModal) {
			console.log(isModal)
			if (!isModal) {
				this.setState({chain: initialForm})
			}
		}

		console.log(smartContract)
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

	render() {
		const { 
			isModal, 
			chain, 
			smartContract, 
			action 
		} = this.state
		const { 
			chainList, 
			smartContractList,
			isLoadingSave,
			isLoadingDelete,
			message,
			_emptyMessage, 
		} = this.props
		const { 
			_onDeleteChain, 
			_onToggleModal, 
			_onChangeInput, 
			_onEditChain, 
			_onSubmitChain, 
			_onHoverContract,
			_renderMessageAlert, 
		} = this

		return (
			<div className="container">
				<div className="d-flex align-items-center mb-4">
					<h1 className="mb-0 me-3">Contracts</h1>
					<Button 
						type="button" 
						theme="primary"
						label="Add Chain"
						onClick={_onToggleModal} 
					/>
				</div>
				<div className="row mb-4">
					<div className="col-md-12">
						<ul className="list-group rounded-custom-sm border-0">
							{
								smartContractList.length > 0 &&
								smartContractList.map((row, index) => (
								  	<li className="list-group-item p-3 mb-3 mb-md-0 border-0" key={index}>
								  		<div className="row align-items-center">
								  			<div className="col-12- col-md-1 mb-3 mb-md-0 fw-bold">#{index + 1}</div>
								  			<div className="col-12- col-md-3 mb-3 mb-md-0">{row.name}</div>
								  			<div className="col-12- col-md-2 mb-3 mb-md-0">
								  				<span>{nameOptions[parseInt(row.chain_name)].name}{' '}</span>
								  			</div>
								  			<div className="col-12- col-md-1 mb-3 mb-md-0">
								  				{
								  					row.chain_type === 1 ?
								  					<span className="badge text-white bg-primary">Mainnet</span> :
								  					<span className="badge text-white bg-secondary">Testnet</span>
								  				}
								  			</div>
								  			<div className="col-12- col-md-3 mb-3 mb-md-0">
								  				{row.contract_address.substring(0, 20)}...
								  			</div>
								  			<div className="col-12- col-md-2">
									  			<div className="d-flex">
									  				<ButtonCircle 
									  					icon={iconEdit}
									  					theme="light border-0 me-2"
									  					onClick={() => _onEditChain(row)}
									  				/>
									  				<ButtonCircle 
									  					icon={iconDelete}
									  					theme="light border-0"
									  					onClick={() => _onDeleteChain(row.id)}
									  				/>
									  			</div>
								  			</div>
								  		</div>
								  	</li>
								))
							}
						</ul>
					</div>
				</div>
				<ModalCustom 
					title={`${action === 'add' ? 'Add' : 'Edit'} Chain`}
					theme="w-100"
					description={`${action === 'add' ? 'Add' : 'Edit'} Add your contract address.`}
					onClose={_onToggleModal} 
					show={isModal}
				>
					<form onSubmit={_onSubmitChain}>
						<div className="row">
							<div className="col">
						  		<TextField
						  		    label="Name"
						  		    theme="mb-4"
						  		    id="name"
						  		    name="name"
						  		    value={smartContract.name}
						  		    onChange={_onChangeInput}
						  		    required
						  		/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								{/*<TextField
								    label="Chain Name"
								    theme="mb-4"
								    id="chain_name"
								    name="chain_name"
								    value={smartContract.chain_name}
								    onChange={_onChangeInput}
								    required
								/>*/}
								<SelectOption 
									label="Chain Name"
									theme="mb-4"
									id="chain_name"
									name="chain_name"
									value={smartContract.chain_name}
									options={nameOptions}
									onChange={_onChangeInput}
									required
								/>
							</div>
							<div className="col">
								<SelectOption 
									label="Chain Type"
									theme="mb-4"
									id="chain_type"
									name="chain_type"
									value={smartContract.chain_type}
									options={typeOptions}
									onChange={_onChangeInput}
									required
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
						  		<TextField
						  		    label="Contract"
						  		    theme="mb-4"
						  		    id="contract_address"
						  		    name="contract_address"
						  		    value={smartContract.contract_address}
						  		    onChange={_onChangeInput}
						  		    required
						  		/>
							</div>
						</div>
						<div className="row">
							<div className="col">
						  		<TextArea
						  		    label="Contract ABI"
						  		    theme="mb-4"
						  		    id="contract_abi"
						  		    name="contract_abi"
						  		    row="10"
						  		    value={smartContract.contract_abi}
						  		    onChange={_onChangeInput}
						  		    required
						  		/>
							</div>
						</div>
				  		<Button
				  			type="submit"
				  			theme="primary w-100"
				  			label={
				  				action === 'add' 
				  				? isLoadingSave ? 'Loading...' : 'Add' 
				  				: isLoadingSave ? 'Loading...' : 'Save'
				  			}
				  		/>
				  	</form>
				</ModalCustom>
				{_renderMessageAlert(message, _emptyMessage)}
			</div>
		)
	}
}
