import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Moralis from 'moralis'
import { useMoralis } from "react-moralis";
import uploadFileS3 from '../helpers/s3'

import iconPlus from '../public/icons/icon-plus.svg';
import iconImage from '../public/icons/icon-image.svg';
import iconCategory from '../public/icons/icon-category.svg';
import iconLogout from '../public/icons/icon-logout.svg';
import imgInputFile from '../public/images/input-file.svg';

import { TextField, TextArea, InputFile, Card } from '../components/elements';
import { AlertDialog } from '../components/modules';
import { getItem, postItem, putItem, deleteItem, postImage } from '../endpoint'

const initialItem = {
    id: null,
    name: '',
    description: '',
    image: null,
    image_url: '',
    metadata: '',
}

export default function Index() {
    const router = useRouter();
    const { id }  = router.query;

    // Initial state
    const [item, setItem] = useState(initialItem)
    const [message, setMessage] = useState(null)
    const [confirmText, setConfirmText] = useState('')
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    
    // Post add item
    const _addItem = async () => {
        setIsLoadingSave(true)
        const image_url = await postImage(item)
        const addItem = await postItem(item, image_url)
        // Response
        if (addItem) {
            setIsLoadingSave(false)
            setMessage({
                icon: 'success',
                title: 'Successed!',
                description: 'Item added successfully.'
            })
            setItem(initialItem)
            router.push('/items')
        }
        else {
            setIsLoadingSave(false)
            setMessage({
                icon: 'error',
                title: 'Failed!',
                description: 'Item failed to add.'
            })
            setItem(initialItem)

        }
    }

     // Put edit item
    const _updateItem = async () => {
        setIsLoadingSave(true)
        
        const image_url = await postImage(item)
        const updateItem = typeof item.image === 'string' 
            ? await putItem(item)
            : await putItem(item, image_url)

        // Response
        if (updateItem) {
            setIsLoadingSave(false)
            setMessage({
                icon: 'success',
                title: 'Successed!',
                description: 'Item Update successfully.'
            })
            await _getItem(id)
        }
        else {
            setIsLoadingSave(false)
            setMessage({
                icon: 'error',
                title: 'Failed!',
                description: 'Item failed to update.'
            })
            await _getItem(id)
        }
    }

    // Delete item
    const _deleteItem  = async () => {
        if (id) {
            const removeItem = await deleteItem(id)
            if (removeItem) {
                setMessage({
                    icon: 'success',
                    title: 'Successed!',
                    description: 'Item delete successfully.'
                })
                router.push('/items')
            }
            else {
                setMessage({
                    icon: 'error',
                    title: 'Failed!',
                    description: 'Already minted. cannot delete data!'
                })
            }
        }
    }

    // Submit item
    const _onClickAction = async (e) => {
        e.preventDefault()
        if (id) {
            await _updateItem()
        }
        else {
            await _addItem()
        }
    }

    // On Change Input form
    const _onChangeInput = (e) => {
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
    }

    // On Change Input file
    const _onChangeFile = (e) => {
        const { files } = e.target
        setItem({ ...item, image: files[0] })
    }

    // On Click confrim delete
    const _onClickConfirmDelete = async (e) => {
        e.preventDefault()
        
        setIsLoadingDelete(true)
        
        if (confirmText !== item.name) {
            setIsLoadingDelete(false)
            setMessage({
                icon: 'error',
                title: 'Failed!',
                description: 'Item name does not match'
            })
        }
        else {
            await _deleteItem()
            setIsLoadingDelete(false)
        }
    } 

    //Get Item
    const _getItem = async (id) => {
        if (id) {
            const result = await getItem(id)
            setItem({
                ...item,
                id: result.id,
                name: result.name,
                description: result.description,
                image: result.image_url,
                image_url: result.image_url,
                metadata: result.metadata,
                minted: result.minted,
            })
        }
    }

    useEffect(() => {
        if (id) { 
            _getItem(id) 
        }
        else {
            setItem(initialItem)
        }
    }, [id])

    useEffect(() => {
        console.log(item)
    }, [item])

    return (
        <div className="container">
            <h1 className="mb-4">Create New Item</h1>
            <div className="row mb-4">
                <div className="col-lg-8 col-md-12 col-sm-12">
                    <Card>
                        <form className="mb-4" onSubmit={(e) => _onClickAction(e)}>
                            <div className="row mb-5">
                                <div className="col-lg-8 col-md-12">
                                    <InputFile
                                        label="Image"
                                        id="image"
                                        name="image"
                                        value={item.image}
                                        onChange={_onChangeFile}
                                        removeFile={() => setItem({...item, image: null})}
                                        useRemove={!item.minted}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-lg-8 col-md-12">
                                    <TextField 
                                        id="name"
                                        type="text"
                                        name="name"
                                        label="Name"
                                        placeholder="Cute nft #01..."
                                        value={item.name}
                                        onChange={_onChangeInput}
                                        required
                                    />
                                </div>
                            </div>  
                            <div className="row mb-5">
                                <div className="colg-lg-12 col-md-12">
                                   <TextArea 
                                        id="description"
                                        name="description"
                                        label="Description"
                                        placeholder="Type your thoughts"
                                        value={item.description}
                                        onChange={_onChangeInput}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="colg-lg-8 col-md-12">
                                    <TextArea 
                                         id="metadata"
                                         name="metadata"
                                         label="Metadata"
                                         placeholder="{...}"
                                         value={item.metadata}
                                         onChange={_onChangeInput}
                                         rows={10}
                                     />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary rounded-pill px-5 me-2"
                            >
                                {isLoadingSave ? 'Loading...' : 'Save'}
                            </button>
                            {
                                id && !item.minted && 
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary rounded-pill px-5 me-2"
                                >
                                    Mint
                                </button>
                            }
                        </form>
                        {
                            item.minted ?
                            <div className="alert alert-primary border border-primary rounded-custom-sm p-3 mb-0">
                                <h4>Minted!</h4>
                                <p className="my-0">This item already exists on the blockchain network</p>
                            </div> :
                            <div className="alert alert-warning border border-warning rounded-custom-sm p-3 mb-0">
                                <h4>Attention!</h4>
                                <p className="my-0">Press the <code>"Mint"</code> button to upload the item to the blockchain network.</p>
                            </div>
                        }
                    </Card>
                </div>
            </div>
            {
                id &&
                <div className="row mb-4">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <Card>
                            <h4>Delete this item</h4>
                            <p>Once you delete an item, there is no going back. Please be certain.</p>
                            <form className="input-group" onSubmit={_onClickConfirmDelete}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="confirm" 
                                    placeholder="Please write the item name here..." 
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    required
                                />
                                <button 
                                    type="submit" 
                                    id="button-addon2"
                                    className="btn btn-outline-danger px-5" 
                                >
                                    {isLoadingDelete ? 'Loading...' : 'Delete'}
                                </button>
                            </form>
                        </Card>
                    </div>
                </div>
            }       
            {
                message &&
                <AlertDialog 
                    message={message} 
                    closeAlert={() => setMessage(null)}
                />
            }
        </div>
    )
}



// const postItemList = async (rawData, imageUrl) => {
//     // Set headers
//     let myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
    
//     // Initial request options
//     let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mst_nft`
//     let raw = JSON.stringify({...rawData, image_url: imageUrl});
//     let requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };

//     // Call API
//     const response = await fetch(apiUrl, requestOptions)
//     const result = await response.json()
//     console.log(result)
//     // Response
//     if (result.status) {
//         return true
//     }
//     else {
//         return false
//     }
// }


// const postImage = async (item) => {
//     // Validate image
//     if (!item.image) {
//         alert('Image is required!')
//         return false
//     };

//     // Upload image to aws
//     const { url } = await uploadFileS3(item.image)
//     return url
// }

