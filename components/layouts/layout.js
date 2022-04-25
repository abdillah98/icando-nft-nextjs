import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from './sidebar';
import Content from './content';
import { useMoralis } from "react-moralis";

export default function Layout({ children }) {
	const router = useRouter()
	
	const getFullWidth = () => {
		const fullWidth =  
			router.pathname !== '/signin' && 
			router.pathname !== '/signup'
			? true : false
		return fullWidth
	}

  	return (
	    <div className="wrapper">
	    	{ getFullWidth() && <Sidebar />}
	      	<Content theme={!getFullWidth() ? 'ms-0 w-100' : ''}>{children}</Content>
	    </div >
	)
}