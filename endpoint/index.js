import uploadFileS3 from '../helpers/s3'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get nft before mint list
const getItemList = async () => {
	const apiUrl = `${API_URL}/mst_nft`
	
	const requestOptions = {
		method: 'GET',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		
		if (result.status) {
			const newResult = result?.data?.map(item => ({
				id: item.id,
				name: item.name,
				image: item.image_url,
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

// Add nft new item
const postItem = async (rawData, imageUrl) => {
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
    return result.status
}

// Add nft new item
const putItem = async (rawData, imageUrl = null) => {
	console.log(rawData)
	console.log(imageUrl)
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
    return result.status
}

// Delete nft before mint
const deleteItem = async (id) => {
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
const getItem = async (id) => {
    const apiUrl = `${API_URL}/mst_nft/${id}`
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions)
        const result = await response.json()
        console.log(result)
        if (result.status) {
            const newResult = {
                id: result.data?.id,
                name: result.data?.name,
                description: result.data?.description,
                image_url: result.data?.image_url,
                metadata: result.data?.metadata,
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
const getCollectionList = async () => {
	const apiUrl = `${API_URL}/mst_nft`
	
	const requestOptions = {
		method: 'GET',
	  	redirect: 'follow'
	};

	try {
		const response = await fetch(apiUrl, requestOptions)
		const result = await response.json()
		
		if (result.status) {
			const filterIsMinted = result?.data?.filter(item => item.minted === true)
			const newResult = filterIsMinted?.map(item => ({
				id: item.id,
				name: item.name,
				image: item.image_url,
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
const postImage = async (item) => {
    // Validate image
    if (!item.image) {
        alert('Image is required!')
        return false
    };

    // Upload image to aws
    const { url } = await uploadFileS3(item.image)
    return url
}




export {
	getItemList,
	postItem,
	putItem,
	deleteItem,
	getItem,
	getCollectionList,
	postImage,
}