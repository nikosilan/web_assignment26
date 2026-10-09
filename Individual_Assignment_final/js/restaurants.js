import { getRestaurants } from "./api.js";
import { setSelectedRestaurant } from "./state.js";
import { resetMenu } from "./menu.js";

const restaurantList = document.querySelector("#restaurant-list");
const restaurantSearch = document.querySelector("#restaurant-search");
const restaurantCount = document.querySelector("#restaurant-count");
const menuSection = document.querySelector("#menu-section");
const restaurantName = document.querySelector("#restaurant-name");
const cityFilter = document.querySelector("#city-filter");

let allRestaurants = [];

export async function loadRestaurants() {
    restaurantList.textContent = "Ladataan ravintoloita...";
    restaurantCount.textContent = "";

    try {
        allRestaurants = await getRestaurants();

        populateCityFilter(allRestaurants);
        displayRestaurants(allRestaurants);
    } catch (error) {
        console.error("Ravintoloiden lataaminen epäonnistui:", error);

        restaurantList.textContent =
            "Ravintoloita ei voitu ladata. Yritä myöhemmin uudelleen.";

        restaurantCount.textContent = "";
    }
}

function populateCityFilter(restaurants) {
    const cities = [
        ...new Set(
            restaurants
                .map((restaurant) => restaurant.city)
                .filter((city) => city && city.trim())
        )
    ].sort((a, b) => a.localeCompare(b, "fi"));

    cityFilter.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Kaikki kaupungit";
    cityFilter.appendChild(defaultOption);

    cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

function displayRestaurants(restaurants) {
    restaurantList.replaceChildren();

    restaurantCount.textContent =
        `Näytetään ${restaurants.length} ravintolaa.`;

    if (restaurants.length === 0) {
        const message = document.createElement("p");
        message.className = "status-message";
        message.textContent = "Hakuehdoilla ei löytynyt ravintoloita.";
        restaurantList.appendChild(message);
        return;
    }

    restaurants.forEach((restaurant) => {
        const card = document.createElement("article");
        card.className = "restaurant-card";

        const title = document.createElement("h3");
        title.textContent = restaurant.name || "Nimetön ravintola";

        const address = document.createElement("p");
        address.textContent =
            restaurant.address || "Osoitetta ei ilmoitettu";

        const city = document.createElement("p");
        city.textContent = [
            restaurant.postalCode,
            restaurant.city
        ].filter(Boolean).join(" ") || "Paikkakunta ei tiedossa";

        const company = document.createElement("p");
        company.textContent =
            `Palveluntarjoaja: ${restaurant.company || "Ei tiedossa"}`;

        const action = document.createElement("span");
        action.className = "card-action";
        action.textContent = "Näytä ruokalista →";

        card.append(title, address, city, company, action);

        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            `Valitse ravintola ${restaurant.name || ""}`
        );

        function selectThisRestaurant() {
            setSelectedRestaurant(restaurant);

            restaurantName.textContent =
                restaurant.name || "Valittu ravintola";

            menuSection.classList.remove("hidden");
            resetMenu();

            menuSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        card.addEventListener("click", selectThisRestaurant);

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectThisRestaurant();
            }
        });

        restaurantList.appendChild(card);
    });
}

function searchRestaurants() {
    const searchTerm = restaurantSearch.value
        .trim()
        .toLocaleLowerCase("fi");

    const selectedCity = cityFilter.value;

    const filteredRestaurants = allRestaurants.filter((restaurant) => {
        const name = (restaurant.name || "").toLocaleLowerCase("fi");
        const city = (restaurant.city || "").toLocaleLowerCase("fi");
        const address = (restaurant.address || "").toLocaleLowerCase("fi");

        const matchesSearch =
            name.includes(searchTerm) ||
            city.includes(searchTerm) ||
            address.includes(searchTerm);

        const matchesCity =
            !selectedCity || restaurant.city === selectedCity;

        return matchesSearch && matchesCity;
    });

    displayRestaurants(filteredRestaurants);
}

restaurantSearch.addEventListener("input", searchRestaurants);
cityFilter.addEventListener("change", searchRestaurants);
