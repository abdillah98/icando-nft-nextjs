export default function TextArea({label, name, id, value, placeholder, required, rows, onChange}) {
	return (
		<>
			<label 
				htmlFor={id} 
				className="form-label"
			>
					{label} 
					{ required && <span className="text-danger">*</span> }
			</label>
			<textarea 
				className="form-control" 
				id={id} 
				name={name} 
				value={value} 
				placeholder={placeholder} 
				required={required}
				rows={rows}
				onChange={onChange}
			/>
		</>
	)
}