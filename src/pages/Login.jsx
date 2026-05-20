import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin, register as apiRegister } from '../services/authService';
import Breadcrumbs from '../components/Breadcrumbs';
import bgImg from '../assets/images/slider1.jpg';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState('');

    const [regName, setRegName] = useState('');
    const [regId, setRegId] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [isAuthenticated, navigate]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginEmail || !loginPassword) {
            setLoginError('Por favor completa todos los campos');
            return;
        }

        try {
            const data = await apiLogin(loginEmail, loginPassword);
            const token = data.token;
            const userData = {
                name: data.name || data.user?.name || loginEmail,
                email: data.email || data.user?.email || loginEmail,
                role: data.role || data.user?.role || 'ADMIN'
            };

            login(userData, token, rememberMe);
            const redirectURL = sessionStorage.getItem('redirectAfterLogin') || '/';
            sessionStorage.removeItem('redirectAfterLogin');
            navigate(redirectURL);
        } catch (error) {
            setLoginError(error.message || 'Correo o contraseña incorrectos');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiRegister(regName, regEmail, 'USER', regPassword);
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            setIsLogin(true);
            setLoginEmail(regEmail);
        } catch (error) {
            alert(error.message || "Error al registrar usuario");
        }
    };

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Breadcrumbs />
            <div className="login-card">
                <div className="auth-tabs">
                    <button 
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        INICIAR SESIÓN
                    </button>
                    <button 
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        REGÍSTRATE
                    </button>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLoginSubmit}>
                        {loginError && <div style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '15px', fontSize: '14px' }}>{loginError}</div>}
                        
                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <div className="form-input-container">
                                <i className="ri-mail-line"></i>
                                <input 
                                    type="email" 
                                    placeholder="ejemplo@correo.com"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <div className="form-input-container">
                                <i className="ri-lock-line"></i>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', fontSize: '13px', color: '#a1a1a1' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                Recordarme
                            </label>
                            <a href="#" style={{ color: '#edb312' }}>¿Olvidaste tu contraseña?</a>
                        </div>

                        <button type="submit" className="btn-buy" style={{ width: '100%' }}>INGRESAR</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <div className="form-input-container">
                                <i className="ri-user-line"></i>
                                <input 
                                    type="text" 
                                    placeholder="Juan Pérez"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <div className="form-input-container">
                                <i className="ri-mail-line"></i>
                                <input 
                                    type="email" 
                                    placeholder="juan@correo.com"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <div className="form-input-container">
                                <i className="ri-lock-line"></i>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-buy" style={{ width: '100%' }}>CREAR CUENTA</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
