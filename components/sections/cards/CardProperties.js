import React, { useState, useEffect } from 'react'
import { CardProperty } from '../../elements'

export default function CardProperties({data}) {
	
	const [item, setItem] = useState([])

 	useEffect(() => {
		if (data && data.length > 0) {
			const _filter = data.filter(row => (
				typeof(row.value) === 'string' &&
				row.max_value === undefined &&
				row.display_type === undefined
			))
			setItem(_filter)
		}
	}, [data])


	return (
		<div className="row w-100 pe-3">
			{
				item.length > 0 &&
				item.map((row, index) => (
					<div className="col-lg-3 col-md-4 col-sm-6 col-6 pe-0" key={index}>
						<CardProperty 
							key={index}
							traitType={row.trait_type}
							value={row.value}
						/>
					</div>
				))
			}
		</div>
	)
}