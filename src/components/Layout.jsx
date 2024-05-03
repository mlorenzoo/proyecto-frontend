import { Header } from './Header'
import { Container } from 'react-bootstrap'

const Layout = ({ children }) => {
	return (
		<div data-bs-theme="dark">
			<Header />
			<main className="p-5">
				<Container >{children}</Container>
			</main>
		</ div>
	)
}

export default Layout