const restaurants = [
    {
        name: "Metropolia Myyrmäki",
        address: "Leiritie 1, Vantaa",
        location: {
            lat: 60.2605,
            lon: 24.8442
        }
    },
    {
        name: "Metropolia Karamalmi",
        address: "Karaportti 2, Espoo",
        location: {
            lat: 60.2237,
            lon: 24.7587
        }
    },
    {
        name: "Metropolia Arabianranta",
        address: "Hämeentie 135 D, Helsinki",
        location: {
            lat: 60.2087,
            lon: 24.9762
        }
    }
];


const list =
    document.querySelector("#restaurant-list");

const status =
    document.querySelector("#status");


const calculateDistance =
    (point1, point2) => {

        const latitude =
            point1.lat - point2.lat;

        const longitude =
            point1.lon - point2.lon;

        return Math.sqrt(
            latitude ** 2 +
            longitude ** 2
        );
    };


const displayRestaurants =
    (sortedRestaurants) => {

        list.innerHTML = "";


        sortedRestaurants.forEach(
            (restaurant) => {

                const li =
                    document.createElement("li");


                li.innerHTML = `
                    <strong>
                        ${restaurant.name}
                    </strong>

                    <br>

                    ${restaurant.address}
                `;


                list.appendChild(li);
            }
        );
    };


const findNearestRestaurants =
    (position) => {

        const userLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        };


        const sortedRestaurants =
            restaurants
                .map((restaurant) => ({
                    ...restaurant,

                    distance:
                        calculateDistance(
                            userLocation,
                            restaurant.location
                        )
                }))
                .sort(
                    (a, b) =>
                        a.distance - b.distance
                );


        displayRestaurants(
            sortedRestaurants
        );


        statusElement.textContent =
            "Ravintolat järjestetty etäisyyden mukaan.";
    };


const locationError =
    (error) => {

        console.error(error);


        statusElement.textContent =
            "Sijaintia ei voitu selvittää.";

    };


if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(
        findNearestRestaurants,
        locationError
    );

} else {

    statusElement.textContent =
        "Selaimesi ei tue sijainnin hakemista.";
}