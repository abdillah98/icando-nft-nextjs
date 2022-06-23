export default function ModalCustom({children, title, description, show, theme, onClose}) {
	return (
		<div className={`custom-modal ${show ? 'show' : ''}`}>
			<div className={`modal-dialog ${theme}`}>
			    <div className="modal-content border-0 shadow rounded-custom-sm">
			      	<div className="modal-header">
				        <h5 className="modal-title">{title}</h5>
				        <button type="button" className="btn-close" onClick={onClose}></button>
			      	</div>
			      	<div className="modal-body">
			      		<p className="mb-4">{description}</p>
			      		{children}
					</div>
				</div>
			</div>
		</div>
	)
}


{/*<div className={`custom-modal-md ${theme}`}>
	{children}
</div>*/}