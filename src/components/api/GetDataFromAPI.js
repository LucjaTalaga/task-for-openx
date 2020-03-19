
const getDataFromAPI = (dataType) => {
    return fetch(`https://jsonplaceholder.typicode.com/${dataType}`).then(resp => {
        if (resp.ok)
            return resp.json();
        else
            throw new Error('Błąd sieci');
    });
};

export default getDataFromAPI;