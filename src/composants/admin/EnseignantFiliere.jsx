import React, { useEffect, useState } from 'react'
import { loadDeleteData, loadGetData, loadPostData } from '../Fonctions';
import Loader from '../Loader';
import Succefful from '../Succefful';

export default function EnseignantFiliere() {

    const [enseignants, setEnseignants] = useState([]);
    const [filiereEnseignant, setFiliereEnseignant] = useState([])
    const [nfiliereEnseignant, setNFiliereEnseignant] = useState([])
    const [autoAdd, setAutoAdd] = useState(false);
    const [autoMov, setAutoMov] = useState(false);

    const [filiereEnseignant2, setFiliereEnseignant2] = useState([])
    const [nfiliereEnseignant2, setNFiliereEnseignant2] = useState([])

    const [addData, setAddData] = useState(false);
    const [movData, setMovData] = useState(false);
    const [loadAdd, setLoadAdd] = useState(false);
    const [loadMov, setLoadMov] = useState(false);

    const handleFiliereEnseignant = () => {
        let valeur = document.getElementById("idEnseignant").value;
        if (valeur != "") {

            setAutoAdd(true);

            let chemin1 = "enseignant/" + valeur + "/filieres/";
            let chemin2 = "enseignant/" + valeur + "/nfilieres/";

            console.log(chemin1);
            console.log(chemin2);

            loadGetData(chemin1, setFiliereEnseignant);
            loadGetData(chemin2, setNFiliereEnseignant);
        }
        else {
            setAutoAdd(false);
        }
    }

    // fonction qui s'exécute pour le retrait de filière
    const handleFiliereEnseignant2 = () => {
        let valeur = document.getElementById("idEnseignant2").value;
        if (valeur != "") {
            setAutoMov(true);
            let chemin1 = "enseignant/" + valeur + "/filieres/";
            loadGetData(chemin1, setFiliereEnseignant2);
        }
        else {
            setAutoMov(false);
        }
    }

    // chargement par défaut avant le chargement du composant
    useEffect(() => {
        loadGetData('enseignants', setEnseignants);
    }, [filiereEnseignant, nfiliereEnseignant])

    // fonction qui se charge pour ajouter de filière à un enseignant
    const handleAddEnseignantFiliere = (e) => {
        e.preventDefault();

        let val1 = document.getElementById("idEnseignant").value;
        let val2 = document.getElementById("filiereEn").value;

        let val3 = document.getElementById("idEnseignant2").value;
        let val4 = document.getElementById("filiereEn2").value;

        let chemin1 = "enseignant/" + val1 + "/filieres/";
        let chemin2 = "enseignant/" + val1 + "/nfilieres/";

        let chemin3 = "enseignant/" + val1 + "/filieres/";
        let chemin4 = "enseignant/" + val1 + "/nfilieres/";

        if (val1 != "" && val2 != "") {
            const data = {
                id_Enseignant: val1,
                id_filiere: val2,
            }

            loadPostData("enseignantfiliere", data, setAddData, () => {
                loadGetData(chemin1, setFiliereEnseignant);
                loadGetData(chemin2, setNFiliereEnseignant);
                loadGetData(chemin3, setFiliereEnseignant2);
                loadGetData(chemin4, setNFiliereEnseignant2);
            });

            setInterval(() => {
                setAddData(false);
                setLoadAdd(false);
            }, 1500);
        }
    }

    // fonction pour retirer de filière à un enseignant
    const handleMovEnseignantFiliere = (e) => {
        e.preventDefault();
        let val1 = document.getElementById("idEnseignant2").value;
        let val2 = document.getElementById("filiereEn2").value;
        let val3 = document.getElementById("idEnseignant").value;
        let val4 = document.getElementById("filiereEn").value;

        let chemin1 = "enseignant/" + val1 + "/filieres/";
        let chemin2 = "enseignant/" + val1 + "/nfilieres/";
        let chemin3 = "enseignant/" + val1 + "/filieres/";
        let chemin4 = "enseignant/" + val1 + "/nfilieres/";

        if (val1 != "" && val2 != "") {
            const data = {
                id_Enseignant: val1,
                id_filiere: val2,
            }

            loadDeleteData("enseignantfiliere/", data, setMovData, () => {
                loadGetData(chemin1, setFiliereEnseignant2);
                loadGetData(chemin2, setNFiliereEnseignant2);

                loadGetData(chemin3, setFiliereEnseignant);
                loadGetData(chemin4, setNFiliereEnseignant);
            });

            setInterval(() => {
                setMovData(false);
                setLoadMov(false);
            }, 1500);
        }
    }


    // retour HTML
    return (
        <>
            <div className='h-full bg-c5 pt-6'>
                <div className='ml-8 mr-8 mb-8 bg-c3'>
                    <div className='w-[100%] bg-c1 px-2 py-3 font-bold'>
                        <h1>
                            Ajouter une Filière à un Enseignant
                        </h1>
                    </div>
                    <div className='px-2 py-5'>
                        <form onSubmit={handleAddEnseignantFiliere} className='grid lg:grid-cols-[1fr_1fr_1fr] max-lg:grid-cols-[1fr_1fr] py-4'>
                            <select name="idEnseignant" id="idEnseignant" className='p-2 max-lg:w-[90%] max-lg:mx-auto mx-2 max-lg:mb-4 max-lg:col-span-2 cursor-pointer' onChange={handleFiliereEnseignant} >
                                <option value="">Choisissez l'enseignant</option>
                                {
                                    enseignants.map((item) => (
                                        <option key={item.id} value={item.id}>{item.firstName + " " + item.surName + ", " + item.dname}</option>
                                    ))
                                }
                            </select>
                            <select name="filiereEn" id="filiereEn" className='p-2 max-lg:w-[90%] max-lg:mx-auto mx-2 max-lg:mb-4 max-lg:col-span-2 cursor-pointer'>
                                <option value="">Choisissez la filière</option>
                                {
                                    autoAdd && nfiliereEnseignant.map((item) => (
                                        <option key={item.id} value={item.id}>{item.fname}</option>
                                    ))
                                }
                            </select>
                            <button type="submit" className='bg-c1 max-lg:w-[90%] max-lg:mx-auto hover:font-bold px-6 py-2 mx-2 max-lg:col-span-2'>Ajouter</button>
                        </form>
                    </div>
                    <div>
                        <h1 className='bg-c1 w-max p-2 font-bold'> Les filières actuelles de l'enseignant sélectionné </h1>
                        <div className='w-auto bg-c2 p-2 mb-1'>
                            {
                                autoAdd && filiereEnseignant.map((item) => (
                                    <span key={item.id} className='italic px-2 mr-1 bg-c5 rounded-full'>{item.fname}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='bg-c2 px-2 py-2 font-bold min-h-[40px] mx-8'>

                </div>

                {
                    // formulaire de retrait de filière
                }

                <div className='m-8 bg-c3'>
                    <div className='w-full bg-c1 px-2 py-3 font-bold'>
                        <h1>
                            Retirer une filiere à un Enseignant
                        </h1>
                    </div>
                    <div className='px-2 py-5'>
                        <form onSubmit={handleMovEnseignantFiliere} className='grid lg:grid-cols-[1fr_1fr_1fr] max-lg:grid-cols-[1fr_1fr] py-4'>
                            <select name="filieresb" id="idEnseignant2" className='p-2 max-lg:w-[90%] max-lg:mx-auto mx-2 max-lg:mb-4 max-lg:col-span-2 cursor-pointer' onChange={handleFiliereEnseignant2}>
                                <option value="">Choisissez l'Enseignant</option>
                                {
                                    enseignants.map((item) => (
                                        <option key={item.id} value={item.id}>{item.firstName + " " + item.surName + ", " + item.dname}</option>
                                    ))
                                }
                            </select>
                            <select name="ecub" id="filiereEn2" className='p-2 max-lg:w-[90%] max-lg:mx-auto mx-2 max-lg:mb-4 max-lg:col-span-2 cursor-pointer'>
                                <option value=""> Choisissez la filière </option>
                                {
                                    autoMov && filiereEnseignant2.map((item) => (
                                        <option key={item.id} value={item.id}>{item.fname}</option>
                                    ))
                                }
                            </select>
                            <button type="submit" className='bg-c1 max-lg:w-[90%] max-lg:mx-auto hover:font-bold px-6 py-2 mx-2 max-lg:col-span-2'>Retirer</button>
                        </form>
                    </div>
                    <div>
                        <h1 className='bg-c1 w-max p-2 font-bold'>Les filières actuelles de l'enseignant sélectionné </h1>
                        <div className='w-auto bg-c2 p-2'>
                            {
                                autoMov && filiereEnseignant2.map((item) => (
                                    <span key={item.id} className='italic px-2 mr-1 bg-c5 rounded-full'>{item.fname}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Loader value={loadAdd} />
            <Succefful value={addData} text={"Filière ajoutée à l'enseignant avec succès !"} />
            <Loader value={loadMov} />
            <Succefful value={movData} text={"Filière retirée à l'enseignant avec succès !"} />

        </>
    )
}
