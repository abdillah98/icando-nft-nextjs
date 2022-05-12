import Header from './Header'

export default function Content({children, theme}) {
	return (
		<div className={`content ${theme}`}>
			<Header />
		    {children}
		</div>
	)
}