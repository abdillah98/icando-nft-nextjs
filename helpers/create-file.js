import { postJsonFile } from '../endpoint';

export async function createFile(jsonObject) {
	
	if (!jsonObject) {
		alert('File is required!')
		return false
	}

	const content = JSON.stringify(jsonObject)
    const mimeType = { type: 'text/javascript' }
    const blob = new Blob([content], mimeType)
    const url = URL.createObjectURL(blob)
    return { blob, url }
}

export async function createMetadata(jsonObject) {
	const filename = `${jsonObject.id}.json`;
	const { blob } = await createFile(jsonObject);
	const metadataUrl = await postJsonFile(blob, filename)
	return metadataUrl
}

export async function readJson(fileUrl) {
	const url = URL.createObjectURL(fileUrl)
	console.log(url)
	const response = await fetch(url)
	const json = await response.json()
	return json
}