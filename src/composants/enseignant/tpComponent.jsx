import React, { useEffect, useState } from 'react'
import { addDaysToDate, loadGetData, loadMultyData, loadPostData } from '../Fonctions';
import Loader from '../Loader';
import Succefful from '../Succefful';

export default function TPComponent() {

    /* const today = new Date();


    const [formattedPubDate, setformattedPubDate] = useState(today.toISOString().split('T')[0]);
    const [formattedSendDate, setformattedSendDate] = useState(today.toISOString().split('T')[0]);

    const [filieres, setFilieres] = useState([]);
    const [ecues, setEcues] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")).data);
    const [idFiliere, setIdFiliere] = useState("");
    const [idEcue, setIdEcue] = useState("");

    const [title, setTitle] = useState("");
    const [fichier, setFichier] = useState("");
    const [description, setDescription] = useState("");

    const handleformattedDate = () => {
        setformattedSendDate(addDaysToDate(formattedPubDate, 7))
    }

    const handleChangePubDate = (e) => {
        setformattedPubDate(e.target.value);
    }

    const handleChageTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChargeFichier = (e) => {
        setFichier(e.target.value);
    }

    const handleChargeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleChangeSendDate = (e) => {
        setformattedSendDate(e.target.value);
    }

    useEffect(() => {
        handleformattedDate();
        loadGetData(`enseignant/${userData.id}/filieres/`, setFilieres);
    }, [setFilieres]);

    useEffect(() => {

    }, [idEcue])

    useEffect(() => {

    }, [ecues])

    // les fonction de mises à jour de données
    const handleChargeEcue = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdFiliere(id);
            let chemin = `enseignant/${userData.id}/filiere/` + id + "/ecus/";
            loadGetData(chemin, setEcues);
        }
    }

    const handelChargeIdEcue = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdEcue(id);
        }
    }


    const [addTP, setAddTP] = useState(false);
    const [loadAdd, setLoadAdd] = useState(false);

    // fonction pour enrégistrer un tp.
    const handleSubmit = (e) => {
        setLoadAdd(true);
        e.preventDefault();

        const data = {
            title: title,
            datePublication: formattedPubDate,
            dateSoumission: formattedSendDate,
            id_filiere: idFiliere,
            id_ecue: idEcue,
            fichier: fichier,
            description: description,
            id_Enseignant: userData.id,
        }

        loadPostData("tp/", data, setAddTP, () => {

        })

        setInterval(() => {
            setLoadAdd(false);
            setAddTP(false);
        }, 1500);
    }

*/

    const today = new Date();

    const [formattedPubDate, setformattedPubDate] = useState(today.toISOString().split('T')[0]);
    const [formattedSendDate, setformattedSendDate] = useState(today.toISOString().split('T')[0]);

    const [filieres, setFilieres] = useState([]);
    const [ecues, setEcues] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")).data);
    const [idFiliere, setIdFiliere] = useState("");
    const [idEcue, setIdEcue] = useState("");

    const [title, setTitle] = useState("");
    const [fichier, setFichier] = useState(null); // Changer en null pour stocker le fichier
    const [description, setDescription] = useState("");

    const handleformattedDate = () => {
        setformattedSendDate(addDaysToDate(formattedPubDate, 7))
    }

    const handleChangePubDate = (e) => {
        setformattedPubDate(e.target.value);
    }

    const handleChageTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChargeFichier = (e) => {
        setFichier(e.target.files[0]); // Stocker le fichier sélectionné
    }

    const handleChargeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleChangeSendDate = (e) => {
        setformattedSendDate(e.target.value);
    }

    useEffect(() => {
        handleformattedDate();
        loadGetData(`enseignant/${userData.id}/filieres/`, setFilieres);
    }, [setFilieres]);

    useEffect(() => {

    }, [idEcue])

    useEffect(() => {

    }, [ecues])

    const handleChargeEcue = (e) => {
        let id = e.target.value;
        if (id !== "") {
            setIdFiliere(id);
            let chemin = `enseignant/${userData.id}/filiere/${id}/ecus/`;
            loadGetData(chemin, setEcues);
        }
    }

    const handelChargeIdEcue = (e) => {
        let id = e.target.value;
        if (id !== "") {
            setIdEcue(id);
        }
    }

    const [addTP, setAddTP] = useState(false);
    const [loadAdd, setLoadAdd] = useState(false);

    const handleSubmit = (e) => {
        setLoadAdd(true);
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('datePublication', formattedPubDate);
        data.append('dateSoumission', formattedSendDate);
        data.append('id_filiere', idFiliere);
        data.append('id_ecue', idEcue);
        data.append('fichier', fichier); // Inclure le fichier
        data.append('description', description);
        data.append('id_Enseignant', userData.id);

        loadMultyData("tp/", data, setAddTP, () => {

        });

        setInterval(() => {
            setLoadAdd(false);
            setAddTP(false);
        }, 3000);
    }


    return (
        <>
            <div className='min-h-full bg-c5'>
                <div className=''>
                    <div className='flex bg-c3 text-c1 w-full h-max items-center p-2'>
                        <h1 className='font-bold'>Créer un nouveau TP </h1>
                    </div>
                    <div className='p-6'>
                        <form onSubmit={handleSubmit} className='flex w-full flex-wrap items-start border border-c3 p-3 rounded-2xl'>
                            <div className='flex flex-row flex-wrap w-full lg:w-1/2 px-2 text-sm'>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'>Titre :</label>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        className=' text-center w-3/5 p-2 rounded-full'
                                        required
                                        placeholder='titre du TP'
                                        value={title}
                                        onChange={handleChageTitle}
                                    />
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'>Date de publication :</label>
                                    <input
                                        type="date"
                                        name=""
                                        id="dateInput"
                                        className="text-center w-3/5 p-2 rounded-full"
                                        required
                                        placeholder="today"
                                        value={formattedPubDate}
                                        onChange={handleChangePubDate}
                                    />
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'>Date de Soumission :</label>
                                    <input
                                        type="date"
                                        name=""
                                        id="dateSend"
                                        className="text-center w-3/5 p-2 rounded-full"
                                        required
                                        placeholder="today"
                                        value={formattedSendDate}
                                        onChange={handleChangeSendDate}
                                    />
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'> Filière :</label>
                                    <select
                                        name="filiere"
                                        id="filiere"
                                        className="text-center w-3/5 p-2 rounded-full"
                                        required
                                        onChange={handleChargeEcue}
                                    >
                                        <option value="">Choisissez une filière </option>
                                        {
                                            filieres.map((item) => (
                                                <option key={item.id} value={item.id}>{item.fname}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'> ECUE :</label>
                                    <select
                                        name="ecus"
                                        id="ecus"
                                        className="text-center w-3/5 p-2 rounded-full"
                                        required
                                        onChange={handelChargeIdEcue}
                                    >
                                        <option value="">Choisissez un ECUE </option>
                                        {
                                            ecues.map((item) => (
                                                <option key={item.id} value={item.id}>{item.ename}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className='flex flex-row flex-wrap w-full lg:w-1/2 px-2'>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'> Fichier :</label>
                                    <div className='w-3/5 p-2 rounded-full bg-c2 text-center'>
                                        <input
                                            type="file"
                                            name=""
                                            id="fichier"
                                            className="w-full"
                                            onChange={handleChargeFichier}
                                        />
                                    </div>
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold'>Description :</label>
                                    <textarea
                                        name="description"
                                        id=""
                                        cols="30"
                                        rows="6"
                                        className='w-3/5 rounded-2xl px-2 py-1'
                                        required
                                        value={description}
                                        onChange={handleChargeDescription}
                                    >

                                    </textarea>
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-2/5 text-center font-bold text-c5'>Description :</label>
                                    <input type="submit" value="Créer TP" className="text-center w-3/5 p-2 rounded-full bg-c1 hover:font-bold cursor-pointer" />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                {
                    // les anciens travaux pratiques
                }
                <div className='flex bg-c3 text-c1 w-full h-max items-center p-2'>
                    <h1 className='font-bold'>Tous Travaux Pratiques</h1>
                </div>
            </div>

            <Loader value={loadAdd} />
            <Succefful value={addTP} text={"TP créer et publié avec succès !"} />
        </>
    )
}
