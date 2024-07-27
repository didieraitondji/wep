import React, { useEffect, useState } from 'react'
import { addDaysToDate, childCliked, loadGetData, loadMultyData, loadPostData } from '../Fonctions';
import Loader from '../Loader';
import Succefful from '../Succefful';
import TpModel from '../TpModel';

export default function TPComponent() {

    // les states pour l'ajout de TP
    const today = new Date();
    const [formattedPubDate, setformattedPubDate] = useState(today.toISOString().split('T')[0]);
    const [formattedSendDate, setformattedSendDate] = useState(today.toISOString().split('T')[0]);
    const [filieres, setFilieres] = useState([]);
    const [ecues, setEcues] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")).data);
    const [idFiliere, setIdFiliere] = useState("");
    const [idEcue, setIdEcue] = useState("");
    const [addTP, setAddTP] = useState(false);
    const [loadAdd, setLoadAdd] = useState(false);
    const [title, setTitle] = useState("");
    const [fichier, setFichier] = useState(null);
    const [description, setDescription] = useState("");
    const [confirm, setConfirm] = useState(false);

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
        setFichier(e.target.files[0]);
    }

    const handleChargeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleChangeSendDate = (e) => {
        setformattedSendDate(e.target.value);
    }

    // les userEffects pour l'ajout de TP
    useEffect(() => {
        handleformattedDate();
        loadGetData(`enseignant/${userData.id}/filieres/`, setFilieres);
    }, [setFilieres]);

    useEffect(() => {

    }, [idEcue])

    useEffect(() => {

    }, [ecues])

    // quelques fonction pour l'ajout de TP

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

    const handleSubmit = () => {
        setLoadAdd(true);
        const data = new FormData();
        data.append('title', title);
        data.append('datePublication', formattedPubDate);
        data.append('dateSoumission', formattedSendDate);
        data.append('id_filiere', idFiliere);
        data.append('id_ecue', idEcue);
        data.append('fichier', fichier); // Inclure le fichier
        data.append('description', description);
        data.append('id_Enseignant', userData.id);

        // appel à la fonction de stockage de données concernant le TP
        loadMultyData("tp/", data, setAddTP, () => {

        });

        // confirmation d'ajout avec retour à l'ordre
        setInterval(() => {
            setLoadAdd(false);
            setAddTP(false);
        }, 2000);

        setConfirm(false);
    }

    // fonction pour enclancher le processus de confirmation d'ajout de TP
    const handleConfirmAddTP = (e) => {
        e.preventDefault();
        setConfirm(!confirm);
    }





    // mise en place des states pour l'affichage de TP.
    const [lesTp, setLesTp] = useState([]);

    const [filiereSel, setfiliereSel] = useState([]);
    const [ecueSel, setecueSel] = useState([]);

    const [filiereSelid, setfiliereSelid] = useState("");
    const [ecueSelid, setecueSelid] = useState("");


    const handlefiliereSel = (e) => {
        let id = e.target.value;
        if (id !== "") {
            setfiliereSelid(id);
            loadGetData(`enseignant/${userData.id}/filiere/${id}/ecus/`, setecueSel);
        }
    }




    const handleecueSel = (e) => {
        let id = e.target.value;
        if (id != "") {
            setecueSelid(id);
        }
    }



    useEffect(() => {
        loadGetData(`enseignant/${userData.id}/filieres/`, setfiliereSel);
    }, []);


    // fonction qui affiche les TPs filtré
    const handleAfficheTP = (e) => {
        e.preventDefault();
        loadGetData(`enseignant/${userData.id}/filiere/${filiereSelid}/ecu/${ecueSelid}/tps/`, setLesTp);
    }

    console.log(lesTp)

    return (
        <>
            <div className='min-h-full bg-c5'>
                <div className=''>
                    <div className='flex bg-c3 text-c1 w-full h-max items-center p-2'>
                        <h1 className='font-bold'>Créer un nouveau TP </h1>
                    </div>
                    <div className='p-6'>
                        <form onSubmit={handleConfirmAddTP} className='flex w-full flex-wrap items-start border border-c3 p-3 rounded-2xl'>
                            <div className='flex flex-row flex-wrap w-full lg:w-1/2 px-2 text-sm'>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-3/12 text-right pr-10 font-bold'>Titre :</label>
                                    <input
                                        type="text"
                                        name="titre"
                                        id="titre"
                                        className='text-center w-9/12 p-2 rounded-full'
                                        required
                                        placeholder='titre du TP'
                                        value={title}
                                        onChange={handleChageTitle}
                                    />
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-4/12 text-right pr-10 font-bold'>Date de publication :</label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="dateInput"
                                        className="text-center w-8/12 p-2 rounded-full"
                                        required
                                        placeholder="today"
                                        value={formattedPubDate}
                                        onChange={handleChangePubDate}
                                    />
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-4/12 text-right pr-10 font-bold'>Date de Soumission :</label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="dateSend"
                                        className="text-center w-8/12 p-2 rounded-full"
                                        required
                                        placeholder="today"
                                        value={formattedSendDate}
                                        onChange={handleChangeSendDate}
                                    />
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-3/12 text-right pr-10 font-bold'> Filière :</label>
                                    <select
                                        name="filiere"
                                        id="filiere"
                                        className="text-center w-9/12 p-2 rounded-full"
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
                                    <label htmlFor="" className='w-3/12 text-right pr-10 font-bold'> ECUE :</label>
                                    <select
                                        name="ecus"
                                        id="ecus"
                                        className="text-center w-9/12 p-2 rounded-full"
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
                                    <label htmlFor="" className='w-3/12 text-right pr-10 font-bold '> Fichier :</label>
                                    <div className='w-9/12 p-2 rounded-full bg-c2 text-center'>
                                        <input
                                            type="file"
                                            name="fichier"
                                            id="fichier"
                                            className="w-full"
                                            onChange={handleChargeFichier}
                                        />
                                    </div>
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-3/12 text-right pr-10 font-bold'>Description :</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        cols="30"
                                        rows="6"
                                        className='w-9/12 rounded-2xl px-2 py-1'
                                        required
                                        value={description}
                                        onChange={handleChargeDescription}
                                    >

                                    </textarea>
                                </div>
                                <div className='flex w-full items-center mb-4'>
                                    <label htmlFor="" className='w-6/12 text-center font-bold text-c5'>Description :</label>
                                    <input type="submit" value="Créer TP" className="text-center w-6/12 p-2 rounded-full bg-c1 hover:font-bold cursor-pointer" />
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
                <div className='p-3'>
                    <form onSubmit={handleAfficheTP} className='flex flex-wrap p-3 bg-c4 rounded-full items-center justify-center'>
                        <div className='px-4 flex items-center justify-center w-full lg:w-1/3'>
                            <label htmlFor="" className='pr-4 font-bold '>Filière : </label>
                            <select
                                name="filiereSel"
                                id="filiereSel"
                                value={filiereSelid}
                                onChange={handlefiliereSel}
                                className='p-2 rounded-full w-2/3'
                            >
                                <option value=""> Choisissez une Filière </option>
                                {
                                    filiereSel.map((item) => (
                                        <option key={item.id} value={item.id}>{item.fname}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='px-4 flex items-center justify-center w-full lg:w-1/3'>
                            <label htmlFor="" className='pr-4'> ECUE : </label>
                            <select
                                name="ecueSel"
                                id="ecueSel"
                                value={ecueSelid}
                                onChange={handleecueSel}
                                className='p-2 rounded-full w-2/3'
                            >
                                <option value=""> Choisissez une Filière </option>
                                {
                                    ecueSel.map((item) => (
                                        <option key={item.id} value={item.id}>{item.ename}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='px-4 flex items-center justify-start'>
                            <button type="submit" className='rounded-full px-6 py-2 bg-c1 hover:font-bold'>Afficher</button>
                        </div>
                    </form>
                </div>
                <div className='p-3'>
                    <div className='h-[70vh] bg-c4 w-full rounded-3xl p-8 overflow-auto'>
                        {
                            lesTp.map((item, index) => (
                                <TpModel key={item.id} index={index + 1} title={item.title} description={item.description} pubdate={item.datePublier} senddate={item.dateSoumission} filiere={item.fname} ecue={item.ename} file={item.filePath} enseignant={"vous"} />
                            ))
                        }
                    </div>
                </div>
            </div>

            {
                // autorisation pour ajouter un TP
            }

            {
                confirm && (
                    <div onClick={handleConfirmAddTP} className='fixed z-50 top-0 left-[80px] right-0 bottom-0 bg-[#00000065] flex items-center justify-center'>
                        <div onClick={childCliked} className='bg-c2 p-5 shadow-lg rounded-md slide-down min-w-[200px]'>
                            <div>
                                Ajouter le Travail Pratique "{title}" ?
                            </div>
                            <div className='pt-10 flex'>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleSubmit} className='px-4 py-2 bg-c1 rounded-md cursor-pointer'>Oui</span>
                                </div>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleConfirmAddTP} className='px-4 py-2 cursor-pointer hover:bg-c3 hover:text-c2 rounded-md'>Non</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <Loader value={loadAdd} />
            <Succefful value={addTP} text={"TP créer et publié avec succès !"} />
        </>
    )
}
