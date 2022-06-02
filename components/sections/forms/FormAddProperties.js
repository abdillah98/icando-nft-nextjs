import React, { useState, useEffect } from 'react'
import { Button } from '../../elements'

const initialForm = {
	"trait_type": "",
	"value": ""
}

export default function FormAddProperties({data, onSave}) {

	const [item, setItem] = useState([{...initialForm}])
	const [totalItem, setTotalItem] = useState(0)

	const _onChangeInput = (e, index) => {
		const { name, value } = e.target
		setItem(item.map((row, key) => (
			key === index 
			? {...row, [name]: value} 
			: {...row}
		)))
	}

	const _onAddForm = () => {
		setItem([
			...item, 
			{
				trait_type: "", 
				value: ""
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
		if (data && data.length > 0) {
			setItem(data)
		}
	}, [data])


 	useEffect(() => {
		if (item && item.length > 0) {
			const _filter = item.filter(row => (
				typeof(row.value) === 'string' &&
				row.max_value === undefined &&
				row.display_type === undefined
			))
			setTotalItem(_filter.length)
		}
	}, [item])

	return (
	  	<div>
	  		<div className="mb-4">
		    	{
		    		item.length > 0 &&
		    		item.map((row, index) => (
		    			typeof(row.value) === 'string' &&
		    			row.max_value === undefined &&
		    			row.display_type === undefined &&
				    	<div className="d-flex align-items-end mb-3" key={index}>
				    	  	<div className="flex-fill">
					    		{index === 0 && <label htmlFor="trait_type" className="form-label">Type</label>}
						    	<input 
						    		type="text" 
						    		className="form-control" 
						    		name="trait_type" 
						    		id="trait_type" 
						    		placeholder="Charater"
						    		value={row.trait_type}
						    		onChange={(e) => _onChangeInput(e, index)} 
						    	/>
				    	  	</div>
				    	  	<div className="ps-3 flex-fill">
		  			    		{index === 0 && <label htmlFor="value" className="form-label">Name</label>}
		  				    	<input 
		  				    		type="text" 
		  				    		className="form-control" 
		  				    		name="value" 
		  				    		id="value" 
		  				    		placeholder="Big" 
		  				    		value={row.value}
		  				    		onChange={(e) => _onChangeInput(e, index)}
		  				    	/>
				    	  	</div>
				    	  	<div className="ps-3 flex-fill">
				    	  		<button 
				    	  			type="button" 
				    	  			className="btn-close mb-3" 
				    	  			onClick={() => _onDelete(index)}
				    	  		/>
				    	  	</div>
				    	</div>
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