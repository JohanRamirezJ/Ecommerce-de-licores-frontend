import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show breadcrumbs on home page
    if (location.pathname === '/') return null;

    const breadcrumbLabels = {
        'productos': 'Productos',
        'pago': 'Pago',
        'login': 'Iniciar Sesión',
        'inventario': 'Inventario'
    };

    return (
        <nav className="breadcrumbs container" style={{ padding: '10px 0', fontSize: '14px', color: '#ccc' }}>
            <Link to="/" style={{ color: '#ffc107', textDecoration: 'none' }}>Inicio</Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const label = breadcrumbLabels[value] || value.charAt(0).toUpperCase() + value.slice(1);

                return last ? (
                    <span key={to} style={{ color: '#fff' }}>
                        {' > '} {label}
                    </span>
                ) : (
                    <span key={to}>
                        {' > '} <Link to={to} style={{ color: '#ffc107', textDecoration: 'none' }}>{label}</Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
