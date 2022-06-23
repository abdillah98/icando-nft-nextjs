import React, { Component, useContext } from 'react';
import UserContext from '../contexts/UserContext'

// export default function Test() {
// 	 const userRole = useContext(UserContext)
	
// 	return (
// 		<>
// 			Role: {userRole}
// 		</>
// 	)
// }

export default class Test extends Component {
	static contextType = UserContext

	constructor(props) {
		super(props)

		this.state = {
			userRole: null,
		}
	}

	componentDidMount() {
	    const userRole = this.context
	    this.setState({userRole})
	    
	 }
	
	render() {
		const { state: {userRole} } = this
		return (
			<>
				Role: {userRole}
			</>
		)
	}
}