import { useEffect } from 'react';
import bgAbout from '../assets/images/bg-about.png';

export default function About() {
    useEffect(() => {
        document.body.className = 'about-page';
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgAbout}) no-repeat center center fixed`,backgroundSize:'cover',backgroundRepeat: 'cover'}}>
        <main className="container my-5 text-light flex-grow-1">
            <header className="text-center mb-5">
                <h1 className="display-4 page-heading fw-bold text-warning">Our Mechanical Depot</h1>
                <p className="lead">Forged in steam, copper, and subterranean bulldog resolve.</p>
            </header>

            <div className="row g-4 align-items-center mb-5">
                <div className="col-lg-6">
                    <div className="bg-dark p-4 border border-warning rounded shadow">
                        <h2 className="text-warning h3 mb-3">The Brass &amp; Bite Origin</h2>
                        <p>
                            Established in 1888 under order of the Bulldog High Command, Brass &amp; Bite Bento Bar originated as an underground refueling station for steam-airship couriers and military hound handlers.
                        </p>
                        <p className="mb-0">
                            Today, our kitchen utilizes high-pressure copper boilers to flash-steam artisanal bento components, locking in nutrient-dense flavors delivered directly to your station via pneumatic transit pipes.
                        </p>
                    </div>
                </div>
                <div className="col-lg-6 text-center">
                    <img
                        src="/images/Brass&BiteBentoBarLogo.png"
                        alt="Bar Emblem"
                        className="img-fluid rounded border border-warning shadow"
                        style={{ maxHeight: '280px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="bg-dark p-4 border border-warning rounded shadow h-100">
                        <h3 className="text-warning h4 mb-3"><i className="fa-solid fa-gear me-2"></i>Automated Logistics</h3>
                        <p className="mb-0">
                            Our automated kitchen line minimizes human delays while maximizing precision cooking. Custom brass gear trains maintain uniform temperatures across every bento box compartment.
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-dark p-4 border border-warning rounded shadow h-100">
                        <h3 className="text-warning h4 mb-3"><i className="fa-solid fa-shield-dog me-2"></i>Canine Officer Support</h3>
                        <p className="mb-0">
                            We take pride in feeding the front-line working dogs of the High Command. Our unseasoned marrow cuts and protein bowls are crafted to strict veterinary dispatch standards.
                        </p>
                    </div>
                </div>
            </div>
        </main>
        </div>
    );
}