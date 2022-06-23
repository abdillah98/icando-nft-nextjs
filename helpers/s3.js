export default async function uploadFileS3(file, folder, filename = null) {
	const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
	const getDate = new Date();
	const name = filename ? filename : `nft-${getDate.getTime()}-type-${file.type.substring(0, 5)}`
	
	const response = await fetch('/api/s3', {
		method: "POST",
		body: JSON.stringify({
			type: file.type,
			name: name,
			folder: folder
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

	return {url: `${BUCKET_URL}/${folder}/${name}`}
} 
