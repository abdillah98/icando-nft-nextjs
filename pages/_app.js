import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import { Layout } from '../components/layouts' 
import { MoralisProvider } from "react-moralis";

const serverUrl = 'https://udpq44h9zidh.usemoralis.com:2053/server';
const appId = '9uPH63Fs7xRCzytVA35FeFT7mHB33GYN3WZfjq70';

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
