import Image from 'next/image';
import { ButtonCircle } from '../../elements';
import iconPlusDark from '../../../public/icons/icon-plus-dark.svg';

export default function AttributeList({children, icon, iconSize, title, description, theme, disabled, onClick}) {
	return (
		<div className={`border rounded-custom-sm p-3 ${theme}`}>
			<div className="d-flex justify-content-between">
			  	<div className="flex-fill w-100">
				  	<div className="d-flex align-items-start w-100">
				  		{
				  			icon &&
				  			<div className="mt-1">
				  				<Image 
				  					src={icon} 
				  					width={iconSize ? iconSize : 18} 
				  					height={iconSize ? iconSize : 18} 
				  					alt="icon-image" 
				  				/>
				  			</div>
				  		}
				  		<div className="d-flex flex-column ps-3 w-100">
				  			<strong className="fw-bold">{title}</strong>
				  			<span className="mb-4">{description}</span>
				  			{children}
				  			{/*<div className="row w-100">
				  				<div className="col-lg-3 col-md-4 col-sm-6 col-6">
						  			<div class="alert alert-primary border-primary rounded-custom-sm text-center" role="alert">
						  			  	<small className="d-block fs-9 fw-bold ls-1">PERSONALITY</small>
						  			  	<small className="d-block fs-7">Sad</small>
						  			</div>
				  				</div>
				  			</div>*/}
				  		</div>
				  	</div>
			  	</div>
			  	<div className="justify-content-end ps-3">
			  		<ButtonCircle 
			  			icon={iconPlusDark}
			  			theme="border"
			  			onClick={onClick}
			  			disabled={disabled}
			  		/>
			  	</div>
			</div>
		</div>
	)
}