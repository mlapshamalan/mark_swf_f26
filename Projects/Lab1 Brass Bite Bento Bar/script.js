const MENU_ITEMS = [{
    id: 1,
    name: "Gear-Griddle Bento",
    description: "Crisp rice, smoked tofu, brass-pepper glaze.",
    price: 12.50,
    category: "Breakfast"
}, {
    id: 2,
    name: "Clockwork Porridge",
    description: "Steel-cut oats, cinnamon steam-apples, copper-kettle honey.",
    price: 9.00,
    category: "Breakfast"
}, {
    id: 3,
    name: "Pneumatic Pancake Stack",
    description: "Fluffy buttermilk cakes, spiced maple drizzle, marrow butter.",
    price: 14.00,
    category: "Breakfast"
}, {
    id: 4,
    name: "Cog & Sprocket Salmon Bento",
    description: "Teriyaki glaze salmon, short-grain steamed rice, pressure-cooked edamame.",
    price: 22.50,
    category: "Lunch"
}, {
    id: 5,
    name: "Mechanized Marinated Ribs",
    description: "Brass-roasted pork ribs, spiced sesame noodles, pickled radish.",
    price: 26.00,
    category: "Lunch"
}, {
    id: 6,
    name: "Pneumatic Pulled Poultry",
    description: "Steam-shredded duck breast, plum dipping glaze, pickled mustard greens.",
    price: 24.00,
    category: "Lunch"
}, {
    id: 7,
    name: "Steam-Puffed Tofu Delight",
    description: "Crispy pressed tofu, roasted sweet potato, sesame wakame salad.",
    price: 19.00,
    category: "Lunch"
}, {
    id: 8,
    name: "Airship Captain's Feast",
    description: "Prime braised beef brisket, miso glazed eggplant, steamed gyoza.",
    price: 29.50,
    category: "Dinner"
}, {
    id: 9,
    name: "The Hound's Reserve",
    description: "Unseasoned slow-simmered steak tips, steamed pumpkin purée, bone marrow reduction.",
    price: 21.00,
    category: "Dinner"
}, {
    id: 10,
    name: "Pressure-Vessel Black Cod",
    description: "Miso-marinated black cod, lotus root chips, steam-dusted scallions.",
    price: 31.00,
    category: "Dinner"
}];

// Price Formatting
const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD"
});

// Dom Rendering
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("menu-table-body");

    // Check if we are on menu.html
    if (tableBody) {
        renderMenuItems(MENU_ITEMS, tableBody);
    }
});

function renderMenuItems(items, container) {
    container.innerHTML = ""; // Clear existing content

    items.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td><span class="badge bg-secondary mb-1">${item.category}</span><br>${item.description}</td>
            <td>${currencyFormatter.format(item.price)}</td>
        `;

        container.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Menu rendering check (existing)
    const tableBody = document.getElementById("menu-table-body");
    if (tableBody) {
        renderMenuItems(MENU_ITEMS, tableBody);
    }

    // Reservation form validation check
    const resForm = document.getElementById("reservation-form");
    if (resForm) {
        resForm.addEventListener("submit", handleReservationSubmit);
    }
});

function handleReservationSubmit(event) {
    event.preventDefault(); // Prevent page reload / default submit behavior

    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = ""; // Clear previous alert messages

    const errors = [];

    // Extract values
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const partySize = document.getElementById("party-size").value;
    const date = document.getElementById("res-date").value;
    const time = document.getElementById("res-time").value;
    const selectedSeating = document.querySelector('input[name="seating_preference"]:checked');
    const dietaryNotes = document.getElementById("dietary-notes").value.trim();
    const newsletter = document.getElementById("newsletter").checked;

    // --- Validation Rules ---
    // 1. Name: required, max 20 chars
    if (!fullName) {
        errors.push("Full Name is required.");
    } else if (fullName.length > 20) {
        errors.push("Full Name must not exceed 20 characters.");
    }

    // 2. Email: required & basic pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push("Email address is required.");
    } else if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    // 3. Party Size: required (1-8)
    const partyNum = parseInt(partySize, 10);
    if (!partySize || isNaN(partyNum) || partyNum < 1 || partyNum > 8) {
        errors.push("Please select a valid party size (1–8 guests).");
    }

    // 4. Date: required
    if (!date) {
        errors.push("Reservation date is required.");
    }

    // 5. Time: required
    if (!time) {
        errors.push("Reservation time is required.");
    }

    // 6. Seating: required
    if (!selectedSeating) {
        errors.push("Please select a seating preference.");
    }

    // 7. Dietary Notes: optional, max 30 chars
    if (dietaryNotes.length > 30) {
        errors.push("Dietary notes must not exceed 30 characters.");
    }

    // --- Display Alert Results (Requirement C3) ---
    if (errors.length > 0) {
        // Create Bootstrap Error Alert (.alert.alert-danger)
        const errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger alert-dismissible fade show";
        errorAlert.setAttribute("role", "alert");

        const errorListHtml = errors.map(err => `<li>${err}</li>`).join("");
        errorAlert.innerHTML = `
            <strong><i class="fa-solid fa-triangle-exclamation me-2"></i>Transmission Error!</strong> Please correct the following:
            <ul class="mb-0 mt-2 ps-3">${errorListHtml}</ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        alertContainer.appendChild(errorAlert);
    } else {
        // Build required payload object (Requirement C4)
        const reservationPayload = {
            name: fullName,
            email: email,
            partySize: partyNum,
            date: date,
            time: time,
            seating: selectedSeating.value,
            dietaryNotes: dietaryNotes,
            newsletter: newsletter
        };

        // Log required object to browser console
        console.log("Reservation Request Transmitted Successfully:", reservationPayload);

        // Create Bootstrap Success Alert (.alert.alert-success)
        const successAlert = document.createElement("div");
        successAlert.className = "alert alert-success alert-dismissible fade show";
        successAlert.setAttribute("role", "alert");
        successAlert.innerHTML = `
            <strong><i class="fa-solid fa-circle-check me-2"></i>Dispatch Received!</strong> 
            Your reservation request for <strong>${partyNum} guest(s)</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been logged and transmitted to High Command.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        alertContainer.appendChild(successAlert);

        // Reset form upon success
        event.target.reset();
    }
}