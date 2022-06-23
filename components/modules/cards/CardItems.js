import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import imgDefault from '../../../public/images/image.png';
import { DropdownIcon } from '../lists'

export default function CardItems({id, name, level, minted, image, onChecked, disableChecked}) {
	console.log(image)
	const [fileType, setFileType] = useState(null)
	const _onChecked = (e) => {
		e.stopPropagation();
		onChecked(e)
	}

	useEffect(() => {
		if (image) {
			const type = image.substring(image.length - 5, image.length)
			if (type === 'image' || type === 'video') {
				setFileType(type)
			}
			else {
				setFileType('image')
			}
		}
		console.log(fileType)
	}, [fileType])




	return (
		<div className="card border-0 rounded-custom-sm shadow-custom">
			{
				onChecked &&
				<div className="card-img-option">
					<div className="form-check">
					  	<input 
					  		type="checkbox" 
					  		className="form-check-input" 
					  		onClick={(e) => _onChecked(e)}
					  		disabled={disableChecked}
					  	/>
					</div>
				</div>
			}
			<div className="card-img">
		  		{
		  			fileType === 'image' ?
		  			<Image src={image ? image : imgDefault} layout="fill" className="card-img-top" alt="nft-image" /> :
		  			<video controls>
	    				<source src={image} type="video/mp4" />
	    			</video>
		  		}
			</div>
		  	<div className="card-body">
			    <strong className="card-title d-block">{name}</strong>
			    {minted && <span className="badge bg-primary">minted</span>}
		  	</div>
		</div>
	)
}