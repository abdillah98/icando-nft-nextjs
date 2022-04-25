import Image from 'next/image';
import imgDefault from '../../../public/images/image.png';
import iconEth from '../../../public/icons/icon-eth.svg';

import { DropdownIcon } from '../lists'

export default function CardPrice({id, name, image, price, options}) {
	return (
		<div className="card border-0 rounded-custom-sm shadow-custom">
			{
				options && options.length > 0 &&
				<div className="card-img-option dropdown">
					<DropdownIcon
						id={id} 
						menuList={options}
					/>
				</div>
			}
			<div className="card-img">
		  		<Image src={image ? image : imgDefault} layout="fill" className="card-img-top" alt="nft-image" />
			</div>
		  	<div className="card-body">
			    <strong className="card-title d-block">{name}</strong>
			    <div className="d-flex">
			    	<Image src={iconEth} alt="icon-eth" />
			    	<span className="text-primary ms-2">{price} wETH</span>
			    </div>
		  	</div>
		</div>
	)
}