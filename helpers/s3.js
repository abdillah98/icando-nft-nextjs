export default async function uploadFileS3(file) {
	const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
	const getDate = new Date();
	const filename = `nft-${getDate.getTime()}`
	
	const response = await fetch('/api/s3', {
		method: "POST",
		body: JSON.stringify({
			type: file.type,
			name: filename,
		})
	})

	const { url } = await response.json()

	await fetch(url, {
		method: "PUT",
		body: file,
		headers: {
			"Content-type": file.type
		}
	})

	const responseUrl = {url: `${BUCKET_URL}/${filename}`}
	return responseUrl
} 
