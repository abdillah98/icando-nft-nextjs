import Link from 'next/link';
import Image from 'next/image';

export default function ButtonCircle({icon, theme, active, withLink, onClick}) {
	return (
		<>
			{
				withLink ?
				<Link href={withLink}>
				    <a>
						<button 
							type="button" 
							className={`btn-circle ${theme} ${active}`}
							onClick={onClick}
						>
							<Image src={icon} alt="image-icons"/>
						</button>
					</a>
				</Link>
				:
				<button 
					type="button" 
					className={`btn-circle ${theme}`}
					onClick={onClick}
				>
					<Image src={icon}/>
				</button>
			}
		</>
		
	)
}