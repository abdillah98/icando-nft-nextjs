export default function Button({label, type, theme, isLoading, onClick}) {
	return (
		<button 
		    type={type} 
		    className={`btn btn-${theme}`}
		    onClick={onClick}
		>
			{isLoading ? 'Loading...' : label}
		</button>
	)
}