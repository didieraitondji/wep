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

        //console.log(response.text());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données fetchPost', error);
        throw error;
    }
};

export const loadPostData = async (type, data, setData, callback) => {
    try {
        const donnees = await fetchPostData(type, data);
        if (donnees.code === 1) {
            setData(true);
        } else {
            setData(false);
        }
        callback(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données loadPost', error);
        setData(false);
    }
};


// Fonction pour stocker de multiples données
export const fetchMultyData = async (type, data) => {
    let url = `http://wep-api.com/${type}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        //console.log(response.text());
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
};

// Fonction pour charger de multiples données
export const loadMultyData = async (type, data, setData, callback) => {
    try {
        const donnees = await fetchMultyData(type, data);
        if (donnees.code === 1) {
            setData(true);
        } else {
            setData(false);
        }
        callback(donnees);
    } catch (error) {
        console.error('Erreur lors de la récupération des données loadPost', error);
        setData(false);
    }
};



// fonctions pour supprimer des doonnées
export const fetchDeleteData = async (type, donnees) => {
    let url = 'http://wep-api.com/' + type;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donnees)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        //console.log(response.text());
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erreur lors de la suppression des données fetchDelete', error);
        throw error;
    }
};

export const loadDeleteData = async (type, data, setData, callback) => {
    try {
        const donnees = await fetchDeleteData(type, data);
        setData(true);
        callback(data);
    } catch (error) {
        console.error('Erreur lors de la suppression des données loadDelete', error);
        setData(false);
    }
};


// fonction pour stopper la propagation d'événement
export const childCliked = (e) => {
    e.stopPropagation();
}

export const calculateDifferenceInDays = (date1, date2) => {
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);

    if (!date1 || !date2 || isNaN(date1Obj) || isNaN(date2Obj)) {
        return "Veuillez entrer deux dates valides.";
    }

    const differenceInTime = date2Obj.getTime() - date1Obj.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
};

export const addDaysToDate = (date, days) => {
    const dateObj = new Date(date);

    if (!date || isNaN(dateObj)) {
        return "Veuillez entrer une date valide.";
    }

    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.toISOString().split('T')[0]; // Retourne la date au format AAAA-MM-JJ
};