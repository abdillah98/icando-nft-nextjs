export default function CardItemsLoader({limit, theme}) {
	return (
		<div className="row pr-3">
			<div className={theme}>
				<div className="card border-0 rounded-custom-sm shadow-custom">
					<div className="card-img"/>
				  	<div className="card-body">
					    <div className="text-loader w-100 mb-2" />
					    <div className="text-loader w-50" />
				  	</div>
				</div>
			</div>
			<div className={theme}>
				<div className="card border-0 rounded-custom-sm shadow-custom">
					<div className="card-img"/>
				  	<div className="card-body">
					    <div className="text-loader w-100 mb-2" />
					    <div className="text-loader w-50" />
				  	</div>
				</div>
			</div>
			<div className={theme}>
				<div className="card border-0 rounded-custom-sm shadow-custom">
					<div className="card-img"/>
				  	<div className="card-body">
					    <div className="text-loader w-100 mb-2" />
					    <div className="text-loader w-50" />
				  	</div>
				</div>
			</div>
			<div className={theme}>
				<div className="card border-0 rounded-custom-sm shadow-custom">
					<div className="card-img"/>
				  	<div className="card-body">
					    <div className="text-loader w-100 mb-2" />
					    <div className="text-loader w-50" />
				  	</div>
				</div>
			</div>
		</div>
	)
}