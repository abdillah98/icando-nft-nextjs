export default function TextField({label, type, theme, name, id, value, placeholder, required, disabled, onChange}) {
	return (
		<div>
			<label 
				htmlFor={id} 
				className="form-label"
			>
					{label} 
					{ required && <span className="text-danger">*</span> }
			</label>
			<input 
				type={type} 
				className={`form-control ${theme}`} 
				id={id} 
				name={name} 
				value={value} 
				placeholder={placeholder} 
				onChange={onChange}
				required={required}
				disabled={disabled}
			/>
		</div>
	)
}