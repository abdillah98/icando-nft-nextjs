import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
	Button, 
} from '../../elements';
import { 
	CardItems, 
	CardItemsLoader,
	AlertDialog
} from '../../modules';

export default class ItemLists extends Component {

	constructor(props) {
		super(props)

		this.state = {
			itemsChecked: [],
			disableChecked: false,
		}

		this._onCheckedItem = this._onCheckedItem.bind(this);
	}

	_onCheckedItem(e, item) {
		const { checked } = e.target;

		if (checked) {
			this.setState(prevState => ({
				itemsChecked: [
					...prevState.itemsChecked, 
					item
				]
			}));
		}
		else {
			this.setState(prevState => ({
				itemsChecked: prevState.itemsChecked.filter(value => 
					value.id !== item.id
				)
			}));
		}
	}

	componentDidUpdate(prevProps, prevState) {
		//...
	}

	render() {
		
		const { 
			itemsChecked, 
			disableChecked,
		} = this.state;
		const { 
			isLoading, 
			itemLists, 
			message, 
			isLoadingMint, 
			_mintItems,
			_emptyMessage,
		} = this.props;
		const { _onCheckedItem } = this;

		return (
			<div className="container">
				<div className="row mb-4">
					<div className="col-md-12">
						<div className="d-flex align-items-center">
							<h1 className="me-3">Item List</h1>
							{
								itemsChecked.length > 0 &&
									<Button 
										type="button" 
										theme="primary"
										label={`(${itemsChecked.length} items) Mint`}
										isLoading={isLoadingMint} 
										onClick={() => _mintItems(itemsChecked)} 
									/>
							}
						</div>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-md-12">
						<div className="row pr-3">
							{
								!isLoading ?
								<>
									{
										itemLists.length > 0 &&
										itemLists.map((item, index) => (
											<div className="col-lg-3 col-md-4 col-sm-6 pr-0 mb-4" key={index}>
												<Link href={`/?id=${item.id}`}>
													<a className="text-decoration-none">
														<CardItems
															id={item.id}
															name={item.name} 
															image={item.image_url}
															onChecked={(e) => _onCheckedItem(e, item)}
															disableChecked={disableChecked}
														/>
													</a>
												</Link>
											</div>
										))
									} 
								</> : 
								<CardItemsLoader theme="col-lg-3 col-md-4 col-sm-6 pr-0 mb-4" />
							}

						</div>
					</div>
				</div>
				{
				    message &&
				    <AlertDialog 
				        message={message} 
				        closeAlert={_emptyMessage}
				    />
				}
			</div>

		)
	}
}