export const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        throw new Error(`Datan hakeminen epäonnistui: ${error.message}`);
    }
};