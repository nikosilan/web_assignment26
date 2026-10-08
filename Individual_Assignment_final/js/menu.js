
import { getDailyMenu, getWeeklyMenu } from "./api.js";
import { getSelectedRestaurant } from "./state.js";

const dailyMenuButton = document.querySelector("#daily-menu-button");
const weeklyMenuButton = document.querySelector("#weekly-menu-button");
const menuContainer = document.querySelector("#menu-container");

export function resetMenu() {
    menuContainer.replaceChildren();

    const message = document.createElement("p");
    message.className = "status-message";
    message.textContent = "Valitse päivän tai viikon ruokalista.";

    menuContainer.appendChild(message);
}

function showMessage(message, isError = false) {
    menuContainer.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.className = isError
        ? "status-message error-message"
        : "status-message";
    paragraph.textContent = message;

    menuContainer.appendChild(paragraph);
}

function displayCourse(course, headingTag = "h4") {
    const element = document.createElement("article");
    element.className = "menu-course";

    const name = document.createElement(headingTag);
    name.textContent = course.name || "Nimetön ruokalaji";

    const price = document.createElement("p");
    price.textContent = `Hinta: ${course.price ?? "Ei ilmoitettu"}`;

    const diets = document.createElement("p");
    diets.textContent =
        `Ruokavaliot: ${course.diets || "Ei ilmoitettu"}`;

    element.append(name, price, diets);

    return element;
}

function getCourses(data) {
    
    if (Array.isArray(data)) {
        return data;
    }

    return Array.isArray(data?.courses) ? data.courses : [];
}

async function showDailyMenu() {
    const restaurant = getSelectedRestaurant();

    if (!restaurant) {
        showMessage("Valitse ensin ravintola.");
        return;
    }

    showMessage("Ladataan päivän ruokalistaa...");

    try {
        const data = await getDailyMenu(restaurant._id);

        menuContainer.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "Päivän ruokalista";
        menuContainer.appendChild(heading);

        const courses = getCourses(data);

        if (courses.length === 0) {
            const message = document.createElement("p");
            message.className = "status-message";
            message.textContent =
                "Tälle päivälle ei löytynyt ruokalistaa.";
            menuContainer.appendChild(message);
            return;
        }

        courses.forEach((course) => {
            menuContainer.appendChild(displayCourse(course));
        });
    } catch (error) {
        console.error("Päivän ruokalistan lataaminen epäonnistui:", error);
        showMessage(
            "Päivän ruokalistaa ei voitu hakea. Yritä uudelleen.",
            true
        );
    }
}

async function showWeeklyMenu() {
    const restaurant = getSelectedRestaurant();

    if (!restaurant) {
        showMessage("Valitse ensin ravintola.");
        return;
    }

    showMessage("Ladataan viikon ruokalistaa...");

    try {
        const data = await getWeeklyMenu(restaurant._id);

        menuContainer.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "Viikon ruokalista";
        menuContainer.appendChild(heading);

        const days = Array.isArray(data)
            ? data
            : Array.isArray(data?.days)
                ? data.days
                : [];

        if (days.length === 0) {
            const message = document.createElement("p");
            message.className = "status-message";
            message.textContent = "Viikon ruokalistaa ei löytynyt.";
            menuContainer.appendChild(message);
            return;
        }

        days.forEach((day) => {
            const dayElement = document.createElement("section");
            dayElement.className = "menu-day";

            const date = document.createElement("h3");
            date.textContent = day.date || "Päivämäärä ei tiedossa";
            dayElement.appendChild(date);

            const courses = getCourses(day);

            if (courses.length === 0) {
                const message = document.createElement("p");
                message.textContent = "Ei ruokalistaa tälle päivälle.";
                dayElement.appendChild(message);
            } else {
                courses.forEach((course) => {
                    dayElement.appendChild(displayCourse(course, "h4"));
                });
            }

            menuContainer.appendChild(dayElement);
        });
    } catch (error) {
        console.error("Viikon ruokalistan lataaminen epäonnistui:", error);
        showMessage(
            "Viikon ruokalistaa ei voitu hakea. Yritä uudelleen.",
            true
        );
    }
}

dailyMenuButton.addEventListener("click", showDailyMenu);
weeklyMenuButton.addEventListener("click", showWeeklyMenu);