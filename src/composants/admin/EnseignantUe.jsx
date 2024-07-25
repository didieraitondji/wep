import React, { useEffect, useState } from 'react'
import { loadDeleteData, loadGetData, loadPostData } from '../Fonctions';
import Loader from '../Loader';
import Succefful from '../Succefful';

export default function EnseignantUe() {

    const [loadAdd, setLoadAdd] = useState(false);
    const [loadMov, setLoadMov] = useState(false);
    const [addData, setAddData] = useState(false);
    const [movData, setMovData] = useState(false);

    const [allEnseignant, setAllEnseignant] = useState([]);
    const [filieresDeEnseignant, setFiliereDeEnseignant] = useState([]);

    const [idAddFiliere, setIdAddFiliere] = useState("");
    const [idAddEcue, setIdAddEcue] = useState("");

    const [idMovFiliere, setIdMovFiliere] = useState("");
    const [idMovEcue, setIdMovEcue] = useState("");

    // fonction pour pour mettre à jours les filières
    // fonction 1
    const [addECUEFilieres, setAddECUEFiliere] = useState([]);
    const [addECUEecue, setAddECUEecue] = useState([]);
    const [addECUENecue, setAddECUENecue] = useState([]);

    const handleUpdateAddECUEFilieres = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdAddFiliere(id);
            let chemin = "enseignant/" + id + "/filieres/";
            loadGetData(chemin, setAddECUEFiliere);
        }
    }

    const handleUpdateAddECUEecue = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdAddEcue(id);
            let chemin1 = "enseignant/" + idAddFiliere + "/filiere/" + id + "/ecus";
            let chemin2 = "enseignant/" + idAddFiliere + "/filiere/" + id + "/necus";

            console.log(chemin1);
            console.log(chemin2);

            loadGetData(chemin1, setAddECUEecue);
            loadGetData(chemin2, setAddECUENecue);
        }
    }

    useEffect(() => {

    }, [addECUEecue, addECUENecue]);

    useEffect(() => {

    }, [addECUEFilieres]);

    // fonction appelée à l'envois deu formulaire
    const handleAddEcueEnseignant = (e) => {
        e.preventDefault();

        setLoadAdd(true);

        // récupération de l'id de l'ecu
        let idEcue = document.getElementById("ecueId").value;

        if (idEcue != "") {

            const data = {
                id_ecue: idEcue,
                id_Enseignant: idAddFiliere,
            }

            let chemin1 = "enseignant/" + idAddFiliere + "/filiere/" + idAddEcue + "/ecus";
            let chemin2 = "enseignant/" + idAddFiliere + "/filiere/" + idAddEcue + "/necus";

            let chemin3 = "enseignant/" + idMovFiliere + "/filiere/" + idMovEcue + "/ecus";

            loadPostData("enseignantecu/", data, setAddData, () => {
                loadGetData(chemin1, setAddECUEecue);
                loadGetData(chemin2, setAddECUENecue);

                if (idMovFiliere != "" && idMovEcue != "") {
                    loadGetData(chemin3, setMovECUEecue);
                }
            });
        }

        setInterval(() => {
            setAddData(false);
            setLoadAdd(false);
        }, 2000);
    }









    // fonction 2
    const [movECUEFiliere, setMovECUEFiliere] = useState([]);
    const [movECUEecue, setMovECUEecue] = useState([]);

    const handleUpdateMovECUEFilieres = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdMovFiliere(id);
            let chemin = "enseignant/" + id + "/filieres/";
            loadGetData(chemin, setMovECUEFiliere);
        }
    }


    const handleUpdateMovECUEecue = (e) => {
        let id = e.target.value;
        if (id != "") {
            setIdMovEcue(id);
            let chemin = "enseignant/" + idMovFiliere + "/filiere/" + id + "/ecus";
            loadGetData(chemin, setMovECUEecue);
        }
    }

    useEffect(() => {

    }, [movECUEecue]);

    useEffect(() => {

    }, [movECUEFiliere]);

    // fonctions pour mettre à jour les ECUE
    const handleMovEcueEnseignant = (e) => {
        e.preventDefault();

        setLoadMov(true);
        // récupération de l'id de l'ecu
        let idEcue = document.getElementById("ecueId2").value;

        if (idEcue != "") {

            const data = {
                id_ecue: idEcue,
                id_Enseignant: idMovFiliere,
            }

            let chemin1 = "enseignant/" + idMovFiliere + "/filiere/" + idMovEcue + "/ecus";

            let chemin2 = "enseignant/" + idAddFiliere + "/filiere/" + idAddEcue + "/ecus";
            let chemin3 = "enseignant/" + idAddFiliere + "/filiere/" + idAddEcue + "/necus";

            loadDeleteData("enseignantecu/", data, setMovData, () => {
                loadGetData(chemin1, setMovECUEecue);
                if (idAddFiliere != "" && idAddEcue != "") {
                    loadGetData(chemin2, setAddECUEecue);
                    loadGetData(chemin3, setAddECUENecue);
                }
            });
        }

        setInterval(() => {
            setMovData(false);
            setLoadMov(false);
        }, 2000);
    }



    // configuration des userEffect 

    useEffect(() => {
        loadGetData("enseignants", setAllEnseignant);
    }, [])


    // retour HTML
    return (
        <>
            <div className='h-full bg-c5 pt-6 flex flex-row flex-wrap shadow-lg rounded-xl border border-c3'>
                <div className='text-center w-[100%] mb-4 px-4'>
                    <div className='bg-c3 py-5 px-3 text-c1 font-bold text-2xl'>
                        Attribution & Restriction d'ECUE
                    </div>
                </div>

                <div className=' w-[100%] lg:w-1/2 px-4 mb-8'>
                    <div className='bg-c3 pb-1 rounded-xl'>
                        <div className='bg-c1 px-2 py-3 font-bold rounded-xl'>
                            <h1>
                                Attribuer un ECUE à un Enseignant
                            </h1>
                        </div>
                        <div className='px-2 py-5'>
                            <form onSubmit={handleAddEcueEnseignant} className='py-4 flex flex-col px-5'>
                                <div className='flex flex-wrap pt-5 pb-5'>
                                    <div className='w-1/2 px-3'>
                                        <select
                                            name="Enseignant"
                                            id="idEnseignant"
                                            className='p-2 w-[100%] cursor-pointer rounded-full'
                                            required
                                            onChange={handleUpdateAddECUEFilieres}
                                        >
                                            <option value="">Choisissez l'enseignant</option>
                                            {
                                                allEnseignant.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.firstName + " " + item.surName + ", " + item.dname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='w-1/2 px-3'>
                                        <select
                                            name="FiliereEnseignant"
                                            id="idFiliereEnseignant"
                                            className='p-2 w-[100%] cursor-pointer rounded-full'
                                            required
                                            onChange={handleUpdateAddECUEecue}
                                        >
                                            <option value=""> Filière de l'enseignant </option>
                                            {
                                                addECUEFilieres.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.fname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className='flex flex-wrap pt-5 pb-5'>
                                    <div className='w-1/2 px-3'>
                                        <select
                                            name="filiereEn"
                                            id="ecueId"
                                            className='w-[100%] p-2 cursor-pointer rounded-full'
                                            required
                                        >
                                            <option value=""> Choisissez l'ECUE </option>
                                            {
                                                addECUENecue.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.ename}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="w-1/2 px-3" >
                                        <button type="submit" className='bg-c1 w-[100%] max-lg:mx-auto hover:font-bold px-6 py-2 rounded-full'>Ajouter</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className='px-10'>
                            <div className='bg-c5 rounded-2xl px-2 mb-5 pb-2'>
                                <h1 className=' text-c3 p-2 font-bold rounded-full text-center'> Les ECUE actuels de l'enseignant sélectionné </h1>
                                <div className='w-max max-w-[100%]  p-4 text-center rounded-2xl text-wrap bg-c4'>
                                    {
                                        addECUEecue.map((item) => (
                                            <span key={item.id} className='italic px-2 mr-1 bg-c1 rounded-full w-max inline-block font-bold my-1'>{item.ename}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    // formulaire de retrait de l'ecu
                }

                <div className=' w-[100%] lg:w-1/2 px-4 mb-8'>
                    <div className='bg-c3 pb-1 rounded-xl'>
                        <div className='bg-c1 px-2 py-3 font-bold rounded-xl'>
                            <h1>
                                Retirer un ECUE à un Enseignant
                            </h1>
                        </div>

                        <div className='px-2 py-5'>
                            <form onSubmit={handleMovEcueEnseignant} className='py-4 flex flex-col px-5'>
                                <div className='flex flex-wrap pt-5 pb-5'>
                                    <div className='w-1/2 px-3'>
                                        <select
                                            name="Enseignant2"
                                            id="idEnseignant2"
                                            className='p-2 w-[100%] cursor-pointer rounded-full'
                                            required
                                            onChange={handleUpdateMovECUEFilieres}
                                        >
                                            <option value="">Choisissez l'enseignant</option>
                                            {
                                                allEnseignant.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.firstName + " " + item.surName + ", " + item.dname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='w-1/2 px-3'>
                                        <select
                                            name="FiliereEnseignant2"
                                            id="idFiliereEnseignant2"
                                            className='p-2 w-[100%] cursor-pointer rounded-full'
                                            required
                                            onChange={handleUpdateMovECUEecue}
                                        >
                                            <option value=""> Filière de l'enseignant </option>
                                            {
                                                movECUEFiliere.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.fname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className='flex flex-wrap pt-5 pb-5'>
                                    <div className='w-1/2 px-3'>
                                        <select
                                            name="filiereEn2"
                                            id="ecueId2"
                                            className='w-[100%] p-2 cursor-pointer rounded-full'
                                            required
                                        >
                                            <option value=""> Choisissez l'ECUE </option>
                                            {
                                                movECUEecue.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.ename}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="w-1/2 px-3" >
                                        <button type="submit" className='bg-c1 w-[100%] max-lg:mx-auto hover:font-bold px-6 py-2 rounded-full'>Retirer</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className='px-10'>
                            <div className='bg-c5 rounded-2xl px-2 mb-5 pb-2'>
                                <h1 className=' text-c3 p-2 font-bold rounded-full text-center'> Les ECUE actuels de l'enseignant sélectionné </h1>
                                <div className='w-max max-w-[100%]  p-4 text-center rounded-2xl text-wrap bg-c4'>
                                    {
                                        movECUEecue.map((item) => (
                                            <span key={item.id} className='italic px-2 mr-1 bg-c1 rounded-full w-max inline-block font-bold my-1'>{item.ename}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Loader value={loadAdd} />
            <Succefful value={addData} text={"ECUE attribué avec succès !"} />
            <Loader value={loadMov} />
            <Succefful value={movData} text={"ECUE retiré avec succès !"} />

        </>
    )
}
