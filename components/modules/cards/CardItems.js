import Image from 'next/image';
import imgDefault from '../../../public/images/image.png';
import { DropdownIcon } from '../lists'

export default function CardItems({id, name, level, minted, image, options, optionsClick}) {

	return (
		<div className="card border-0 rounded-custom-sm shadow-custom">
			{
				options && options.length > 0 &&
				<div className="card-img-option dropdown">
					<DropdownIcon
						id={id} 
						menuList={options}
						onClick={optionsClick}
					/>
				</div>
			}
			<div className="card-img">
		  		<Image src={image ? image : imgDefault} layout="fill" className="card-img-top" alt="nft-image" />
			</div>
		  	<div className="card-body">
			    <strong className="card-title d-block">{name}</strong>
			    {minted && <span className="badge bg-primary">minted</span>}
		  	</div>
		</div>
	)
}