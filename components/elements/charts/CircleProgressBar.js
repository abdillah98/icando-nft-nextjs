export default function CircleProgressBar({value}) {
	const _getResultCal = () => {
		const result = (180 * value) / 100
		return result
		console.log(result)
	}

	return (
		<div className="circle-wrap">
	       	<div className="circle">
	         	<div className="mask full">
	           		<div className="fill" />
	         	</div>
	         	<div className="mask half">
	           		<div className="fill"/>
	         	</div>
	         	<div className="inside-circle"> 75% </div>
	       	</div>
	    </div>
	)
}