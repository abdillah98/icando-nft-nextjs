import React, { Component, Fragment } from 'react';
import { ItemLists } from '../components/templates'
import { getItemList, deleteItem } from '../endpoint'

export default class Items extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoading: false,
			itemLists: [],
		}

		this._getItemList = this._getItemList.bind(this)
	}


	async _getItemList() {
		this.setState({isLoading: true})
		const itemLists = await getItemList()
		this.setState({isLoading: false, itemLists})
	}


	async componentDidMount() {
		const { _getItemList } = this

		await _getItemList()
	}


	componentDidUpdate() {
		// console.log(this.state.itemLists)
	}


	render() {

		const { isLoading, itemLists } = this.state

 		return (
			<Fragment>
				<ItemLists 
					isLoading={isLoading}
					itemLists={itemLists}
				/>
			</Fragment>
		)
	}
}