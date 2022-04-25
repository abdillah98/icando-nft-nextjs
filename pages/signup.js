import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";

import { 
    TextField,
    Card
} from '../components/elements';

export default function SignUp() {
	const router = useRouter()

	const { 
		signup, 
		authError, 
		isAuthenticating,
	} = useMoralis();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confrimPassword, setConfrimPassword] = useState('');
	const [validatePassword, setValidatePassword] = useState(true);

	const _onClickSignUp = async (e) => {
		e.preventDefault()
		
		if (password === confrimPassword) {
			setValidatePassword(true)
			await signup(username, password, email)
			router.push('/')
		}
		else {
			console.log(password === confrimPassword)
			console.log(confrimPassword)
			setValidatePassword(false)
		}
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-5">
					<Card>
						<h3 className="text-center">Sign Up</h3>
						<form onSubmit={(e) => _onClickSignUp(e)}>
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
							    	    id="email"
							    	    type="email"
							    	    name="email"
							    	    label="Email"
							    	    placeholder="dani@mail.com"
							    	    value={email}
							    	    onChange={(e) => setEmail(e.target.value)}
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
								</div>
							</div>
							<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="confrim-password"
							    	    type="password"
							    	    name="confrim-password"
							    	    label="Confrim Password"
							    	    placeholder="Enter your confrim password..."
							    	    value={confrimPassword}
							    	    onChange={(e) => setConfrimPassword(e.target.value)}
							    	    required
							    	/>
							    	{!validatePassword && <small className="text-danger d-block mt-2">Confirm password not match</small>}
								</div>
							</div>
							<button 
								type="submit" 
								className="btn btn-primary rounded-pill px-5 w-100"
							>
								{!isAuthenticating ? 'Sign Up' : 'Loading...'}
							</button>
						</form>
					</Card>
				</div>
			</div>
		</div>
	)
}