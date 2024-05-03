import './Home.css'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import Layout from '../components/Layout'

export default function Home() {
	
	const [count, setCount] = useState(0)

	return (
		<Layout>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<section className="text-center">
							<h1 className=''>CORTEZ</h1>
							<p className=''>Cortes exclusivos,comodidad sin igual. Únete a la experiencia de suscripción</p>
							<h3>24,99€/mes</h3>
							<Button variant="secondary" className='custom-button'>SUSCRÍBETE YA</Button>{' '}
						</section>
					</div>
					<div className="col-md-6">
						<div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
