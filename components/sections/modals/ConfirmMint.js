import Image from 'next/image';
import { Button, ModalCustom } from '../../elements';
import iconWarningBig from '../../../public/icons/icon-warning-big.svg';
import iconCheck from '../../../public/icons/icon-check.svg';

export default function ConfirmMint({title, onClose, onClick}) {
	return (
        <ModalCustom
        	title={title}
        	onClose={onClose}
        	show
        >
        	<div className="d-flex flex-column align-items-center">
            	<Image src={iconWarningBig} width={100} height={100} alt="icon-warning-big" />
            	<h3>Warning!</h3>
            	<p>Are you sure you want to use this network?</p>
            	<div className="card rounded-custom-sm mb-4">
	            	<div className="card-body d-flex flex-column align-items-start">
	            		<span className="fs-sm text-muted fs-9 mb-1">POLIGON</span>
	            		<div className="d-flex justify-content-between align-items-center mb-1">
	            			<span className="me-2">0x345BC6db0d9E697507DC75A94bC207dfa0F19C64</span>
	            			<Image src={iconCheck} width={18} height={18} alt="icon-check" />
	            		</div>
	            		<span className="badge bg-secondary text-white">Testnet</span>
	            	</div>
            	</div>
            	<div className="d-flex justify-content-center w-100">
            		<Button 
            			type="button" 
            			label="Cancel" 
            			theme="danger me-2 px-4" 
            			onClick={onClose}
            		/>
            		<Button 
            			type="button" 
            			label="Yes" 
            			theme="primary px-4" 
            			onClick={onClick}
            		/>
            	</div>
        	</div>
    	</ModalCustom>
	)
}