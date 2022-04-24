import Image from 'next/image';
import imgInputFile from '../../../public/images/input-file.svg';

export default function InputFile({label, name, id, required, onChange}) {
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
			    <Image 
			    	src={imgInputFile} 
			    	width={200} 
			    	className="img-fluid" 
			    	alt={name} 
			    />
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