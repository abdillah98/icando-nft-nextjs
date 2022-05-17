import React, { Component, Fragment } from 'react';
import { CollectionLists } from '../components/templates'
import { getCollectionList } from '../endpoint'

export default class Collections extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: false,
			collectionLists: [],
		}

		this._getCollectionList = this._getCollectionList.bind(this)
	}

	async _getCollectionList() {
		this.setState({isLoading: true})
		const collectionLists = await getCollectionList()
		this.setState({isLoading: false, collectionLists})
	}


	async componentDidMount() {
		const { _getCollectionList } = this

		await _getCollectionList()
	}


	componentDidUpdate() {
		console.log(this.state.collectionLists)
	}


	render() {

		const { isLoading, collectionLists } = this.state

 		return (
			<Fragment>
				<CollectionLists 
					isLoading={isLoading}
					collectionLists={collectionLists}
				/>
			</Fragment>
		)
	}
}