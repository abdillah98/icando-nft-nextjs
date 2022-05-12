import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import iconOption from '../../../public/icons/icon-options.svg';
import imgDefault from '../../../public/images/image.png';

export default function DropdownIcon({id, menuList, onClick}) {

	const [show, setShow] = useState(false)

	const handleClick = (id, label) => {
		if (onClick) { 
			onClick({id, label}) 
		}
		else {
			alert('onClick props undefined!')
		}
	}

	return (
		<div className="dropdown-icon">
			<button type="button" className="btn-option" id="dropdownMenuButton1" onClick={() => setShow(!show)}>
				<Image src={iconOption} alt="btn-circle" />
			</button>
			{
				menuList.length > 0 &&
				<ul className={`dropdown-menu border-0 ${show ? 'show' : ''}`}>
					{
						menuList.map((item, index) => (
							item.link && item.link.length > 0 ?
						    <li key={index}>
						    	<Link href="/">
							    	<a className="dropdown-item d-flex" href="#">
							    		<Image src={item.icon} alt={item.name} />
							    		<span className="ms-2">{item.name}</span>
							    	</a>
						    	</Link>
						    </li> :
						    <div className="dropdown-item d-flex" onClick={() => handleClick(id, item.name)} key={index}>
						    	<Image src={item.icon} alt={item.name} />
						    	<span className="ms-2">{item.name}</span>
						    </div>
						))
					}
				</ul>
			}
		</div>
	)
}