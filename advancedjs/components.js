export const restaurantRow = (restaurant) => {
    const { name, company } = restaurant;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${company || "Ei tiedossa"}</td>
    `;

    return row;
};

export const restaurantModal = (restaurant, menu) => {
    const {
        name,
        address,
        postalCode,
        city,
        phone,
        company
    } = restaurant;

    const { courses = [] } = menu;

    const menuHtml = courses.length
        ? `
            <ul class="menu-list">
                ${courses.map(({ name, price, diets }) => `
                    <li>
                        <strong>${name}</strong>
                        <span>${price || "?€"}</span>
                        <p>${diets || "Ei ilmoitettu"}</p>
                    </li>
                `).join("")}
            </ul>
        `
        : "<p>Tälle päivälle ei löytynyt menua.</p>";

    return `
        <div class="modal-content">
            <button class="modal-close" aria-label="Sulje">×</button>

            <h2>${name}</h2>
            <p>${address || ""}</p>
            <p>${postalCode || ""}, ${city || ""}</p>
            <p>${phone || ""}</p>
            <p>Palveluntarjoaja: ${company || "Ei tiedossa"}</p>

            <h3>Päivän menu</h3>
            ${menuHtml}
        </div>
    `;
};