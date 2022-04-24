export default function Card({children, theme}) {
	return (
		<div className="card border-0 rounded-custom">
		    <div className="card-body p-md-5 p-sm-3 p-3">
		    	{children}
		    </div>
		</div>
	)
}