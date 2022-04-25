export default function TextField({label, type, name, id, value, placeholder, required, onChange}) {
	return (
		<>
			<label 
				htmlFor={id} 
				className="form-label"
			>
					{label} 
					{ required && <span className="text-danger">*</span> }
			</label>
			<input 
				type={type} 
				className="form-control" 
				id={id} 
				name={name} 
				value={value} 
				placeholder={placeholder} 
				onChange={onChange}
				required={required}
			/>
		</>
	)
}