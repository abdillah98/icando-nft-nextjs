export default function Button({label, type, theme, isLoading, onClick}) {
	return (
		<button 
		    type={type} 
		    className={`btn btn-${theme} rounded-pill px-5 me-2`}
		    onClick={onClick}
		>
			{isLoading ? 'Loading...' : label}
		</button>
	)
}