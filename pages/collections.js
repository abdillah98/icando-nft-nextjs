import imgDefault from '../public/images/image.png';
import iconView from '../public/icons/icon-view.svg';
import iconEdit from '../public/icons/icon-edit.svg';
import iconHistory from '../public/icons/icon-history.svg';

import { DropdownIcon, CardPrice } from '../components/modules'

const _menuList = [
	{ id: 1, name: 'View on Opensea', icon: iconView, link: '/' },
	{ id: 2, name: 'View on Rarible', icon: iconView, link: '/' },
	{ id: 3, name: 'Update level to #2', icon: iconEdit, link: '' },
	{ id: 4, name: 'History', icon: iconHistory, link: '/' },
]

const _itemList = [
	{ id: 1, name: 'Item name #01 nft', level: 1, price: 0.0004, image: imgDefault },
	{ id: 2, name: 'Item name #02 nft', level: 2, price: 0.0004, image: imgDefault },
	{ id: 3, name: 'Item name #03 nft', level: 3, price: 0.0004, image: imgDefault },
]

export default function Collections() {
	console.log(_menuList)
	return (
		<div className="container">
			<h1 className="mb-4">Collection (mintend)</h1>
			<div className="row pr-3">
				{
				_itemList.length > 0 &&
				_itemList.map((item, index) => (
					<div className="col-md-3 pr-0 mb-4" key={index}>
						<CardPrice
							id={item.id}
							name={item.name} 
							level={item.level}
							price={item.price}
							image={item.image}
							options={_menuList}
						/>
					</div>
				))
			}
			</div>
		</div>
	)
}