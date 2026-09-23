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


const map =
    L.map("map").setView(
        [60.1699, 24.9384],
        11
    );


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            "&copy; OpenStreetMap contributors"
    }
).addTo(map);


restaurants.forEach(
    (restaurant) => {

        const {
            name,
            address,
            location
        } = restaurant;


        const marker =
            L.marker([
                location.lat,
                location.lon
            ]);


        marker.addTo(map);


        marker.bindPopup(`
            <h3>${name}</h3>
            <p>${address}</p>
        `);
    }
);