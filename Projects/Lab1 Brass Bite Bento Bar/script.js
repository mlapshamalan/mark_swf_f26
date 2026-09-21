/**
 * Brass & Bite Bento Bar - Master Application Logic
 */

// Global currency formatter required by Rubric B1
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
});

// Built-in menu data (Acts as instant fallback if fetch is blocked locally)
const fallbackMenuItems = [{
    name: "Gear-Griddle Bento",
    description: "Crisp rice patties, smoked tofu, and brass-pepper glaze.",
    price: 12.50,
    category: "Breakfast",
    img: "Gear-Griddle Bento.jpeg"
}, {
    name: "Clockwork Porridge",
    description: "Steel-cut oat grains infused with cinnamon and steam-drizzled honey.",
    price: 10.00,
    category: "Breakfast",
    img: "Clockwork-Porridge.jpeg"
}, {
    name: "Pneumatic Pancake Stack",
    description: "Air-fluffed cakes served with copper-spout maple reduction.",
    price: 11.50,
    category: "Breakfast",
    img: "pneumatic-Pancake-Stack.jpeg"
}, {
    name: "Cog & Sprocket Salmon Bento",
    description: "Pan-seared Atlantic salmon with ginger glaze and radish gears.",
    price: 18.00,
    category: "Lunch",
    img: "cogAndSprocketSalmonBento.jpeg"
}, {
    name: "Pneumatic Pulled Poultry",
    description: "Slow-pressurized chicken topped with spiced slaw on brioche.",
    price: 15.50,
    category: "Lunch",
    img: "pneumaticPulledPoultry.jpeg"
}, {
    name: "Steam-Puffed Tofu Delight",
    description: "Flash-steamed artisanal tofu with sesame, scallions, and tamari.",
    price: 14.00,
    category: "Lunch",
    img: "Steam-PuffedTofuDelight.jpeg"
}, {
    name: "Airship Captain's Feast",
    description: "Grand bento featuring wagyu steak strips, tempura greens, and rice.",
    price: 28.00,
    category: "Dinner",
    img: "airshipCaptain'sFeast.jpeg"
}, {
    name: "Mechanized Marinated Ribs",
    description: "Kurobuta pork ribs marinated in star anise and dark soy glaze.",
    price: 22.00,
    category: "Dinner",
    img: "mechanizedMarinatedRibs.jpeg"
}, {
    name: "Pressure Vessel Black Cod",
    description: "Miso-cured black cod cooked in high-pressure copper steamers.",
    price: 26.50,
    category: "Dinner",
    img: "pressureVesselBlackCod.jpeg"
}, {
    name: "The Hound's Reserve",
    description: "Unseasoned boiled marrow bones and beef cuts prepared for canine officers.",
    price: 13.00,
    category: "Dinner",
    img: "theHoundsReserve.jpeg"
}];

let menuItems = [];
let filteredMenu = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("carouselCard")) {
        initMenuCarousel();
    }

    if (document.getElementById("reservation-form")) {
        initReservationValidation();
    }
});

/* ==========================================
   1. Menu Carousel & Filtering (Rubric B1)
   ========================================== */
async function initMenuCarousel() {
    try {
        const res = await fetch("menu.json");
        if (!res.ok) throw new Error("Fetch failed");
        menuItems = await res.json();
    } catch (e) {
        console.warn("Using fallback menu array (local file execution active):", e);
        menuItems = fallbackMenuItems;
    }

    filteredMenu = [...menuItems];
    renderCarouselItem();

    document.getElementById("prevBtn").addEventListener("click", prevImage);
    document.getElementById("nextBtn").addEventListener("click", nextImage);

    document.getElementById("categoryFilter").addEventListener("change", (e) => {
        const cat = e.target.value;
        if (cat === "All") {
            filteredMenu = [...menuItems];
        } else {
            filteredMenu = menuItems.filter(item => item.category === cat);
        }
        currentIndex = 0;
        renderCarouselItem();
    });
}

function renderCarouselItem() {
    if (filteredMenu.length === 0) return;
    const item = filteredMenu[currentIndex];

    const imgElem = document.getElementById("carouselImg");
    imgElem.src = `images/${item.img}`;
    imgElem.alt = item.name;

    document.getElementById("carouselTitle").textContent = item.name;
    document.getElementById("carouselDesc").textContent = item.description;
    document.getElementById("carouselBadge").textContent = item.category;

    // Format price using Intl.NumberFormat
    document.getElementById("carouselPrice").textContent = currencyFormatter.format(item.price);
}

function prevImage() {
    if (filteredMenu.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredMenu.length) % filteredMenu.length;
    renderCarouselItem();
}

function nextImage() {
    if (filteredMenu.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredMenu.length;
    renderCarouselItem();
}

/* ==========================================
   2. Reservation Form Validation (Rubric B2)
   ========================================== */
function initReservationValidation() {
    const form = document.getElementById("reservation-form");
    const dietaryInput = document.getElementById("res-dietary");
    const charCounter = document.getElementById("char-counter");

    if (dietaryInput && charCounter) {
        dietaryInput.addEventListener("input", () => {
            const remaining = 30 - dietaryInput.value.length;
            charCounter.textContent = remaining;
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const alertBox = document.getElementById("alert-container");
        alertBox.innerHTML = "";

        const name = document.getElementById("res-name").value.trim();
        const email = document.getElementById("res-email").value.trim();
        const partySize = document.getElementById("res-party").value;
        const date = document.getElementById("res-date").value;
        const time = document.getElementById("res-time").value;
        const seatingElem = document.querySelector('input[name="seating"]:checked');
        const seating = seatingElem ? seatingElem.value : null;
        const dietaryNotes = dietaryInput ? dietaryInput.value.trim() : "";
        const newsletter = document.getElementById("res-newsletter") ? document.getElementById("res-newsletter").checked : false;

        const errors = [];

        if (!name || name.length > 20) {
            errors.push("Full Name is required and must be 20 characters or fewer.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push("A valid telegraph email address is required.");
        }

        if (!partySize) {
            errors.push("Please select a party size (1–8).");
        }

        if (!date) {
            errors.push("Reservation date is required.");
        }

        if (!time) {
            errors.push("Reservation time is required.");
        }

        if (!seating) {
            errors.push("Please select a seating preference.");
        }

        if (dietaryNotes.length > 30) {
            errors.push("Dietary notes must not exceed 30 characters.");
        }

        if (errors.length > 0) {
            alertBox.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${errors.join("<br>")}
                </div>
            `;
        } else {
            const formData = {
                name, email, partySize: Number(partySize), date, time, seating, dietaryNotes, newsletter
            };

            // Log object to console as JSON (Rubric Requirement B2)
            console.log("Reservation Submitted as JSON:", JSON.stringify(formData, null, 2));

            alertBox.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Dispatch Confirmed! Check developer console to view transmitted JSON.
                </div>
            `;
            form.reset();
            if (charCounter) charCounter.textContent = "30";
        }
        const hiringForm = document.getElementById("hiring-form");
        if (hiringForm) {
            hiringForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const alertBox = document.getElementById("hiring-alert-container");
                alertBox.innerHTML = `
            <div class="alert alert-success" role="alert">
                Enlistment Dossier Transmitted! The High Command will review your credentials.
            </div>
        `;
                hiringForm.reset();
            });
        }
    });
}