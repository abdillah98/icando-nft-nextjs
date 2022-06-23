import React, { useState } from 'react';
import Image from 'next/image';
import { ModalCustom, Button } from '../../elements';
import {
	initialForm,
	initialForm2,
	typeOptions,
	nameOptions,
} from '../../../constants/chain'
import iconPlus from '../../../public/icons/icon-wallet.svg';
import iconCheck from '../../../public/icons/icon-check.svg';

const initialSelected = {
	id: null,
	contractAddress: '',
	contractABI: [],
	chainName: '',
	chainType: null,
}

export default function SelectContract({data, onClose, show, buttonLabel, isLoading, onSelected}) {
	console.log(data)
	const [selected, setSelected] = useState(initialSelected)

	const _onSelectOption = (row) => {
		setSelected({
			id: row.id,
			contractAddress: row.contract_address,
			contractABI: JSON.parse(row.contract_abi),
			chainName: row.chain_name,
			chainType: row.chain_type,
		})
	}

	return (
		<ModalCustom 
			title={`Select Contract`}
			theme="w-100"
			description={`Select contract address to connect the network.`}
			onClose={onClose} 
			show={show}
		>
			{
				data !== undefined && data.length > 0 &&
				<ul className="list-group rounded-custom-sm mb-4">
				  	{
				  		data.map((row, index) => (
				  			<li className="list-group-item cursor-pointer d-flex flex-column align-items-start" key={index} onClick={() => _onSelectOption(row)}>
				  				<span className="fs-sm text-muted text-uppercase fs-9 mb-1">{nameOptions[parseInt(row.chain_name)].name}</span>
				  				<div className="d-flex justify-content-between align-items-center mb-1">
				  					<span className="me-2">{row.contract_address}</span>
				  					{selected.id === row.id && <Image src={iconCheck} width={18} height={18} alt="icon-check" />}
				  				</div>
				  				{
				  					row.chain_type === 1 ?
				  					<span className="badge bg-primary text-white">Mainnet</span> :
				  					<span className="badge bg-secondary text-white">Testnet</span>
				  				}
				  			</li>
				  		))
				  	}
				</ul>
			}
			<Button 
				type="button"
				label={buttonLabel} 
				theme="primary w-100" 
				isLoading={isLoading} 
				onClick={() => onSelected(selected)}
			/>
		</ModalCustom>
	)
}