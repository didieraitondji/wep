export const fetchGetData = async (type) => {
    let url = 'http://wep-api.com/' + type;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        throw error;
    }
};

export const loadGetData = async (type, setData) => {
    try {
        const data = await fetchGetData(type);
        setData(data);
    } catch (error) {
        console.error('Erreur lors des données', error);
    }
};

export const fetchPostData = async (type, donnees) => {
    let url = 'http://wep-api.com/' + type;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donnees)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response.text());
        //const data = await response.json();
        //return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données fetchPost', error);
        throw error;
    }
};

export const loadPostData = async (type, data, setData, callback) => {
    try {
        const donnees = await fetchPostData(type, data);
        setData(true);
        callback(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données loadPost', error);
        setData(false);
    }
};

export const childCliked = (e) => {
    e.stopPropagation();
}