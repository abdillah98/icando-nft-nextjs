import Image from 'next/image';
import iconBoost from '../../../public/icons/icon-boost.svg'

export default function CardBoost({traitType, value}) {
	return (
		<div className="d-flex p-3 rounded-custom-sm border">
		  	<div className="p-2">
		  		<div className="btn-circle bg-primary-light">
		  			<Image src={iconBoost} alt="icon-boost" width={24} height={24}/>
		  		</div>
		  	</div>
		  	<div className="p-2 flex-fill">
		  		<strong className="d-block fs-7">{traitType}</strong>
		  		<span className="d-block fs-8">{value}</span>
		  	</div>
		</div>
	)
}
	
// return (
// 	<div className="d-flex border-light rounded-custom-sm text-center" role="alert">
// 	  	<small className="d-block fs-9 text-uppercase fw-bold ls-1">{traitType}</small>
// 	  	<small className="d-block fs-8 text-dark">{value}</small>
// 	</div>
// )