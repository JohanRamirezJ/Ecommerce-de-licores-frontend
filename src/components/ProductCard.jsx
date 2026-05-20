import { useCart } from '../context/CartContext';
import { memo } from 'react';

const ProductCard = ({ title, description, price, imgString }) => {
    const { addToCart } = useCart();

    const handleAddCart = () => {
        addToCart({ title, price, img: imgString });
    };

    const formatCOP = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(n || 0);

    return (
        <div className="product">
            <img src={imgString} alt={title} />
            <div className="product-txt">
                <h4>{title}</h4>
                <p>{description}</p>
                <div className="product-footer">
                    <span className="price">{formatCOP(price)}</span>
                    <button className="add-cart" onClick={handleAddCart} title="Añadir al carrito">
                        <i className="ri-shopping-bag-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductCard);
