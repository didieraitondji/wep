import React, { useEffect, useState } from 'react'
import { loadGetData, loadPostData } from '../Fonctions';
import ListeEtudiant from './ListeEtudiant';
import Loader from '../Loader';
import Succefful from '../Succefful';

export default function AddEtudiant() {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            setFileName(file.name);
        } else {
            alert('Veuillez sélectionner un fichier Excel (.xlsx, .xls)');
            e.target.value = null;
            setFileName('');
        }
    };

    const [filieres, setFilieres] = useState([]);

    const [load, setLoad] = useState(false);
    const [addData, setAddData] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [mailvide, setMailVide] = useState(true);

    const [formDataEt, setFormDataEt] = useState({
        firstNameEt: "",
        surNameEt: "",
        motDePasseEt: "Etudiant123",
        filiere: "",
        emailEt: "",
        telephoneEt: "",
        matriculeEt: "",
    })

    const addFormeDataEt = (e) => {
        const { name, value } = e.target;

        setFormDataEt({
            ...formDataEt,
            [name]: value,
        })
    }

    // useEffect

    useEffect(() => {
        loadGetData('filieres', setFilieres);
    }, [])

    const handleAddEtudiant = (e) => {
        e.preventDefault();
        setLoad(true);

        const data = {
            firstName: formDataEt.firstNameEt,
            surName: formDataEt.surNameEt,
            filiere: formDataEt.filiere,
            motDePasse: formDataEt.motDePasseEt,
            email: formDataEt.emailEt,
            telephone: formDataEt.telephoneEt,
            matricule: formDataEt.matriculeEt
        }

        loadPostData('etudiant', data, setAddData, () => { });

        setInterval(() => {
            setAddData(false);
            setLoad(false);
        }, 1500);
    }


    const followMailEt = (e) => {
        let isValide = true;
        let chanMail = document.getElementById("emailEt");
        if (chanMail.value === "") {
            setMailVide(true);
            isValide = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(chanMail.value)) {
            setMailVide(false);
            setIsMail(false);
            isValide = false;
        }
        else {
            setMailVide(false);
            setIsMail(true);

            const { name, value } = e.target;

            setFormDataEt({
                ...formDataEt,
                [name]: value,
            })
        }

        return isValide;
    }

    return (
        <>
            {
                // ajout d'un etudiant
            }
            <div className=' shadow-md m-5'>
                <div className='bg-c3 text-c2 px-4 py-2'>
                    Remplissez les champs pour ajouter un Etudiant
                </div>
                <div className='p-2'>
                    <form onSubmit={handleAddEtudiant} className='text-sm'>
                        <div className='flex flex-wrap'>
                            <div className='w-[100%] sm:w-1/2 p-4'>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="surNameEt" className='w-[100%] lg:w-1/4'>Nom :</label>
                                    <input type="text" name="surNameEt" id="surNameEnEt" placeholder='entrer le(s) prénom(s)*' className='w-[100%] lg:w-3/4 p-2 border border-c1 rounded-sm' required onChange={addFormeDataEt} />
                                </div>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="emailEt" className='w-[100%] lg:w-1/4'>Email :</label>
                                    <div className='w-[100%] lg:w-3/4'>
                                        <input type="email" name="emailEt" id="emailEt" placeholder='entrer le mail*' className='w-[100%] p-2 border border-c1 rounded-sm' required onChange={addFormeDataEt} onInput={followMailEt} />
                                        {
                                            isMail && (
                                                <div className="flex flex-row items-center text-blue-600">
                                                    <span className="pr-2 font-bold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-[0.7em]">Email valide</span>
                                                </div>
                                            )
                                        }

                                        {!isMail && !mailvide && (
                                            <div className="flex flex-row items-center text-red-600">
                                                <span className="pr-2 font-bold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                    </svg>
                                                </span>
                                                <span className="text-[0.7em]">Email invalide</span>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="telephoneEt" className='w-[100%] lg:w-1/4'>Téléphone :</label>
                                    <input type="tel" name="telephoneEt" id="telephoneEt" placeholder='entrer le téléphone*' className='w-[100%] lg:w-3/4 p-2 border border-c1 rounded-sm' required onChange={addFormeDataEt} />
                                </div>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="matriculeEt" className='w-[100%] lg:w-1/4'>Matricule :</label>
                                    <input type="text" name="matriculeEt" id="matriculeEt" placeholder='entrer le matricule*' className='w-[100%] lg:w-3/4 p-2 border border-c1 rounded-sm' required onChange={addFormeDataEt} />
                                </div>
                            </div>
                            <div className='w-[100%] sm:w-1/2 p-4'>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="firstNameEt" className='w-[100%] lg:w-1/4'>Prénoms :</label>
                                    <input type="text" name="firstNameEt" id="firstNameEt" placeholder='entrer le nom*' className='w-[100%] lg:w-3/4 p-2 border border-c1 rounded-sm' required onChange={addFormeDataEt} />
                                </div>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="" className='w-[100%] lg:w-1/4'>Mot de passe :</label>
                                    <input type="text" name="motDePasse" id="motDePasseEn" value={"Etudiant123"} className='w-[100%] lg:w-3/4 p-2 border border-c1 rounded-sm' required disabled />
                                </div>
                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="" className='w-[100%] lg:w-1/4'>Filière :</label>
                                    <select name="filiere" id="filiere" className='w-[100%] lg:w-3/4 p-2 border border-c1 rounded-sm' required onChange={addFormeDataEt} >
                                        <option value=""></option>
                                        {
                                            filieres.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className='flex items-center mb-5 flex-wrap'>
                                    <label htmlFor="" className='w-[100%] lg:w-1/4 text-c2'>d</label>
                                    <button type="submit" className='w-[100%] lg:w-3/4 text-center bg-c1 p-2 rounded-sm hover:font-bold'>
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

            {
                // importation de fichier
            }

            < div className='shadow-md m-5 shadow-black' >
                <div className='bg-c3 text-c2 px-4 py-10'>
                    <form>
                        <div className='flex flex-wrap items-center '>
                            <div className='w-[100%] lg:w-1/2 text-center'>
                                Importez un fichier Excel
                            </div>
                            <div className='w-[100%] lg:w-1/2 flex flex-wrap items-center bg-c2 p-2'>
                                <input
                                    type="file"
                                    name="donneesexcel"
                                    id="donneesexcel"
                                    placeholder='Ajouter un fichier '
                                    className='hidden-file-input p-2 w-1/2 bg-white text-c1'
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange}
                                />
                                <button type="submit" className='w-1/2 bg-c1 rounded-sm px-4 py-2'> Ajouter </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >

            {
                // liste des etudiants acctuellement sur la plateforme
            }
            < div className='shadow-md m-5' >
                <ListeEtudiant filieres={filieres} />
            </div >

            <Loader value={load} />
            <Succefful value={addData} text={"Etudiant ajouté avec succès !"} />
        </>
    )
}
