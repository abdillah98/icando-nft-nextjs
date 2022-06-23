import React, { useState, useEffect, useRef } from 'react'
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
	useRemove,
	disabled
}) {
	const _inputFile = useRef('image') 
	const [fileUrl, setFileUrl] = useState(null)
	const [fileType, setFileType] = useState('image')

	const _getFileUrl = (file) => {
		if (file) {
			if (typeof file === 'string') {
				const strLength = file.length
				const type = file.substring(strLength - 5, strLength)
				setFileType(type)
				setFileUrl(file) 
				console.log(file)
			}
			else {
				const type = file.type.substring(0, 5)
				const blobUrl = typeof file !== 'string'  
					? URL.createObjectURL(file) 
					: ''
				setFileType(type)
				setFileUrl(blobUrl)
			}
		}
	}

	const _onChangeVideo = () => {
		alert('s')
	    _inputFile.current.click();
  	};

	useEffect(() => {
		_getFileUrl(value)
	}, [value])


	useEffect(() => {
		console.log(fileType)
		console.log(fileUrl)
	}, [fileType, fileUrl])

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
				    		{
				    			fileType === null || 
				    			fileType === 'image' ?
				    			<Image 
					    				src={fileUrl} 
					    				layout="fill"
					    				alt={name} 
					    		/>:
				    			<video controls>
				    				<source src={fileUrl} type="video/mp4" />
				    			</video>

				    		}
				    	</div>
			    		{
			    			useRemove &&
				    		<>
				    			{
				    				fileType === null ||
				    				fileType === 'image' ?
				    				<small className="d-block text-muted">Click the image to change the image.</small> :
				    				<>
				    					<small className="d-block text-muted mb-2">Click the button to change the video</small>
				    					<button 
				    						type="button" 
				    						className="btn-remove text-danger px-3"
				    						onClick={_onChangeVideo}
				    					>
				    						Change
				    					</button>
				    				</>
				    			}
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
				disabled={disabled}
				ref={_inputFile}
			/>
		</>
	)
}