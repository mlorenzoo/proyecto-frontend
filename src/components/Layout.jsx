import { Header } from './Header';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <div data-bs-theme="dark" style={{ 
            minHeight: '100vh', 
            overflow: 'auto',
            position: 'relative', // Establecer la posición del contenedor
        }}>
            {/* <div style={{ 
                backgroundImage: `url('/src/assets/shop.jpeg')`, // Establecer la imagen como fondo
                backgroundSize: '100% 100%', // Ajustar el tamaño de la imagen para cubrir el contenedor
                backgroundPosition: 'center', // Centrar la imagen
                position: 'absolute', // Establecer la posición absoluta
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                marginLeft: '35%',
            }} /> */}
            <Header />
            <main className="p-5">
                <Container fluid style={{ minHeight: '84vh', overflow: 'hidden'}}>
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default Layout;
