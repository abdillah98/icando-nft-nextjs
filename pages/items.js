import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import iconOption from '../public/icons/icon-options.svg';
import iconMint from '../public/icons/icon-mint.svg';
import iconAdd from '../public/icons/icon-add.svg';
import iconEdit from '../public/icons/icon-edit.svg';
import iconDelete from '../public/icons/icon-delete.svg';
import imgDefault from '../public/images/image.png';

import { DropdownIcon, CardItems, CardItemsLoader } from '../components/modules'

const _menuList = [
	{ id: 1, name: 'Mint', icon: iconMint, link: '' },
	{ id: 2, name: 'Add next level', icon: iconAdd, link: '/' },
	{ id: 1, name: 'Edit metadata', icon: iconEdit, link: '/' },
	{ id: 1, name: 'Delete', icon: iconDelete, link: '' },
]

const _itemList = [
	{ id: 1, name: 'Item name #01 nft', level: 1, image: imgDefault },
	{ id: 2, name: 'Item name #02 nft', level: 2, image: imgDefault },
	{ id: 3, name: 'Item name #03 nft', level: 3, image: imgDefault },
]

export default function Items() {
	const [itemList, setItemList] = useState([])

	const _getItemList = async () => {
		console.log(await getItemList())
		setItemList(await getItemList())
	}

	useEffect(() => {
		_getItemList()
	}, [])

	return (
		<div className="container">
			<h1 className="mb-4">Item List</h1>
			<div className="row mb-4">
				<div className="col-md-12">
					<h6 className="mb-4">Group (<span className="text-danger">01xsda</span>)</h6>
					<div className="row pr-3">
						{
							itemList.length > 0 ?
							itemList.map((item, index) => (
								<div className="col-md-3 pr-0 mb-4" key={index}>
									<CardItems
										id={item.id}
										name={item.name} 
										level={item.level}
										image={item.image}
										options={_menuList}
									/>
								</div>
							)) :
							<CardItemsLoader theme="col-md-3 pr-0 mb-4" />
						}

					</div>
				</div>
			</div>
		</div>
	)
}


const getItemList = async () => {
	try {
		const response = await fetch('https://gudang.icando.co.id/icando-web-tools/icando-school/v1/icando-nft/index.php/api/mst_nft')
		const result = await response.json()
		console.log(result)
		if (result.status) {
			const newResult = result?.data?.map(item => ({
				id: item.id,
				name: item.name,
				image: item.image_url,
				level: item.level_id,
			}))

			return newResult
		}
		else {
			return []
		}
	}
	catch (error) {
		console.log(error)
	}
}