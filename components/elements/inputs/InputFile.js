import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import iconDelete from '../../../public/icons/icon-delete-red.svg';
import imgInputFile from '../../../public/images/input-file.svg';

export default function InputFile({
	label, 
	value, 
	name, 
	id, 
	required, 
	onChange, 
	removeFile,
	useRemove
}) {

	const [fileUrl, setFileUrl] = useState(null)

	const _getFileUrl = (file) => {
		let newUrl = null
		
		if (typeof file === 'string') {
			newUrl = file
		}
		else {
			console.log('object')
			newUrl = file ? URL.createObjectURL(file) : ''
		}
		setFileUrl(newUrl)
	}

	useEffect(() => {
		_getFileUrl(value)
	}, [value])

	return (
		<>
			<span className="form-label d-block mb-1">
				{label}
				{ required && <span className="text-danger">*</span> }
			</span>
			<small className="d-block text-muted mb-3">File types supported: JPG, PNG, GIF, SVG Max size: 100 MB</small>
			<label 
				htmlFor={id} 
				className="form-input-file"
			>
			    {
			    	fileUrl ?
				    <div>
				    	<div className={`image-file ${useRemove && 'mb-3'}`}>
				    		<Image 
				    			src={fileUrl} 
				    			layout="fill"
				    			alt={name} 
				    		/>
				    	</div>
			    		{
			    			useRemove &&
				    		<>
				    			<small className="d-block text-muted mb-2">Click the button to remove image or tap the image to change</small>
				    			<button 
				    				type="button" 
				    				className="btn-remove"
				    				onClick={removeFile}
				    			>
				    				<Image src={iconDelete} width={18} alt="icon-delete" />
				    				<span className="text-danger ms-2">Remove</span>
				    			</button>
				    		</>
			    		}
				    </div> :
				    <Image 
				    	src={imgInputFile} 
				    	width={200} 
				    	className="img-fluid" 
				    	alt={name} 
				    />
			    }
			</label>
			<input 
				type="file"  
				className="d-none" 
				id={id}
				name={name}
				onChange={onChange}
			/>
		</>
	)
}