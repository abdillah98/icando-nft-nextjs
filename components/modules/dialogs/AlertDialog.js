import Image from 'next/image';
import iconError from '../../../public/icons/icon-error.svg';
import iconSuccess from '../../../public/icons/icon-success.svg';

export default function AlertDialog({message, closeAlert}) {

	const iconImage = message?.icon === 'success' 
		? iconSuccess 
		: iconError

	const textTitle = message?.icon === 'success' 
		? 'text-success' 
		: 'text-danger'

	const borderColor = message?.icon === 'success' 
		? 'border-success' 
		: 'border-danger'

	return (
		<>
			{
				message &&
				<div className={`alert-dialog border ${borderColor}`}>
				    <div className="alert-dialog-icon">
				        <Image src={iconImage} width={22} height={22} alt="icon-alert"/>
				    </div>
				    <div className="d-flex flex-column ms-2">
				        <strong className={textTitle}>{message.title}</strong>
				        <span>{message.description}</span>
				    </div>
				    <button type="button" className="btn-close ms-3" onClick={closeAlert}/>
				</div>
			}
		</>
	)
}