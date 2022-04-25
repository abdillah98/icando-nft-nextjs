import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";

import { 
    TextField,
    Card
} from '../components/elements';

export default function SignIn() {
	const router = useRouter()

	const { 
		user,
		login, 
		authError, 
		isAuthenticated,
		isAuthenticating,
	} = useMoralis();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const _onClickSignIn = (e) => {
	    e.preventDefault()
	    login(username, password)
	}

	const _processSignIn = (_isAuthenticated, _authError) => {
		if (_isAuthenticated && _authError === null) {
			console.log('object')
			const username = user?.get('username')
			const email = user?.get('email')
			const saveUser = { username, email }

			localStorage.setItem('user', JSON.stringify(saveUser))
			router.push('/')
		}
	}

	useEffect(() => {
		_processSignIn(isAuthenticated, authError, user)
	}, [isAuthenticated, authError])

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-5">
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