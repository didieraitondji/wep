import React, { useEffect, useState } from 'react';
import { loadGetData } from '../Fonctions';

export default function ListeEtudiant({ filieres }) {
    const [etudiantFiliere, setEtudiantFiliere] = useState([]);
    const [filierSel, setFiliereSel] = useState("");

    const handleGetStudentByFiliere = (e) => {
        e.preventDefault();
        let valeur = document.getElementById("filierespEt").value;
        if (valeur !== "") {
            let chemin = "etudiants/filiere/" + valeur;
            console.log(chemin);
            loadGetData(chemin, setEtudiantFiliere);
        }
    };

    useEffect(() => {

    }, [etudiantFiliere]);

    return (
        <>
            <h1 className='text-center bg-c3 text-c2 p-2 font-bold'>Les étudiants inscrits sur la plateforme ({etudiantFiliere.length})</h1>
            <div className='bg-c1 min-h-[50px] flex items-center justify-end mb-5 py-2'>
                <form onSubmit={handleGetStudentByFiliere} className='px-10'>
                    <label htmlFor="filiere" className='px-5'>
                        Filière :
                    </label>
                    <select name="filiereSel" id="filierespEt" className='p-2' onChange={handleGetStudentByFiliere}>
                        <option value=""></option>
                        {
                            filieres.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                    <button type="submit" className='px-4 py-2 bg-c3 text-c2 font-bold'>Afficher</button>
                </form>
            </div>
            <div className='p-3'>
                <table className='w-[100%] border border-c1'>
                    <thead>
                        <tr className='bg-c1 text-md'>
                            <th className="py-2 px-1 text-left">N°</th>
                            <th className="py-2 px-1 text-left">Nom</th>
                            <th className="py-2 px-1 text-left">Prénoms</th>
                            <th className="py-2 px-1 text-left">Email</th>
                            <th className="py-2 px-1 text-left">Téléphone</th>
                            <th className="py-2 px-1 text-left">Filière</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            etudiantFiliere.map((etudiant, index) => (
                                <tr key={etudiant.id} className='text-md'>
                                    <td className="py-2 px-1 text-left">{index + 1}</td>
                                    <td className="py-2 px-1 text-left">{etudiant.surName}</td>
                                    <td className="py-2 px-1 text-left">{etudiant.firstName}</td>
                                    <td className="py-2 px-1 text-left">{etudiant.email}</td>
                                    <td className="py-2 px-1 text-left">{etudiant.telephone}</td>
                                    <td className="py-2 px-1 text-left">{etudiant.fname}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
