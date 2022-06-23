import React, {useContext} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";
import UserContext from '../../contexts/UserContext'
import iconPlus from '../../public/icons/icon-plus.svg';
import iconImage from '../../public/icons/icon-image.svg';
import iconCategory from '../../public/icons/icon-category.svg';
import iconLogout from '../../public/icons/icon-logout.svg';
import iconActivity from '../../public/icons/icon-activity.svg';

import { ButtonCircle } from '../elements'

export default function Sidebar() {
	const router = useRouter()
	const {  logout } = useMoralis();
	const userRole = useContext(UserContext)
	
	const activeMenu = (pathname) => {
		return router.pathname === pathname ? 'active' : ''
	}

	const onClickLogout = async () => {
		await logout()
		localStorage.removeItem('user')
		router.push('/signin')
	}

	return (
		<div className="sidebar">
			<ButtonCircle 
				icon={iconPlus} 
				theme="btn-circle-primary mb-5"
				withLink="/"
			/>
		    <ul className="icon-menu">
		        <li className="icon-menu-item">
		            <ButtonCircle 
        				icon={iconImage} 
        				theme={`btn-circle-light ${activeMenu('/items')}`}
        				withLink={`/items`}
        			/>
		        </li>
		        {
		        	userRole === 'minter' ||
		        	userRole === 'reviewer' &&
			        <li className="icon-menu-item">
			            <ButtonCircle 
	        				icon={iconCategory} 
	        				theme={`btn-circle-light ${activeMenu('/collections')}`}
	        				withLink={`/collections`}
	        			/>
			        </li>
		        }
		        {
		        	userRole === 'minter' &&
			        <li className="icon-menu-item">
			            <ButtonCircle 
	        				icon={iconActivity} 
	        				theme={`btn-circle-light ${activeMenu('/chain')}`}
	        				withLink={`/chain`}
	        			/>
			        </li>
		        }
		        <li className="icon-menu-item">
		            <ButtonCircle 
        				icon={iconLogout} 
        				theme="btn-circle-light"
        				onClick={() => onClickLogout()}
        			/>
		        </li>
		    </ul>
		</div>
	)
}