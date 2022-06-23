import React, { useState, useEffect } from 'react'
import { CardBoost } from '../../elements'

export default function CardBoosts({data}) {
	const [item, setItem] = useState([])

 	useEffect(() => {
		if (data && data.length > 0) {
			const _filter = data.filter(row => (
				row.display_type !== undefined &&
				row.display_type === 'boost_number' ||
				row.display_type === 'boost_percentage'
			))
			setItem(_filter)
		}
	}, [data])

	return (
		<div className="row w-100 pe-3">
			{
				item.length > 0 &&
				item.map((row, index) => (
					<div className="col-lg-6 col-md-4 col-sm-6 col-12 pe-0 pb-3" key={index}>
						<CardBoost 
							key={index}
							traitType={row.trait_type}
							value={`+${row.value}${row.display_type === 'boost_percentage' ? '%' : ''}`}
						/>
					</div>
				))
			}
		</div>
	)
}
