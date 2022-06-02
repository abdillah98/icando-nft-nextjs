import React, { useState, useEffect } from 'react'
import { ProgressBar } from '../../elements'

export default function BarLevels({data}) {
	const [item, setItem] = useState([])

 	useEffect(() => {
 		console.log(data)
		if (data && data.length > 0) {
			const _filter = data.filter(row => (
				row.value > 0 &&
				row.display_type === undefined
			))
			console.log(_filter)
			setItem(_filter)
		}
	}, [data])

	return (
		<>
			{
				item.length > 0 &&
				item.map((row, index) => (
					<div className="d-flex flex-column w-100 mb-3" key={index}>
						<div className="w-100 d-flex flex-row justify-content-between mb-1">
							<span>{row.trait_type}</span>
							<span>{row.value} of {row.max_value ? row.max_value : row.value}</span>
						</div>
						<ProgressBar  
							height={6} 
							value={
								row.max_value ?
								row.value * 100 / row.max_value :
								row.value * 100 / row.value
							}
						/>
					</div>
				))
			}
		</>
	)
}