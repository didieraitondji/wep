import React, { useState, useEffect } from 'react'
import { childCliked, loadGetData, loadMultyData } from '../Fonctions';
import Loader from '../Loader';
import Succefful from '../Succefful';

export default function SoumissionEtudiant() {
    let dateobj = new Date();
    let jour = dateobj.getDate();
    let mois = dateobj.getMonth();
    let annee = dateobj.getFullYear();

    let today = `${annee}-${mois + 1}-${jour}`;

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")).data);
    const [idEcu, setIdEcu] = useState("");
    const [idTp, setIdTp] = useState("");
    const [lesTp, setLesTp] = useState([]);
    const [lesEcus, setLesEcus] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [fichier, setFichier] = useState(null);
    const [lien, setLien] = useState("");
    const [loadAdd, setLoadAdd] = useState(false);
    const [addData, setAddData] = useState(false);
    const [enseignantId, setEnseignantId] = useState([]);

    const handleSetIdTp = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdTp(id);
            loadGetData(`tp/${id}/`, setEnseignantId);
        }
    }

    const handleSetLien = (e) => {
        let id = e.target.value;
        setLien(id);
    }

    const handleSetFichier = (e) => {
        setFichier(e.target.files[0]);
    }

    const handleSetIdEcu = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdEcu(id);
            loadGetData(`filiere/${userData.id_filiere}/ecu/${id}/tps/${userData.id}`, setLesTp);
        }
    }

    useEffect(() => { }, [lesTp]);
    useEffect(() => { }, [enseignantId]);

    useEffect(() => { loadGetData(`filiere/${userData.id_filiere}/ecus`, setLesEcus); }, [])

    const handleSubmit = () => {
        setConfirm(!confirm);
        setLoadAdd(true);

        const data = new FormData();
        data.append('lien', lien);
        data.append('id_Etudiant', userData.id);
        data.append('fichier', fichier);
        data.append('id_Tp', idTp);
        data.append('dateSoumission', today);
        data.append('id_Enseignant', enseignantId[0].id_Enseignant);

        loadMultyData(`travail/`, data, setAddData, () => {
            loadGetData(`filiere/${userData.id_filiere}/ecu/${idEcu}/tps/${userData.id}`, setLesTp);
        })

        /* for (const [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        } */

        setInterval(() => {
            setLoadAdd(false);
            setAddData(false);
        }, 2000);
    }

    const HandleconfirmAddTp = (e) => {
        e.preventDefault();
        setConfirm(!confirm);
    }



    return (
        <>
            <div className='h-full bg-c5 rounded-2xl'>
                <div className='bg-c3 text-c1 p-2 '>
                    <h1 className='font-bold'>
                        Soumettre un TP
                    </h1>
                </div>
                <div className='p-5'>
                    <form onSubmit={HandleconfirmAddTp} className='flex w-[80%] mx-auto flex-row flex-wrap items-start'>
                        <div className='w-1/2 p-2 h-full'>
                            <div>
                                <div className='flex flex-row flex-wrap items-center justify-center mb-4'>
                                    <label htmlFor="" className='pr-5 w-1/3 text-right'>ECUE : </label>
                                    <select
                                        name="ecue"
                                        id="ecue"
                                        className='w-2/3 p-2 rounded-full'
                                        value={idEcu}
                                        onChange={handleSetIdEcu}
                                        required
                                    >
                                        <option value="">Choisissez un ECUE</option>
                                        {
                                            lesEcus.map((item) => (
                                                <option key={item.id} value={item.id}>{item.ecuName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-row flex-wrap items-center justify-center mb-4'>
                                    <label htmlFor="" className='pr-5 w-1/3 text-right'>Lien Github: </label>
                                    <input
                                        type="url"
                                        name="lien"
                                        id="lien"
                                        placeholder='lien github'
                                        className='w-2/3 p-2 rounded-full'
                                        value={lien}
                                        onChange={handleSetLien}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2 p-2 pl-10 h-full'>
                            <div>
                                <div className='flex flex-row flex-wrap items-center justify-end mb-4'>
                                    <label htmlFor="" className='pr-5 text-right'>TP : </label>
                                    <select
                                        name="idtp"
                                        id="idtp"
                                        className='w-2/3 p-2 rounded-full'
                                        value={idTp}
                                        onChange={handleSetIdTp}
                                        required
                                    >
                                        <option value="">TP encours </option>
                                        {
                                            lesTp.map((item, index) => (
                                                <option key={item.id} value={item.id}>{item.title + " (" + item.dateSoumission + ")"}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-row flex-wrap items-center justify-end mb-4'>
                                    <label htmlFor="" className='pr-6 text-right'>Fichiers : </label>
                                    <input
                                        type="file"
                                        name="fichiers"
                                        id="fichiers"
                                        className='w-2/3 p-2 rounded-full bg-c2'
                                        onChange={handleSetFichier}
                                        required
                                    />
                                </div>
                                <div className='flex flex-row flex-wrap items-center justify-end mb-4'>
                                    <label htmlFor="" className='pr-6 text-right text-c5'>Fichiers : </label>
                                    <input type="submit" value="Soumettre" className='w-2/4 bg-c1 px-4 py-2 hover:font-bold cursor-pointer rounded-full' />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {
                    // affichage des soumissions
                }
                <div className='bg-c3 text-c1 p-2 '>
                    <h1 className='font-bold'>
                        Voir les Anciennes Soumissions & Les Notes
                    </h1>
                </div>

            </div>

            {
                // autorisation pour ajouter un TP
            }

            {
                confirm && (
                    <div onClick={HandleconfirmAddTp} className='fixed z-50 top-0 left-[80px] right-0 bottom-0 bg-[#00000065] flex items-center justify-center'>
                        <div onClick={childCliked} className='bg-c2 p-5 shadow-lg rounded-md slide-down min-w-[200px]'>
                            <div>
                                Soumettre le TP ...?
                            </div>
                            <div className='pt-10 flex'>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleSubmit} className='px-4 py-2 bg-c1 rounded-md cursor-pointer'>Oui</span>
                                </div>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={HandleconfirmAddTp} className='px-4 py-2 cursor-pointer hover:bg-c3 hover:text-c2 rounded-md'>Non</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <Loader value={loadAdd} />
            <Succefful value={addData} text={"Soumission envoyée avec succès !"} />
        </>
    )
}
