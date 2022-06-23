import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";

import { 
    TextField,
    Card
} from '../components/elements';

export default function SignIn() {
	const router = useRouter()
	const pathname = router.pathname.substring(1, router.pathname.length)
	const { 
		user,
		login, 
		authError, 
		isAuthenticated,
		isAuthenticating,
	} = useMoralis();


	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoged, setIsLoged] = useState(false);


	const _onClickSignIn = async (e) => {
	    e.preventDefault()
	    // console.log(pathname)
	    const loged = await login(username, password)
	    if (loged) {
	    	if (pathname === 'signin') {
	    		router.push('/')
	    	}
	    	else {
	    		router.push(`/${pathname}`)
	    	}
	    }
	}

	return (
		<div className="auth-section">
			<div className="row justify-content-center w-100">
				<div className="col-lg-4 col-md-6 col-sm-8 col-12">
					<Card>
						<h3 className="text-center">Sign In</h3>
						<form onSubmit={(e) => _onClickSignIn(e)}>
							<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="useraname"
							    	    type="text"
							    	    name="useraname"
							    	    label="Username"
							    	    placeholder="dani@123"
							    	    value={username}
							    	    onChange={(e) => setUsername(e.target.value)}
							    	    required
							    	/>
								</div>
							</div>
							<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="password"
							    	    type="password"
							    	    name="password"
							    	    label="Password"
							    	    placeholder="Enter your password..."
							    	    value={password}
							    	    onChange={(e) => setPassword(e.target.value)}
							    	    required
							    	/>
							    	{authError && <small className="text-danger d-block mt-2">Invalid username/password.</small>}
								</div>
							</div>

							<button 
								type="submit" 
								className="btn btn-primary rounded-pill px-5 w-100"
								disabled={isAuthenticating}
							>
								{!isAuthenticating ? 'Sign In' : 'Loading...'}
							</button>
						</form>
					</Card>
				</div>
			</div>
		</div>
	)
}