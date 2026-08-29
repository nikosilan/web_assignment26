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

    try {

        const response =
            await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "HTTP error: " + response.status
            );
        }

        const restaurants =
            await response.json();

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

    restaurants.forEach(
        function (restaurant) {

            const card =
                document.createElement("article");

            card.classList.add(
                "restaurant-card"
            );


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

        }
    );
}

// VALITSE RAVINTOLA
function selectRestaurant(restaurant) {

    selectedRestaurant =
        restaurant;


    restaurantName.textContent =
        restaurant.name;


    menuSection.classList.remove(
        "hidden"
    );


    menuContainer.textContent =
        "Valitse päivän tai viikon menu.";
}


// PÄIVÄN MENU
async function showDailyMenu() {

    if (selectedRestaurant === null) {
        return;
    }


    menuContainer.textContent =
        "Ladataan päivän menua...";


    const menuUrl =
        "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/" +
        selectedRestaurant._id +
        "/fi";


    try {

        const response =
            await fetch(menuUrl);


        if (!response.ok) {

            throw new Error(
                "HTTP error: " + response.status
            );
        }


        const data =
            await response.json();


        displayDailyMenu(data);

    } catch (error) {

        console.error(
            "Päivän menun hakeminen epäonnistui:",
            error
        );


        menuContainer.textContent =
            "Päivän menua ei voitu hakea.";
    }
}

// NÄYTÄ PÄIVÄN MENU
function displayDailyMenu(data) {

    menuContainer.innerHTML = "";


    const title =
        document.createElement("h3");

    title.textContent =
        "Päivän menu";


    menuContainer.appendChild(title);


    if (
        !data.courses ||
        data.courses.length === 0
    ) {

        const message =
            document.createElement("p");

        message.textContent =
            "Tälle päivälle ei löytynyt menua.";

        menuContainer.appendChild(
            message
        );

        return;
    }


    data.courses.forEach(
        function (course) {

            const courseElement =
                document.createElement("div");


            courseElement.classList.add(
                "menu-course"
            );


            const name =
                document.createElement("h4");

            name.textContent =
                course.name;


            const price =
                document.createElement("p");

            price.textContent =
                "Hinta: " +
                (course.price || "Ei ilmoitettu");


            const diets =
                document.createElement("p");

            diets.textContent =
                "Ruokavaliot: " +
                (course.diets || "Ei ilmoitettu");


            courseElement.appendChild(
                name
            );

            courseElement.appendChild(
                price
            );

            courseElement.appendChild(
                diets
            );


            menuContainer.appendChild(
                courseElement
            );

        }
    );
}

// VIIKON MENU
async function showWeeklyMenu() {

    if (selectedRestaurant === null) {
        return;
    }


    menuContainer.textContent =
        "Ladataan viikon menua...";


    const menuUrl =
        "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/" +
        selectedRestaurant._id +
        "/fi";


    try {

        const response =
            await fetch(menuUrl);


        if (!response.ok) {

            throw new Error(
                "HTTP error: " + response.status
            );
        }


        const data =
            await response.json();


        displayWeeklyMenu(data);

    } catch (error) {

        console.error(
            "Viikon menun hakeminen epäonnistui:",
            error
        );


        menuContainer.textContent =
            "Viikon menua ei voitu hakea.";
    }
}


// NÄYTÄ VIIKON MENU
function displayWeeklyMenu(data) {

    menuContainer.innerHTML = "";


    const title =
        document.createElement("h3");

    title.textContent =
        "Viikon menu";


    menuContainer.appendChild(title);


    if (
        !data.days ||
        data.days.length === 0
    ) {

        const message =
            document.createElement("p");

        message.textContent =
            "Viikon menua ei löytynyt.";

        menuContainer.appendChild(
            message
        );

        return;
    }


    data.days.forEach(
        function (day) {

            const dayElement =
                document.createElement("section");


            dayElement.classList.add(
                "menu-day"
            );


            const date =
                document.createElement("h4");

            date.textContent =
                day.date;


            dayElement.appendChild(
                date
            );


            if (
                !day.courses ||
                day.courses.length === 0
            ) {

                const message =
                    document.createElement("p");

                message.textContent =
                    "Ei ruokalistaa tälle päivälle.";

                dayElement.appendChild(
                    message
                );

            } else {

                day.courses.forEach(
                    function (course) {

                        const courseElement =
                            document.createElement("div");


                        courseElement.classList.add(
                            "menu-course"
                        );


                        const name =
                            document.createElement("h5");

                        name.textContent =
                            course.name;


                        const price =
                            document.createElement("p");

                        price.textContent =
                            "Hinta: " +
                            (course.price || "Ei ilmoitettu");


                        const diets =
                            document.createElement("p");

                        diets.textContent =
                            "Ruokavaliot: " +
                            (course.diets || "Ei ilmoitettu");


                        courseElement.appendChild(
                            name
                        );

                        courseElement.appendChild(
                            price
                        );

                        courseElement.appendChild(
                            diets
                        );


                        dayElement.appendChild(
                            courseElement
                        );

                    }
                );
            }


            menuContainer.appendChild(
                dayElement
            );

        }
    );
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


// KÄYNNISTÄ SOVELLUS
getRestaurants();