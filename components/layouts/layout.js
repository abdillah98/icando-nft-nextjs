import React, { useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";
import Sidebar from './sidebar';
import Content from './content';
import Header from './Header'
import {RoleContext} from './roleContenxt'
import SignIn from '../../pages/signin';
import Signup from '../../pages/Signup';

export default function Layout({ children }) {
	const router = useRouter();
	const pathname = router.pathname.substring(1, router.pathname.length)
	const { user, isAuthenticated } = useMoralis();
	const roleState = user?.get('role')

	if (!isAuthenticated) {
		
		if (pathname === 'signup') {
			return <Signup />
		}

		return <SignIn />
	}

  	return (
	    <RoleContext.Provider  value={roleState}>
		    <div className="wrapper">
		    	<Sidebar />
		      	<Content theme="ms-0 w-100">
		      		<Header />
		      		{children}
		      	</Content>
		    </div >
	    </RoleContext.Provider>
	)
}