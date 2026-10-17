import { useState, useEffect } from 'react';
import bgMenu from '../assets/images/bg-menu.png';

// Global currency formatter required by rubric
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// Built-in fallback menu items to ensure menu displays if fetch fails
const fallbackMenuItems = [
    {
        name: "Gear-Griddle Bento",
        description: "Crisp rice patties, smoked tofu, and brass-pepper glaze.",
        price: 12.50,
        category: "Breakfast",
        img: "Gear-Griddle Bento.jpeg"
    },
    {
        name: "Clockwork Porridge",
        description: "Steel-cut oat grains infused with cinnamon and steam-drizzled honey.",
        price: 10.00,
        category: "Breakfast",
        img: "Clockwork-Porridge.jpeg"
    },
    {
        name: "Pneumatic Pancake Stack",
        description: "Air-fluffed cakes served with copper-spout maple reduction.",
        price: 11.50,
        category: "Breakfast",
        img: "pneumatic-Pancake-Stack.jpeg"
    },
    {
        name: "Cog & Sprocket Salmon Bento",
        description: "Pan-seared Atlantic salmon with ginger glaze and radish gears.",
        price: 18.00,
        category: "Lunch",
        img: "cogAndSprocketSalmonBento.jpeg"
    },
    {
        name: "Pneumatic Pulled Poultry",
        description: "Slow-pressurized chicken topped with spiced slaw on brioche.",
        price: 15.50,
        category: "Lunch",
        img: "pneumaticPulledPoultry.jpeg"
    },
    {
        name: "Steam-Puffed Tofu Delight",
        description: "Flash-steamed artisanal tofu with sesame, scallions, and tamari.",
        price: 14.00,
        category: "Lunch",
        img: "Steam-PuffedTofuDelight.jpeg"
    },
    {
        name: "Airship Captain's Feast",
        description: "Grand bento featuring wagyu steak strips, tempura greens, and rice.",
        price: 28.00,
        category: "Dinner",
        img: "airshipCaptain'sFeast.jpeg"
    },
    {
        name: "Mechanized Marinated Ribs",
        description: "Kurobuta pork ribs marinated in star anise and dark soy glaze.",
        price: 22.00,
        category: "Dinner",
        img: "mechanizedMarinatedRibs.jpeg"
    },
    {
        name: "Pressure Vessel Black Cod",
        description: "Miso-cured black cod cooked in high-pressure copper steamers.",
        price: 26.50,
        category: "Dinner",
        img: "pressureVesselBlackCod.jpeg"
    },
    {
        name: "The Hound's Reserve",
        description: "Unseasoned boiled marrow bones and beef cuts prepared for canine officers.",
        price: 13.00,
        category: "Dinner",
        img: "theHoundsReserve.jpeg"
    }
];

export default function Menu() {
    const [menuItems, setMenuItems] = useState(fallbackMenuItems);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch menu JSON from public/
    useEffect(() => {
        fetch('/menu.json')
            .then((res) => {
                // Check both status code and content-type header
                const contentType = res.headers.get('content-type');
                if (!res.ok || !contentType || !contentType.includes('application/json')) {
                    throw new Error(`Server returned status ${res.status} or non-JSON content-type`);
                }
                return res.json();
            })
            .then((data) => setMenuItems(data))
            .catch((err) => {
                console.warn('Menu fetch failed, loading fallback array:', err.message);
                setMenuItems(fallbackMenuItems);
            });
    }, []);

    // Filter items based on category selection
    const filteredMenu = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory);

    const handlePrev = () => {
        if (filteredMenu.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + filteredMenu.length) % filteredMenu.length);
    };

    const handleNext = () => {
        if (filteredMenu.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % filteredMenu.length);
    };

    const currentItem = filteredMenu[currentIndex] || filteredMenu[0];

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgMenu}) no-repeat center center fixed`,
                backgroundSize: 'cover'
            }}
        >
            <main className="container my-5 text-light flex-grow-1">
                <header className="text-center mb-4">
                    <h1 className="display-4 page-heading fw-bold text-warning">Mechanical Bento Provisions</h1>
                    <p className="lead">Pressurized flavors transmitted directly via subterranean copper pipeline.</p>
                </header>

                {/* Category Selection Filter */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-4 text-center">
                        <label htmlFor="categoryFilter" className="form-label fw-bold text-warning">
                            Filter by Category:
                        </label>
                        <select
                            id="categoryFilter"
                            className="form-select bg-dark text-light border-warning"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentIndex(0);
                            }}
                        >
                            <option value="All">All Categories</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>
                </div>

                {/* Interactive Bento Carousel Card */}
                {currentItem && (
                    <div
                        className="card bg-dark text-light border-warning shadow-lg mx-auto"
                        id="carouselCard"
                        style={{ maxWidth: '600px' }}
                    >
                        <img
                            id="carouselImg"
                            src={`/images/${encodeURIComponent(currentItem.img)}`}
                            className="card-img-top border-bottom border-warning"
                            alt={currentItem.name}
                            style={{ maxHeight: '350px', objectFit: 'cover' }}
                            onError={(e) => {
                                console.error(`Failed to load image at path: /images/${currentItem.img}`);
                            }}
                        />
                        <div className="card-body text-center">
              <span id="carouselBadge" className="badge bg-warning text-dark mb-2">
                {currentItem.category}
              </span>
                            <h3 id="carouselTitle" className="card-title text-warning">
                                {currentItem.name}
                            </h3>
                            <p id="carouselDesc" className="card-text">
                                {currentItem.description}
                            </p>
                            <h4 id="carouselPrice" className="text-warning fw-bold">
                                {currencyFormatter.format(currentItem.price)}
                            </h4>
                        </div>
                        <div className="card-footer d-flex justify-content-between bg-black border-warning">
                            <button id="prevBtn" className="btn btn-outline-warning" onClick={handlePrev}>
                                <i className="fa-solid fa-arrow-left me-1"></i> Prev
                            </button>
                            <button id="nextBtn" className="btn btn-outline-warning" onClick={handleNext}>
                                Next <i className="fa-solid fa-arrow-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}