import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { 
    Button,
    TextField,
    Card
} from '../components/elements';

export default function Userdata() {
	const { 
		user,
		setUserData,
		isUserUpdating,
		// Moralis
	} = useMoralis();

	const [role, setRole] = useState(user?.get('role') || '')
	const [username, setUsername] = useState(user?.get('username') || '')
	const [email, setEmail] = useState(user?.get('email') || '')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const _onSubmit = (e) => {
		e.preventDefault()
		setUserData({
	        username: username,
	        email: email,
	        role: role,
	        // password: password.length > 0 ? password : user.password,
	    })

		// if (password === '' || confirmPassword === '') {
		// 	alert('Password or Confirm Password fields cannot be empty')
		// }
		// else if(password !== confirmPassword) {
		// 	alert('Confirm password is not the same')
		// }
		// else if(password.length < 6) {
		// 	alert('Minimum password 6 characters')
		// }
		// else {
		// 	const confirm = window.confirm('are you sure you changed your user information?')
		// 	if (confirm) {
		// 		alert('yeyyy')
		// 	}
		// 	setUserData({
		//         username: user?.get('username'),
		//         email: `${user?.get('username')}.id`,
		//         // password: password.length > 0 ? password : user.password,
		//         role: role,
		//     })
		// }

	}

	// const _onClickResetPassword = async () => {
	// 	console.log(user?.get('email'))
	// 	const userEmail = user?.get('email')
	// 	// const reset = await Moralis.user.requestPasswordReset(user?.get('email'))
	// 	// console.log(reset)
	// 	try {
	// 	  Moralis.GetClient().UserService.RequestPasswordResetAsync(userEmail)
	// 	  // Password reset request was sent successfully
	// 	}
	// 	catch(error) {
	// 	  // Show the error message somewhere
	// 	  console.log("Error :" +  error)
	// 	}
	// }

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 col-lg-6">
					<Card>
						<form onSubmit={_onSubmit}>
							<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="email"
							    	    type="email"
							    	    name="email"
							    	    label="Email"
							    	    placeholder="dani@icandon.com"
							    	    value={email}
							    	    onChange={(e) => setEmail(e.target.value)}
							    	/>
								</div>
							</div>
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
							    	/>
								</div>
							</div>
							{
								user?.get('role') === 'minter' &&
								<div className="row mb-4">
								    <div className="col">
								    	<label htmlFor="role" className="form-label">Role</label>
								    	<select 
								    		className="form-select" 
								    		aria-label="role"
								    		value={role}
								    		onChange={(e) => setRole(e.target.value)}
								    	>
								    	  	<option value="">Select role</option>
								    	  	<option value="minter">Minter [Super Admin]</option>
								    	  	<option value="reviewer">Reviewer</option>
								    	  	<option value="maker">Maker</option>
								    	</select>
									</div>
								</div>
							}
							<Button 
								type="submit" 
								label={isUserUpdating ? 'Loading...' : 'Save'}
								theme="primary px-4 me-2"
							    disabled={isUserUpdating}
							/>

							{/*<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="password"
							    	    type="password"
							    	    name="password"
							    	    label="Password"
							    	    placeholder="******"
							    	    value={password}
							    	    onChange={(e) => setPassword(e.target.value)}
							    	/>
								</div>
							</div>
							<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="confirm-password"
							    	    type="password"
							    	    name="confirm-password"
							    	    label="Confirm Password"
							    	    placeholder="******"
							    	    value={confirmPassword}
							    	    onChange={(e) => setConfirmPassword(e.target.value)}
							    	/>
								</div>
							</div>*/}
							
							{/*<Button 
								type="button" 
								label={isLoading ? 'Loading...' : 'Reset Password'}
								theme="secondary px-4"
								onClick={_onClickResetPassword}
							/>*/}
						</form>
					</Card>
				</div>
			</div>
		</div>
	)
}