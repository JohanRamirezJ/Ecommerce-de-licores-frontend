import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState('');

    const SHIPPING_COST = 10000;
    const totalAmount = cartTotal + SHIPPING_COST;

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [cartItems.length, navigate]);

    const handlePay = (e) => {
        e.preventDefault();
        if (!paymentMethod) return;

        setTimeout(() => {
            const generatedOrderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
            setOrderId(generatedOrderId);
            setShowModal(true);
            clearCart();
        }, 1500);
    };

    const handleGoHome = () => {
        setShowModal(false);
        navigate('/');
    };

    const formatCOP = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(n || 0);

    if (cartItems.length === 0) return null;

    return (
        <div className="bee">
            <Breadcrumbs />

            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 className="titulo-categorias1">Finalizar Pedido</h1>
                    <p className="titulo-categorias2">Completa los detalles para recibir tu compra.</p>
                </div>

                <form onSubmit={handlePay} className="checkout-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div className="checkout-section">
                            <div className="section-title">
                                <i className="ri-wallet-3-line"></i> Método de Pago
                            </div>

                            <div className="payment-option-list">
                                <div className={`payment-option ${paymentMethod === 'nequi' ? 'active' : ''}`} onClick={() => setPaymentMethod('nequi')}>
                                    <input type="radio" checked={paymentMethod === 'nequi'} readOnly />
                                    <div className="payment-icon" style={{ background: '#FF006B' }}>N</div>
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Nequi</h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pago digital instantáneo</p>
                                    </div>
                                </div>

                                <div className={`payment-option ${paymentMethod === 'daviplata' ? 'active' : ''}`} onClick={() => setPaymentMethod('daviplata')}>
                                    <input type="radio" checked={paymentMethod === 'daviplata'} readOnly />
                                    <div className="payment-icon" style={{ background: '#ED1C24' }}>D</div>
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Daviplata</h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Billetera digital Davivienda</p>
                                    </div>
                                </div>

                                <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                                    <input type="radio" checked={paymentMethod === 'card'} readOnly />
                                    <div className="payment-icon" style={{ background: '#1a237e' }}>
                                        <i className="ri-bank-card-line"></i>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Tarjeta Débito/Crédito</h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Visa, Mastercard</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="checkout-section">
                            <div className="section-title">
                                <i className="ri-map-pin-line"></i> Dirección de Entrega
                            </div>

                            <div className="form-group">
                                <label>Dirección completa</label>
                                <div className="form-input-container">
                                    <input type="text" placeholder="Calle 123 #45-67" required />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label>Ciudad</label>
                                    <div className="form-input-container">
                                        <input type="text" placeholder="Bogotá" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <div className="form-input-container">
                                        <input type="tel" placeholder="3001234567" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <div className="checkout-section">
                            <div className="section-title">
                                <i className="ri-shopping-cart-line"></i> Resumen
                            </div>

                            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                                        <img src={item.img} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                        <div style={{ flex: 1 }}>
                                            <h5 style={{ fontSize: '13px', fontWeight: '700' }}>{item.title}</h5>
                                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.qty} x {formatCOP(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-item">
                                <span>Subtotal</span>
                                <span>{formatCOP(cartTotal)}</span>
                            </div>
                            <div className="summary-item">
                                <span>Envío</span>
                                <span>{formatCOP(SHIPPING_COST)}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>{formatCOP(totalAmount)}</span>
                            </div>

                            <button
                                type="submit"
                                className="btn-buy"
                                disabled={!paymentMethod}
                                style={{ width: '100%', marginTop: '20px', opacity: paymentMethod ? 1 : 0.5 }}
                            >
                                <i className="ri-lock-line" style={{ marginRight: '8px' }}></i>
                                PAGAR AHORA
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="checkout-section" style={{ maxWidth: '450px', width: '100%', textAlign: 'center', border: '1px solid var(--primary)' }}>
                        <div style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '40px', color: 'var(--bg-dark)' }}>
                            <i className="ri-check-line"></i>
                        </div>
                        <h2 style={{ color: 'var(--primary)', fontSize: '28px', marginBottom: '10px' }}>¡Compra Exitosa!</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Tu pedido {orderId} ha sido procesado.</p>
                        <button onClick={handleGoHome} className="btn-buy" style={{ marginTop: '25px' }}>
                            VOLVER AL INICIO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
