import React, { useState, useEffect } from 'react'

export default function ListStats({data}) {
	const [item, setItem] = useState([])

 	useEffect(() => {
		if (data && data.length > 0) {
			const _filter = data.filter(row => row.display_type === 'number')
 			setItem(_filter)
		}
	}, [data])

	return (
		<ul className="w-100 m-0 px-0">
			{
				item.length > 0 &&
				item.map((row, index) => (
					<li className="d-flex justify-content-between py-1" key={index}>
						<span><span className="me-2">-</span>{row.trait_type}</span>
						<span>{row.value} of {row.max_value ? row.max_value : row.value}</span>
					</li>
				))
			}
		</ul>
	)
}