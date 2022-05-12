/** @type {import('next').NextConfig} */
const nextConfig = {
  	reactStrictMode: true,
  	images: {
     	domains: [
     		'illustoon.com', 
     		'ipfs.moralis.io', 
     		'gudang-icando.s3.ap-southeast-1.amazonaws.com'
     	]
  	},
}

module.exports = nextConfig
