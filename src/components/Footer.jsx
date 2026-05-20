import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={logoImg} alt="Logo Premium" className="footer-logo" />
                        <p>Ofrecemos la mejor selección de licores nacionales e internacionales con entrega garantizada y segura.</p>
                    </div>

                    <div className="footer-col">
                        <h4>Navegación</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/productos">Productos</Link></li>
                            <li><Link to="/inventario">Inventario</Link></li>
                            <li><Link to="/login">Mi Cuenta</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Soporte</h4>
                        <ul>
                            <li><a href="#">Preguntas Frecuentes</a></li>
                            <li><a href="#">Términos y Condiciones</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Síguenos</h4>
                        <div className="footer-socials">
                            <a href="#"><i className="ri-facebook-fill"></i></a>
                            <a href="#"><i className="ri-instagram-line"></i></a>
                            <a href="#"><i className="ri-twitter-fill"></i></a>
                            <a href="#"><i className="ri-whatsapp-line"></i></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Licores Premium. Todos los derechos reservados.</p>
                    <p>Diseñado con ❤️ por @code</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
