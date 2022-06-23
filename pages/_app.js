import React, { useState, createContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import { Layout } from '../components/layouts' 
import { MoralisProvider } from "react-moralis";
// import { UserProvider  } from '../contexts/UserContext'

// const serverUrl = 'https://udpq44h9zidh.usemoralis.com:2053/server';
// const appId = '9uPH63Fs7xRCzytVA35FeFT7mHB33GYN3WZfjq70';

const serverUrl = 'https://irvnqz4jehgx.usemoralis.com:2053/server';
const appId = 'dKxSWONknDTuFmewcm7LSM8VBmXMu99quaxXQ3Al';

function MyApp({ Component, pageProps }) {

	return (
		<MoralisProvider appId={appId} serverUrl={serverUrl} >
			<Layout>
		  		<Component {...pageProps} />
		  	</Layout>
	  	</MoralisProvider>
	)
}

export default MyApp
