import React, { useEffect, useState } from 'react'
import { loadDeleteData, loadGetData } from '../Fonctions';
import Loader from '../Loader';
import Succefful from '../Succefful';

export default function MovUeFiliere({ filieres }) {

    const [uesFiliereb, setUesFiliereb] = useState([]);
    const [nUesFiliereb, setNUesFiliereb] = useState([])
    const [addData, setAddData] = useState(false);
    const [load, setLoad] = useState(false);

    const handleUesFiliereb = (e) => {
        e.preventDefault();

        let valeur = document.getElementById("filieresb").value;
        if (valeur != "") {
            let chemin1 = "filiere/" + valeur + "/ues/";
            let chemin2 = "filiere/" + valeur + "/nues/";

            loadGetData(chemin1, setUesFiliereb);
            loadGetData(chemin2, setNUesFiliereb);
        }
    }

    useEffect(() => {

    }, [uesFiliereb, nUesFiliereb])

    const handleMovUeFiliere = (e) => {
        e.preventDefault();

        let val1 = document.getElementById("filieresb").value;
        let val2 = document.getElementById("ecub").value;

        let chemin1 = "filiere/" + val1 + "/ues/";
        let chemin2 = "filiere/" + val1 + "/nues/";

        if (val1 != "" && val2 != "") {

            const data = {
                id_Ue: val2,
                id_filiere: val1,
            }

            loadDeleteData("uefiliere", data, setAddData, () => {
                loadGetData(chemin1, setUesFiliereb);
                loadGetData(chemin2, setNUesFiliereb);
            });

            setInterval(() => {
                setAddData(false);
                setLoad(false);
            }, 1500);
        }
    }

    return (
        <>
            <div className='h-full bg-c5'>
                <div className='w-full bg-c1 px-2 py-3 font-bold'>
                    <h1>
                        Retirer une UE à une Filière
                    </h1>
                </div>
                <div className='px-2 py-5'>
                    <form onSubmit={handleMovUeFiliere} className='grid lg:grid-cols-[1fr_1fr_1fr] max-lg:grid-cols-[1fr_1fr]'>
                        <select name="filieresb" id="filieresb" className='p-2 max-lg:w-[90%] max-lg:mx-auto mx-2 max-lg:mb-4 max-lg:col-span-2' onChange={handleUesFiliereb}>
                            <option value="">Choisissez la filière</option>
                            {
                                filieres.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                        <select name="ecub" id="ecub" className='p-2 max-lg:w-[90%] max-lg:mx-auto mx-2 max-lg:mb-4 max-lg:col-span-2'>
                            <option value="">Choisissez l'UE</option>
                            {
                                uesFiliereb.map((item) => (
                                    <option key={item.id} value={item.id}>{item.ueName}</option>
                                ))
                            }
                        </select>
                        <button type="submit" className='bg-c1 max-lg:w-[90%] max-lg:mx-auto hover:font-bold px-6 py-2 mx-2 max-lg:col-span-2'>Retirer</button>
                    </form>
                </div>
                <div>
                    <h1 className='bg-c1 w-max p-2 rounded-r-lg font-bold'>Les UE Actuelle de la filière sélectionnée</h1>
                    <div className='w-auto bg-c2 p-2 mr-2 mb-1 rounded-r-lg'>
                        {
                            uesFiliereb.map((item) => (
                                <span key={item.id} className='italic mr-1 px-2 bg-c5 rounded-full'>{item.ueName}</span>
                            ))
                        }
                    </div>
                    <div className='p-1 text-center text-sm text-c3 italic'>
                        Si vous ne trouvez pas votre filière ou UE, veuillez actualiser votre session !
                    </div>
                </div>
            </div>
            <Loader value={load} />
            <Succefful value={addData} text={"UE retirée au Filière avec succès !"} />
        </>
    )
}
