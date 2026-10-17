import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    useEffect(() => {
        document.body.className = 'error-page';
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <main className="container my-5 text-light flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="p-5 bg-dark border border-warning rounded shadow-lg" style={{ maxWidth: '600px' }}>
                <i className="fa-solid fa-triangle-exclamation fa-4x text-warning mb-3"></i>
                <h1 className="display-3 page-heading text-warning fw-bold">404</h1>
                <h2 className="h4 text-light mb-3">Pneumatic Route Severed</h2>
                <p className="text-secondary mb-4">
                    The subterranean path you requested could not be located in our copper maps. The high command dispatch valve is closed.
                </p>
                <Link to="/" className="btn btn-warning text-dark fw-bold px-4">
                    <i className="fa-solid fa-house me-2"></i> Return to Station
                </Link>
            </div>
        </main>
    );
}