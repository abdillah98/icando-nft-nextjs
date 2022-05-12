import { useState } from 'react';
import uploadFileS3 from '../helpers/s3'

export default function Upload() {
	const [imgUrl, setImgUrl] = useState(null)

	const handleFileChange = async (e) => {
		const file = e.target.files[0]
		const { url } = await uploadFileS3(file)
		console.log(url)
		setImgUrl(url)
	}

	return (
		<div className="container">
			<h3>Upload</h3>
			<input type="file" onChange={handleFileChange} />
			<br />
			<br />
			{imgUrl && <img src={imgUrl} alt="img-file" />}
		</div>
	)
}