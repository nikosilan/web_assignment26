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


const showModal = (restaurant, menu) => {
    modal.innerHTML =
        restaurantModal(restaurant, menu);

    modal.classList.remove("hidden");

    const closeButton =
        modal.querySelector(".modal-close");

    closeButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

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


const loadMenu = async (restaurant) => {
    const menuUrl =
        `${baseUrl}/daily/${restaurant._id}/fi`;

    try {
        const menu =
            await fetchData(menuUrl);

        showModal(restaurant, menu);

    } catch (error) {
        console.error(
            "Menun hakeminen epäonnistui:",
            error
        );

        showModal(restaurant, {
            courses: []
        });
    }
};


const displayRestaurants = (restaurants) => {
    restaurantList.innerHTML = "";

    restaurants.forEach((restaurant) => {
        const row =
            restaurantRow(restaurant);

        row.addEventListener(
            "click",
            () => loadMenu(restaurant)
        );

        restaurantList.appendChild(row);
    });
};


const loadRestaurants = async () => {
    try {
        const restaurants =
            await fetchData(baseUrl);

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

        restaurantList.innerHTML = `
            <tr>
                <td colspan="2">
                    Ravintoloiden lataaminen epäonnistui.
                </td>
            </tr>
        `;
    }
};


loadRestaurants();