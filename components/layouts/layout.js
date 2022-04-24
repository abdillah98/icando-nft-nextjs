import Sidebar from './sidebar';
import Content from './content';

export default function Layout({ children }) {
  return (
    <div className="wrapper">
    	<Sidebar />
      	<Content>{children}</Content>
    </div >
  )
}