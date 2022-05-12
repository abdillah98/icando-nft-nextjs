import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
	region: process.env.S3_UPLOAD_REGION,
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    signatureVersion: process.env.S3_UPLOAD_SIGNATURE,
})

export default async function handler(req, res) {
	const { type, name } = JSON.parse(req.body)
	const fileParams = {
		Bucket: process.env.S3_UPLOAD_BUCKET,
		ACL: process.env.S3_UPLOAD_ACL,
		Key: `${process.env.S3_UPLOAD_FOLDER}/${name}`,
		ContentType: type,
		Expires: 600,
	}
	const url = await s3.getSignedUrlPromise('putObject', fileParams)
  	res.status(200).json({ url })
}