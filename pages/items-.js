import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import iconOption from '../public/icons/icon-options.svg';
import iconMint from '../public/icons/icon-mint.svg';
import iconAdd from '../public/icons/icon-add.svg';
import iconEdit from '../public/icons/icon-edit.svg';
import iconDelete from '../public/icons/icon-delete.svg';
import imgDefault from '../public/images/image.png';

import { DropdownIcon, CardItems, CardItemsLoader } from '../components/modules'
import { getItemList, deleteItem } from '../endpoint'

const _menuList = [
	{ id: 1, name: 'Mint', icon: iconMint, link: '' },
	// { id: 2, name: 'Add next level', icon: iconAdd, link: '' },
	{ id: 3, name: 'Edit metadata', icon: iconEdit, link: '' },
	{ id: 4, name: 'Delete', icon: iconDelete, link: '' },
]

export default function Items() {
	const router = useRouter()
	const [itemList, setItemList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const _getItemList = async () => {
		setIsLoading(true)
		setItemList(await getItemList())
		setIsLoading(false)
	}

	const _onClickDropdown = async (value) => {
		if (value.label === 'Mint') {
			alert('Mint')
		}
		if (value.label === 'Edit metadata') {
			router.push(`/?id=${value.id}`)
		}
		if (value.label === 'Delete') {
			await _deleteItemList(value.id)
		}
	}

	const _deleteItemList = async (id) => {
		await deleteItem(id)
		await _getItemList()
	}

	useEffect(() => {
		_getItemList()
	}, [])

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
									itemList.length > 0 &&
									itemList.map((item, index) => (
										<div className="col-lg-3 col-md-4 col-sm-6 pr-0 mb-4" key={index}>
											<Link href={`/?id=${item.id}`}>
												<a className="text-decoration-none">
													<CardItems
														id={item.id}
														name={item.name} 
														minted={item.minted}
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
