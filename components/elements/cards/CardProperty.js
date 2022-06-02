export default function CardProperty({traitType, value}) {
	return (
		<div className="alert alert-primary alert-custom-primary rounded-custom-sm text-center" role="alert">
		  	<small className="d-block fs-9 text-uppercase fw-bold ls-1">{traitType}</small>
		  	<small className="d-block fs-8 text-dark">{value}</small>
		</div>
	)
}