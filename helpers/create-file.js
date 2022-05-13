export default async function createFile(jsonObject) {
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