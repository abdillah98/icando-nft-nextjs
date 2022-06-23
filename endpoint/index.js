import Web3 from 'web3'
import uploadFileS3 from '../helpers/s3'
// import { 
// 	contractAddress, 
// 	contractABI,
// } from '../contracts'
import imageDefault from '../public/images/image.png'


// Initial variable
const web3 = new Web3(Web3.givenProvider)
const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Get nft before mint list
export async function getItemList() {
	const apiUrl = `${API_URL}/mst_nft`
	
	const requestOptions = {
		method: 'GET',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		
		if (result.status) {
			const filterIsMinted = result?.data?.filter(item => !item.minted)
			const newResult = filterIsMinted?.map(item => ({
				id: item.id,
				name: item.name,
				image_url: item.image_url !== '' || item.image_url !== null ? item.image_url : imageDefault,
				level: item.level_id,
				minted: item.minted,
				metadata: item.metadata,
				metadata_url: item.metadata_url,
				description: item.description,
				created_time: item.created_time,
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

// Add nft new item
export async function postItem(rawData, imageUrl) {
    let apiUrl = `${API_URL}/mst_nft`
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // Initial request options
    let raw = JSON.stringify({...rawData, image_url: imageUrl});
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // Call API
    const response = await fetch(apiUrl, requestOptions)
    const result = await response.json()
    
    // Response
    if (result.status) {
    	return {
    		status: result.status,
    		message: 'Item added successfully.',
    		data: rawData
    	}
    } 
    else {
    	return {
    		status: result.status,
    		message: 'Item failed to add.',
    		data: rawData
    	}
    }
}

// Add nft new item
export async function putItem(rawData, imageUrl = null) {
    let apiUrl = `${API_URL}/mst_nft/${rawData.id}`
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // Initial request options
    let raw = JSON.stringify({
    	...rawData, 
    	image_url: imageUrl ? imageUrl : rawData.image_url
    });
   

    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    console.log(requestOptions)

    // Call API
    const response = await fetch(apiUrl, requestOptions)
    const result = await response.json()
    
    // Response
    if (result.status) {
    	return {
    		status: result.status,
    		message: 'Item Update successfully.',
    		data: rawData
    	}
    } 
    else {
    	return {
    		status: result.status,
    		message: 'Item failed to Update.',
    		data: rawData
    	}
    }
}

// Delete nft before mint
export async function deleteItem(id) {
	const apiUrl = `${API_URL}/mst_nft/${id}`
	
	const requestOptions = {
		method: 'DELETE',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		return result.status
	}
	catch (error) {
		console.log(error)
	}
}

// Get single nft 
export async function getItem(id) {
    const apiUrl = `${API_URL}/mst_nft/${id}`
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions)
        const result = await response.json()
        
        if (result.status) {
        	const metadata = result.data?.metadata !== null ? result.data?.metadata : '';
            const newResult = {
                id: result.data?.id,
                name: result.data?.name,
                description: result.data?.description,
                image_url: result.data?.image_url,
                metadata: metadata ,
                metadata_url: result.data?.metadata_url,
                minted: result.data?.minted,
            }
            return newResult
        }
        else {
            return null
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Get nft minted list
export async function getCollectionList() {
	const apiUrl = `${API_URL}/mst_nft`
	
	const requestOptions = {
		method: 'GET',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		
		if (result.status) {
			const filterIsMinted = result?.data?.filter(item => item.minted)
			const newResult = filterIsMinted?.map(item => ({
				id: item.id,
				name: item.name,
				image_url: item.image_url,
				level: item.level_id,
				minted: item.minted,
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

// Upload and get image url
export async function postImage(item) {
    // Validate image
    if (!item.image) {
        alert('Image is required!')
        return false
    };

    // Upload image to aws
    const { url } = await uploadFileS3(item.image, 'nft')
    return url
}

// Upload and get image url
export async function postJsonFile(file, filename = null) {
	// Validate file
    if (!file) {
        alert('File is required!')
        return false
    };

    // Upload image to aws
    const { url } = await uploadFileS3(file, 'metadata', filename)
    return url
}

// Minter items to smart contract
export async function mintItems(mintOptions) {
// export async function mintItems(metadataUrl = [], accounts = null) {
	const {
		accounts,
		metadataUrl,
		contractAddress,
		contractABI
	} = mintOptions

	console.log(accounts)
	console.log(metadataUrl)
	console.log(contractAddress)
	console.log(contractABI)

	if (accounts.length > 0 && metadataUrl.length > 0) {
	    try {
			const contract = new web3.eth.Contract(contractABI, contractAddress)
	    	const response = await contract.methods
	    	    // .mint(metadataUrl)
	    	    .safeMint(accounts[0], metadataUrl)
	    	    .send({from: accounts[0]})

            console.log('mintItems')
            console.log(response)
	    	if (response) {
	    	    const tokenId = response.events.Transfer.returnValues.tokenId
	    	    return {
	    	    	status: true,
	    			message: 'Item mint successed!',
	    			tokenAddress: contractAddress,
	    			tokenId: tokenId
	    	    }
	    	}
	    }
	    catch (error) {
	    	return {
	    		status: false,
	    		message: 'Something wrong!'
	    	}
	    }
	}
	else {
		return {
			status: false,
			message: 'Metadata url or Contract Address null'
		}
	}
}

// Get List Smart Contract
export async function getSmartContractList() {
	const apiUrl = `${API_URL}/smart_contract`
	
	const requestOptions = {
		method: 'GET',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		if (result.status) {
			return result.data
		}
		else {
			return []
		}
	}
	catch (error) {
		console.log(error)
	}
}

// Add new smart contract
export async function postSmartContract(rawData) {
    let apiUrl = `${API_URL}/smart_contract`
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // Initial request options
    let raw = JSON.stringify({...rawData});
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    console.log('postSmartContract')
    console.log(raw)

    // Call API
    const response = await fetch(apiUrl, requestOptions)
    const result = await response.json()
    
    // Response
    if (result.status) {
    	return {
    		status: result.status,
    		message: 'Smart Contract added successfully.',
    		data: rawData
    	}
    } 
    else {
    	return {
    		status: result.status,
    		message: 'Smart Contract failed to add.',
    		data: rawData
    	}
    }
}


// Update smart contract
export async function putSmartContract(rawData) {
    let apiUrl = `${API_URL}/smart_contract/${rawData.id}`
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // Initial request options
    let raw = JSON.stringify({...rawData});
   
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // Call API
    const response = await fetch(apiUrl, requestOptions)
    const result = await response.json()
    
    // Response
    if (result.status) {
    	return {
    		status: result.status,
    		message: 'Smart contract Update successfully.',
    		data: rawData
    	}
    } 
    else {
    	return {
    		status: result.status,
    		message: 'Smart contract failed to Update.',
    		data: rawData
    	}
    }
}


// Delete Smart Contract
export async function deleteSmartContract(id) {
	const apiUrl = `${API_URL}/smart_contract/${id}`
	
	const requestOptions = {
		method: 'DELETE',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		return result.status
	}
	catch (error) {
		console.log(error)
	}
}