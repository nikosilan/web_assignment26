const getData = async () => {
    try {
        const response = await fetch('https://reqres.in/api/unknown/23', {
            headers: {
                'x-api-key': 'reqres-free-v1',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

getData();