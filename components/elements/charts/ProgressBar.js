export default function ProgressBar({height, value}) {
	return (
		<div className="progress" style={{height: `${height}px`}}>
		  	<div 
		  		className="progress-bar" 
		  		role="progressbar" 
		  		style={{width: `${value}%`}}
		  	/>
		</div>
	)
}