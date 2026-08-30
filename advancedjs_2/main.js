import { baseUrl } from "./variables.js";

import { fetchData } from "./utils.js";

import {
    restaurantRow,
    restaurantModal
} from "./components.js";


const restaurantList =
    document.querySelector("#restaurant-list");

const modal =
    document.querySelector("#restaurant-modal");

const filterSelect =
    document.querySelector("#company-filter");


let restaurants = [];


// -------------------------
// MODAL
// -------------------------

const showModal = (restaurant, menu) => {

    modal.innerHTML =
        restaurantModal(
            restaurant,
            menu
        );

    modal.classList.remove("hidden");


    const closeButton =
        modal.querySelector(".modal-close");


    closeButton.addEventListener(
        "click",
        () => {
            modal.classList.add("hidden");
        }
    );


    modal.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {
                modal.classList.add("hidden");
            }

        },
        { once: true }
    );
};


// -------------------------
// MENU
// -------------------------

const loadMenu = async (restaurant) => {

    const menuUrl =
        `${baseUrl}/daily/${restaurant._id}/fi`;

    try {

        const menu =
            await fetchData(menuUrl);

        showModal(
            restaurant,
            menu
        );

    } catch (error) {

        console.error(error);

        showModal(
            restaurant,
            {
                courses: []
            }
        );
    }
};


// -------------------------
// NÄYTÄ RAVINTOLAT
// -------------------------

const displayRestaurants = (
    restaurantArray
) => {

    restaurantList.innerHTML = "";


    if (restaurantArray.length === 0) {

        restaurantList.innerHTML = `
            <tr>
                <td colspan="2">
                    Valitulla palveluntarjoajalla
                    ei ole ravintoloita.
                </td>
            </tr>
        `;

        return;
    }


    /*
     * MAP
     *
     * Muutetaan jokainen restaurant
     * HTML-riviksi.
     */

    const rows = restaurantArray.map(
        (restaurant) => {

            const row =
                restaurantRow(
                    restaurant
                );


            row.addEventListener(
                "click",
                () => loadMenu(restaurant)
            );


            return row;
        }
    );


    /*
     * FOREACH
     *
     * Lisätään kaikki rivit DOMiin.
     */

    rows.forEach(
        (row) => {

            restaurantList.appendChild(
                row
            );

        }
    );
};


// -------------------------
// FILTER
// -------------------------

const filterRestaurants = (
    company
) => {

    /*
     * Jos valitaan "Kaikki",
     * näytetään kaikki ravintolat.
     */

    if (company === "all") {

        displayRestaurants(
            restaurants
        );

        return;
    }


    /*
     * FILTER
     *
     * Suodatetaan ravintolat
     * company-arvon perusteella.
     */

    const filteredRestaurants =
        restaurants.filter(
            ({ company: restaurantCompany }) =>
                restaurantCompany === company
        );


    displayRestaurants(
        filteredRestaurants
    );
};


// -------------------------
// FILTERIN TAPAHTUMA
// -------------------------

filterSelect.addEventListener(
    "change",
    (event) => {

        try {

            filterRestaurants(
                event.target.value
            );

        } catch (error) {

            console.error(error);

            restaurantList.innerHTML = `
                <tr>
                    <td colspan="2">
                        Ravintoloiden
                        suodattaminen epäonnistui.
                    </td>
                </tr>
            `;
        }
    }
);


// -------------------------
// HAE RAVINTOLAT
// -------------------------

const loadRestaurants = async () => {

    try {

        restaurants =
            await fetchData(baseUrl);


        if (!Array.isArray(restaurants)) {

            throw new Error(
                "API ei palauttanut ravintolataulukkoa."
            );
        }


        displayRestaurants(
            restaurants
        );


    } catch (error) {

        console.error(
            "Ravintoloiden hakeminen epäonnistui:",
            error
        );


        restaurantList.innerHTML = `
            <tr>
                <td colspan="2">
                    Ravintoloiden lataaminen
                    epäonnistui.
                </td>
            </tr>
        `;
    }
};


// -------------------------
// KÄYNNISTÄ
// -------------------------

loadRestaurants();