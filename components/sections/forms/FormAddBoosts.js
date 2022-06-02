import React, { useState, useEffect } from 'react'
import { Button } from '../../elements'

const initialForm = {
	"display_type": "boost_number",
	"trait_type": "",
	"value": 1,
	"max_value": 10
}

export default function FormAddBoosts({ data, onSave }) {
	const [item, setItem] = useState([{...initialForm}])
	const [totalItem, setTotalItem] = useState(0)

	const _onChangeInput = (e, index) => {
		const { name, value } = e.target
		const _value = 
			name === 'value' || 
			name === 'max_value' 
			? parseInt(value)
			: value

		setItem(item.map((row, key) => (
			key === index 
			? {...row, [name]: _value} 
			: {...row}
		)))
	}

	const _onAddForm = () => {
		setItem([
			...item, 
			{
				display_type: "boost_number", 
				trait_type: "", 
				value: 1,
				max_value: 10
			}
		])
	}

	const _onDelete = (index) => {
		if (totalItem > 1) {
			setItem(item.filter((row, key) => index !== key))
		}
	}

	const _onSave = () => {
		const _filter = item.filter(row => row.trait_type !== '')
		console.log(_filter)
		if (onSave) onSave(_filter)
	}

 	useEffect(() => {
 		console.log(data)
		if (data && data.length > 0) {
			setItem(data)
		}
	}, [data])

 	useEffect(() => {
		if (item && item.length > 0) {
			const _filter = item.filter(row => (
				row.display_type !== undefined &&
				row.display_type === 'boost_number' ||
				row.display_type === 'boost_percentage'
			))
			setTotalItem(_filter.length)
		}
	}, [item])

	return (
		<div>
	  		<div className="mb-4">
	  		{
	  			item.map((row, index) => (
	  				row.display_type !== undefined &&
	  				row.display_type === 'boost_number' ||
	  				row.display_type === 'boost_percentage' ?
		  			<div className="d-flex align-items-end mb-3" key={index}>
		  				<div className="flex-fill">
		  					<label htmlFor="trait_type" className="form-label">Name</label>
		  					<input 
		  						type="text" 
		  						className="form-control" 
		  						name="trait_type" 
		  						id="trait_type" 
		  						placeholder="Speed"
		  						value={row.trait_type}
		  						onChange={(e) => _onChangeInput(e, index)} 
		  					/>
						</div>
		  				<div className="ps-3 flex-fill w-50">
		  					<label htmlFor="display_type" className="form-label">Name</label>
		  					<select 
		  						className="form-select" 
		  						id="display_type" 
		  						name="display_type"
		  						defaultValue="boost_number"
		  						value={row.display_type}
		  						onChange={(e) => _onChangeInput(e, index)}
		  					>
		  					  	<option value="boost_number">Number</option>
		  					  	<option value="boost_percentage">Percentage</option>
		  					</select>
						</div>
		  				<div className="ps-3 flex-fill w-50">
		  					<label htmlFor="value" className="form-label">Value</label>
		  					<div className="input-group">
		  					  	<input 
		  					  		type="number" 
		  					  		className="form-control" 
		  					  		name="value"
		  					  		id="value" 
		  					  		placeholder="1"
		  					  		value={row.value}
		  							onChange={(e) => _onChangeInput(e, index)} 
		  					  	/>
		  					  	<span className="input-group-text px-0">-</span>
		  					  	<input 
		  					  		type="number" 
		  					  		className="form-control" 
		  					  		name="max_value" 
		  					  		id="max_value" 
		  					  		placeholder="10" 
		  					  		value={row.max_value		}
		  					  		onChange={(e) => _onChangeInput(e, index)} 
		  					  	/>
		  					</div>
						</div>
						<div className="ps-3 flex-fill">
							<button 
								type="button" 
								className="btn-close mb-3" 
								onClick={() => _onDelete(index)}
							/>
						</div>
					</div> : null
				))
	  		}
			</div>
	    	<Button 
	    		type="button"
	    		label="Add more"
	    		theme="secondary px-3 mb-4"
	    		onClick={_onAddForm}
	    	/>
		  	<Button 
		  		type="button"
		  		label="Save"
		  		theme="primary w-100 px-3"
		  		onClick={_onSave}
		  	/>
		</div>
	)
}