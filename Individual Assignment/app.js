const API_URL = "https://media2.edu.metropolia.fi/restaurant";

// HTML-elementit
const restaurantList = document.querySelector("#restaurant-list");
const menuSection = document.querySelector("#menu-section");
const restaurantName = document.querySelector("#restaurant-name");

const dailyMenuButton = document.querySelector("#daily-menu-button");
const weeklyMenuButton = document.querySelector("#weekly-menu-button");

const menuContainer = document.querySelector("#menu-container");


// Valittu ravintola
let selectedRestaurant = null;



// HAE RAVINTOLAT


async function getRestaurants() {

    try {

        console.log("Haetaan dataa API:sta...");

        const response = await fetch(API_URL);

        console.log("HTTP status:", response.status);
        console.log(
            "Content-Type:",
            response.headers.get("content-type")
        );

       
        const text = await response.text();

        console.log("API:n palauttama data:");
        console.log(text);

    } catch (error) {

        console.error("API-virhe:", error);

        restaurantList.innerHTML = `
            <p>
                Ravintoloiden lataaminen epäonnistui.
                Tarkista VPN-yhteys ja API-osoite.
            </p>
        `;
    }
}


// VALITSE RAVINTOLA


function selectRestaurant(restaurant) {

    selectedRestaurant = restaurant;

    console.log("Valittu ravintola:");
    console.log(restaurant);

    restaurantName.textContent = restaurant.name;

    menuSection.classList.remove("hidden");

    menuContainer.innerHTML = `
        <p>Valitse päivän tai viikon menu.</p>
    `;
}



// PÄIVÄN MENU


dailyMenuButton.addEventListener("click", () => {

    if (!selectedRestaurant) {
        return;
    }

    console.log("Päivän menu valittu");

    menuContainer.innerHTML = `
        <h3>Päivän menu</h3>
        <p>Menu haetaan seuraavassa vaiheessa.</p>
    `;
});



// VIIKON MENU


weeklyMenuButton.addEventListener("click", () => {

    if (!selectedRestaurant) {
        return;
    }

    console.log("Viikon menu valittu");

    menuContainer.innerHTML = `
        <h3>Viikon menu</h3>
        <p>Viikon menu haetaan seuraavassa vaiheessa.</p>
    `;
});



// KÄYNNISTÄ SOVELLUS


getRestaurants();