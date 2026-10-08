
const API_URL =
    "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Palvelin palautti virheen ${response.status}.`);
    }

    return response.json();
}

export async function getRestaurants() {
    const restaurants = await fetchJson(API_URL);

    if (!Array.isArray(restaurants)) {
        throw new Error("Ravintoloiden tiedot eivät ole odotetussa muodossa.");
    }

    return restaurants;
}

export async function getDailyMenu(restaurantId) {
    return fetchJson(
        `${API_URL}/daily/${encodeURIComponent(restaurantId)}/fi`
    );
}

export async function getWeeklyMenu(restaurantId) {
    return fetchJson(
        `${API_URL}/weekly/${encodeURIComponent(restaurantId)}/fi`
    );
}