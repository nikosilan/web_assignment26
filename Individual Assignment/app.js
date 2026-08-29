const API_URL =
    "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";


const restaurantList =
    document.querySelector("#restaurant-list");

const menuSection =
    document.querySelector("#menu-section");

const restaurantName =
    document.querySelector("#restaurant-name");

const dailyMenuButton =
    document.querySelector("#daily-menu-button");

const weeklyMenuButton =
    document.querySelector("#weekly-menu-button");

const menuContainer =
    document.querySelector("#menu-container");


let selectedRestaurant = null;


// HAE RAVINTOLAT
async function getRestaurants() {

    console.log("Haetaan ravintoloita...");

    try {

        const response = await fetch(API_URL);

        console.log("API response:", response);

        if (!response.ok) {
            throw new Error(
                "HTTP error: " + response.status
            );
        }

        const restaurants = await response.json();

        console.log(
            "API palautti ravintoloita:",
            restaurants.length
        );

        if (!Array.isArray(restaurants)) {
            throw new Error(
                "API ei palauttanut taulukkoa."
            );
        }

        displayRestaurants(restaurants);

    } catch (error) {

        console.error(
            "Ravintoloiden hakeminen epäonnistui:",
            error
        );

        restaurantList.textContent =
            "Ravintoloiden lataaminen epäonnistui.";
    }
}


// NÄYTÄ RAVINTOLAT
function displayRestaurants(restaurants) {

    restaurantList.innerHTML = "";

    restaurants.forEach(function (restaurant) {

        const card =
            document.createElement("article");

        card.classList.add("restaurant-card");


        const title =
            document.createElement("h3");

        title.textContent =
            restaurant.name;


        const address =
            document.createElement("p");

        address.textContent =
            restaurant.address || "";


        const city =
            document.createElement("p");

        city.textContent =
            (restaurant.postalCode || "") +
            " " +
            (restaurant.city || "");


        const company =
            document.createElement("p");

        company.textContent =
            "Palveluntarjoaja: " +
            (restaurant.company || "Ei tiedossa");


        card.appendChild(title);
        card.appendChild(address);
        card.appendChild(city);
        card.appendChild(company);


        card.addEventListener(
            "click",
            function () {

                selectRestaurant(restaurant);

            }
        );


        restaurantList.appendChild(card);

    });
}


// VALITSE RAVINTOLA
function selectRestaurant(restaurant) {

    selectedRestaurant =
        restaurant;


    console.log(
        "Valittu ravintola:",
        restaurant.name
    );


    restaurantName.textContent =
        restaurant.name;


    menuSection.classList.remove(
        "hidden"
    );


    menuContainer.textContent =
        "Valitse päivän tai viikon menu.";
}


// PÄIVÄN MENU
function showDailyMenu() {

    if (selectedRestaurant === null) {
        return;
    }


    console.log(
        "Päivän menu:",
        selectedRestaurant.name
    );


    menuContainer.textContent =
        "Päivän menu tulee seuraavassa vaiheessa.";
}


// VIIKON MENU
function showWeeklyMenu() {

    if (selectedRestaurant === null) {
        return;
    }


    console.log(
        "Viikon menu:",
        selectedRestaurant.name
    );


    menuContainer.textContent =
        "Viikon menu tulee seuraavassa vaiheessa.";
}


// NAPIT
dailyMenuButton.addEventListener(
    "click",
    showDailyMenu
);


weeklyMenuButton.addEventListener(
    "click",
    showWeeklyMenu
);


console.log("Käynnistetään sovellus...");

getRestaurants();

