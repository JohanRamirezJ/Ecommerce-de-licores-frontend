import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productService';
import { mapImage } from '../utils/imageMapper';

// Images
import slider1 from '../assets/images/slider1.jpg';
import slider2 from '../assets/images/slider2.jpg';
import slider3 from '../assets/images/slider3.jpg';

const Home = () => {
    const [featuredProducts1, setFeaturedProducts1] = useState([]);
    const [featuredProducts2, setFeaturedProducts2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await obtenerProductos();
                if (Array.isArray(data)) {
                    const mid = Math.ceil(data.length / 2);
                    setFeaturedProducts1(data.slice(0, mid));
                    setFeaturedProducts2(data.slice(mid));
                }
            } catch (error) {
                console.error("Error loading home products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div className="header-content">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="mySwiper-1"
                >
                    <SwiperSlide><img src={slider1} alt="Premium Liquor 1" /></SwiperSlide>
                    <SwiperSlide><img src={slider2} alt="Premium Liquor 2" /></SwiperSlide>
                    <SwiperSlide><img src={slider3} alt="Premium Liquor 3" /></SwiperSlide>
                </Swiper>
                <Link to="/productos" className="enlace">Ver Catálogo Completo</Link>
            </div>

            <section className="bee">
                <div className="container" style={{ position: 'relative' }}>
                    {loading ? <p style={{ color: 'white', textAlign: 'center' }}>Cargando destacados...</p> : (
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            loop={featuredProducts1.length >= 4}
                            navigation={true}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                520: { slidesPerView: 2 },
                                950: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 }
                            }}
                            className="mySwiper-2"
                            style={{ padding: '20px 0' }}
                        >
                            {featuredProducts1.map((product, index) => (
                                <SwiperSlide key={product.id || `p1-${index}`}>
                                    <ProductCard
                                        title={product.nombre}
                                        description={product.descripcion}
                                        price={product.precio}
                                        imgString={mapImage(product.imagen)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </section>

            <section className="nosotros">
                <div className="nosotros-txt container">
                    <h2>Expertos en</h2>
                    <p>Licores de<br /> <span>Alta Calidad</span></p>
                </div>
                <div className="info container"> <Link to="/productos" className="enlace">Explorar Ofertas</Link> </div>
            </section>

            <section className="bee">
                <div className="container" style={{ position: 'relative' }}>
                    {loading ? <p style={{ color: 'white', textAlign: 'center' }}>Cargando destacados...</p> : (
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            loop={featuredProducts2.length >= 4}
                            navigation={true}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                520: { slidesPerView: 2 },
                                950: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 }
                            }}
                            className="mySwiper-2"
                            style={{ padding: '20px 0' }}
                        >
                            {featuredProducts2.map((product, index) => (
                                <SwiperSlide key={product.id || `p2-${index}`}>
                                    <ProductCard
                                        title={product.nombre}
                                        description={product.descripcion}
                                        price={product.precio}
                                        imgString={mapImage(product.imagen)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
