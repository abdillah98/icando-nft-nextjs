import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
	CardItems, 
	CardItemsLoader 
} from '../../modules'

export default class ItemLists extends Component {

	render() {
		
		const { isLoading, itemLists } = this.props

		return (
			<div className="container">
				<h1 className="mb-4">Item List</h1>
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
															// minted={item.minted}
															image={item.image_url}
														/>
													</a>
												</Link>
											</div>
										))
									} 
								</> : 
								<CardItemsLoader theme="col-md-3 pr-0 mb-4" />
							}

						</div>
					</div>
				</div>
			</div>
		)
	}
}