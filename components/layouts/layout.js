import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";
import Sidebar from './sidebar';
import Content from './content';
import Header from './Header'
import {RoleContext} from './roleContenxt'
import SignIn from '../../pages/signin';
import SignUp from '../../pages/signup';
import { UserProvider  } from '../../contexts/UserContext'

export default function Layout({ children }) {
	const router = useRouter();
	const pathname = router.pathname.substring(1, router.pathname.length)
	const { user, isAuthenticated } = useMoralis();

	if (!isAuthenticated) {
		if (pathname === 'signup') {
			return <SignUp />
		}

		return <SignIn />
	}

  	return (
	    <>
	    	{
	    		pathname !== 'signin' &&
	    		pathname !== 'signup' ?
	    		<UserProvider value={user?.get('role')}>
		    		<div className="wrapper">
		    			<Sidebar />
		    		  	<Content theme="ms-0 w-100">
		    		  		<Header />
		    		  		{children}
		    		  	</Content>
		    		</div >
	    		</UserProvider >:
	    		<>
	    			{
	    				pathname === 'signin' ?
	    				<SignIn /> :
	    				<SignUp />
	    			}
	    		</>
	    	}
	    </>
	)
}