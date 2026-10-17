import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import bgHome from '../assets/images/bg-home.png';

export default function Home() {
    return (
        <div
            className="flex-grow-1 d-flex flex-column justify-content-center"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgHome}) no-repeat center center fixed`,
                backgroundSize: 'cover'
            }}
        >
            <main className="container my-5 text-light d-flex flex-column justify-content-center">
                {/* Hero Section */}
                <section className="text-center py-5 bg-dark bg-opacity-75 border border-warning rounded shadow-lg p-4 mx-auto my-auto" style={{ maxWidth: '900px' }}>
                    <img
                        src="/images/Brass&BiteBentoBarLogo.png"
                        alt="Brass & Bite Bento Bar Logo"
                        className="img-fluid mb-4"
                        style={{ maxHeight: '180px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />

                    <h1 className="display-3 page-heading text-warning fw-bold mb-3">
                        Brass &amp; Bite Bento Bar
                    </h1>

                    <p className="lead fs-4 text-light mb-4">
                        Subterranean Culinary Engineering &bull; Pressurized Bento Crafts &bull; Canine Officer Quarters
                    </p>

                    <p className="mb-4 text-secondary mx-auto" style={{ maxWidth: '650px' }}>
                        Welcome to District 9’s premier mechanized dining depot. Powered by high-pressure steam lines and served by autonomous brass couriers, our artisanal bento provisions are forged daily for high command personnel and airship crews.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                        <Link to="/menu" className="btn btn-warning btn-lg text-dark fw-bold px-4">
                            <i className="fa-solid fa-utensils me-2"></i> Inspect Menu
                        </Link>
                        <Link to="/reservations" className="btn btn-outline-warning btn-lg px-4">
                            <i className="fa-solid fa-compass me-2"></i> Reserve Table
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}