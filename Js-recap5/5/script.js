const baseUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

const tableBody = document.querySelector('#restaurant-list');
const modal = document.querySelector('#restaurant-modal');
const modalContent = document.querySelector('#modal-content');
const closeModal = document.querySelector('#close-modal');


const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
};


const showRestaurants = (restaurants) => {
    tableBody.innerHTML = '';

    restaurants.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    restaurants.forEach((restaurant) => {
        const row = document.createElement('tr');

        row.classList.add('restaurant-row');

        row.innerHTML = `
            <td>${restaurant.name}</td>
            <td>${restaurant.address}</td>
        `;

        row.addEventListener('click', async () => {
            const rows = document.querySelectorAll('.restaurant-row');

            rows.forEach((item) => {
                item.classList.remove('highlight');
            });

            row.classList.add('highlight');

            await showRestaurant(restaurant);
        });

        tableBody.appendChild(row);
    });
};


const showRestaurant = async (restaurant) => {
    modalContent.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p><strong>Address:</strong> ${restaurant.address}</p>
        <p>
            <strong>Postal code:</strong>
            ${restaurant.postalCode}
        </p>
        <p>
            <strong>City:</strong>
            ${restaurant.city}
        </p>
        <p>
            <strong>Phone:</strong>
            ${restaurant.phone}
        </p>
        <p>
            <strong>Company:</strong>
            ${restaurant.company}
        </p>

        <h3>Today's menu</h3>
        <p>Loading menu...</p>
    `;

    modal.showModal();

    try {
        const menu = await fetchData(
            `${baseUrl}/restaurants/${restaurant._id}/menu`
        );

        displayMenu(menu);
    } catch (error) {
        console.error(error);

        const menuError = document.createElement('p');

        menuError.classList.add('error');
        menuError.textContent =
            'Could not load today\'s menu.';

        modalContent.appendChild(menuError);
    }
};


const displayMenu = (menu) => {
    const menuContainer = document.createElement('div');

    if (!menu || !menu.courses || menu.courses.length === 0) {
        menuContainer.innerHTML = `
            <p>No menu available for today.</p>
        `;

        modalContent.appendChild(menuContainer);

        return;
    }

    const menuList = document.createElement('ul');

    menu.courses.forEach((course) => {
        const listItem = document.createElement('li');

        listItem.textContent = `
            ${course.name} -
            ${course.price || '?€'}
            ${course.diets || ''}
        `;

        menuList.appendChild(listItem);
    });

    menuContainer.appendChild(menuList);

    modalContent.appendChild(menuContainer);
};


const loadRestaurants = async () => {
    try {
        const restaurants = await fetchData(
            `${baseUrl}/restaurants`
        );

        showRestaurants(restaurants);
    } catch (error) {
        console.error(error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="2" class="error">
                    Could not load restaurants.
                </td>
            </tr>
        `;
    }
};


closeModal.addEventListener('click', () => {
    modal.close();
});


loadRestaurants();