export default function Content({children, theme}) {
	return (
		<div className={`content ${theme}`}>
		    {children}
		</div>
	)
}