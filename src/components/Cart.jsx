import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        changeQuantity,
        removeFromCart,
        cartTotal
    } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Tu carro está vacío. Agrega artículos antes de comprar.");
            return;
        }

        if (!isAuthenticated) {
            closeCart();
            const confirmLogin = window.confirm("Debes iniciar sesión para realizar tu compra.\n\n¿Deseas ir a la página de inicio de sesión ahora?");
            if (confirmLogin) {
                sessionStorage.setItem('redirectAfterLogin', '/pago');
                navigate('/login');
            }
            return;
        }

        closeCart();
        navigate('/pago');
    };

    const formatCOP = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(n || 0);

    return (
        <>
            <div className={`cart ${isCartOpen ? 'active' : ''}`}>
                <h2 className="cart-title">Mi canasta</h2>
                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                            <i className="ri-shopping-cart-line" style={{ fontSize: '60px', color: '#3a3a3a' }}></i>
                            <p style={{ color: '#a1a1a1', marginTop: '20px' }}>Tu carrito está vacío</p>
                            <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>Agrega productos para comenzar</p>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div className="cart-box" key={index}>
                                <img src={item.img} className="cart-img" alt={item.title} />
                                <div className="cart-detail">
                                    <h2 className="cart-product-tittle">{item.title}</h2>
                                    <span className="cart-price">{formatCOP(item.price)}</span>
                                    <div className="cart-quantity">
                                        <button type="button" onClick={() => changeQuantity(item.title, -1)}>-</button>
                                        <span className="number">{item.qty}</span>
                                        <button type="button" onClick={() => changeQuantity(item.title, 1)}>+</button>
                                    </div>
                                </div>
                                <i
                                    className="ri-delete-bin-line cart-remove"
                                    title="Eliminar"
                                    onClick={() => removeFromCart(item.title)}
                                ></i>
                            </div>
                        ))
                    )}
                </div>
                <div className="total">
                    <div className="total-title">Total</div>
                    <div className="total-price">{formatCOP(cartTotal)}</div>
                </div>
                <button className="btn-buy" onClick={handleCheckout}>Comprar ahora</button>
                <i className="ri-close-circle-line" id="cart-close" onClick={closeCart}></i>
            </div>
            <div className={`cart-overlay ${isCartOpen ? 'show' : ''}`} onClick={closeCart}></div>
        </>
    );
};

export default Cart;
