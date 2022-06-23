export default function SelectOption({label, type, theme, name, id, value, options, placeholder, required, disabled, onChange}) {
	return (
		<div>
			<label 
				htmlFor={id} 
				className="form-label"
			>
					{label} 
					{ required && <span className="text-danger">*</span> }
			</label>
			<select 
				className={`form-select ${theme}`}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
			>
			  	{
			  		options.length > 0 &&
			  		options.map((item, index) => (
			  			<option value={item.id} key={index}>{item.name}</option>
			  		))
			  	}
			</select>
		</div>
	)
}