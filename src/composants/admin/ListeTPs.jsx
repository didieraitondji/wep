import React, { useEffect, useState } from 'react';
import { loadGetData } from '../Fonctions';

export default function ListeTPsAdmin() {
    const [filieres, setFilieres] = useState([]);
    const [ecus, setEcus] = useState([]);
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedEcu, setSelectedEcu] = useState('');

    const handleChargeIdFiliere = (e) => {
        const filiereId = e.target.value;
        setSelectedFiliere(filiereId);
        let chemin = `filiere/${filiereId}/ecus/`;
        loadGetData(chemin, setEcus);
    };

    const handleEcuChange = (e) => {
        setSelectedEcu(e.target.value);
    };

    useEffect(() => {

    }, [ecus]);

    useEffect(() => {
        loadGetData('filieres', setFilieres);
    }, []);

    return (
        <>
            <div className='bg-c5 p-8 pb-16'>
                <form className='grid grid-cols-[1fr_1fr_1fr]'>
                    <div className='flex items-center justify-center'>
                        <select
                            name="filieres"
                            id="filieres"
                            className='p-2 min-w-[80%]'
                            required
                            onChange={handleChargeIdFiliere}
                            value={selectedFiliere}
                        >
                            <option value="">Choisissez la filière</option>
                            {filieres.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center justify-center'>
                        <select
                            name="ecus"
                            id="ecus"
                            className='p-2 min-w-[80%]'
                            required
                            onChange={handleEcuChange}
                            value={selectedEcu}
                        >
                            <option value="">Choisissez l'ECUE</option>
                            {ecus.map((item) => (
                                <option key={item.id} value={item.id}>{item.ecuName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button type="submit" className='min-w-[50%] bg-c3 text-c2 font-bold px-4 py-2 cursor-pointer'>Afficher</button>
                    </div>
                </form>
            </div>
            <div className='bg-c3 mx-12 p-4 text-c2 mt-[-30px]'>
                <h1>
                    Les Travaux Pratiques
                </h1>
            </div>
        </>
    );
}
