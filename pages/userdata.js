import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { 
    Button,
    TextField,
    Card
} from '../components/elements';

export default function Userdata() {
	const { 
		user,
		setUserData,
		isUserUpdating
	} = useMoralis();

	const [role, setRole] = useState('')

	const _onSubmit = (e) => {
		e.preventDefault()

		setUserData({
	        username: user?.get('username'),
	        email: `${user?.get('username')}.id`,
	        role: role,
	    })
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<Card>
						<form onSubmit={_onSubmit}>
							<div className="row mb-4">
							    <div className="col">
							    	<TextField 
							    	    id="useraname"
							    	    type="text"
							    	    name="useraname"
							    	    label="Username"
							    	    placeholder="dani@123"
							    	    value={user?.get('username')}
							    	    disabled
							    	/>
								</div>
							</div>
							<div className="row mb-4">
							    <div className="col">
							    	<label htmlFor="role" className="form-label">Role</label>
							    	<select 
							    		className="form-select" 
							    		aria-label="role"
							    		onChange={(e) => setRole(e.target.value)}
							    	>
							    	  	<option value="">Select role</option>
							    	  	<option value="admin">Admin</option>
							    	  	<option value="user">User</option>
							    	</select>
								</div>
							</div>
							<Button 
								type="submit" 
								label="Update"
								theme="primary"
							    disabled={isUserUpdating}
							/>
						</form>
					</Card>
				</div>
			</div>
		</div>
	)
}