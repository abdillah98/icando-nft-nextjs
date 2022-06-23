export default function TextArea({label, name, id, value, placeholder, theme, required, rows, disabled, onChange}) {
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
				className={`form-control ${theme}`} 
				id={id} 
				name={name} 
				value={value} 
				placeholder={placeholder} 
				required={required}
				rows={rows}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	)
}