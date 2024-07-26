import React, { useEffect, useState } from 'react'
import { loadGetData } from '../Fonctions';

export default function ProfilEtudiantComponent() {
    const userData = JSON.parse(localStorage.getItem("userData")).data;
    const [ecus, setEcus] = useState([]);
    const [filiere, setFiliere] = useState([]);
    const [userInfo, setUserInfo] = useState({
        nom: userData.surName,
        prenoms: userData.firstName,
        email: userData.email,
        telephone: userData.telephone,
    });


    const handleTelephoneChange = (e) => {
        setUserInfo({
            ...userInfo,
            telephone: e.target.value,
        })
    }

    const handleEmailChange = (e) => {
        setUserInfo({
            ...userInfo,
            email: e.target.value,
        })
    }

    const handleNomChange = (e) => {
        setUserInfo({
            ...userInfo,
            nom: e.target.value,
        })
    }

    const handlePrenomsChange = (e) => {
        setUserInfo({
            ...userInfo,
            prenoms: e.target.value,
        })
    }


    useEffect(() => {
        loadGetData(`filiere/${userData.id_filiere}/ecus`, setEcus);
        loadGetData(`filiere/${userData.id_filiere}/`, setFiliere);
    }, [setFiliere, setEcus]);

    console.log(ecus);

    return (
        <>
            <div className='bg-c5 min-h-full rounded-lg p-10'>
                <div className='flex flex-row flex-wrap md:w-[90%] mx-auto border border-c3 p-8 rounded-xl'>
                    <div className='w-full lg:w-1/2 rounded-lg p-5'>
                        <div className='border border-c3 h-[300px] w-[300px] rounded-full flex items-center justify-center mx-auto mb-5 text-c1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </div>
                        {
                            // réseaux sociaux
                        }
                        <div className='border border-c3 w-[300px] mx-auto px-3 py-5 rounded-lg'>
                            <div className='flex w-full flew-row flex-wrap border border-c3 rounded-xl mb-5'>
                                <span className='bg-c3 text-c1 font-bold p-1 px-2 rounded-l-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                </span>
                                <span></span>
                            </div>
                            <div className='flex w-full flew-row flex-wrap border border-c3 rounded-xl mb-5'>
                                <span className='bg-c3 text-c1 font-bold p-1 px-2 rounded-l-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                    </svg>
                                </span>
                                <span></span>
                            </div>
                            <div className='flex w-full flew-row flex-wrap border border-c3 rounded-xl mb-2'>
                                <span className='bg-c3 text-c1 font-bold p-1 px-2 rounded-l-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                                    </svg>
                                </span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 rounded-lg '>
                        <div className='w-full border border-c3 rounded-lg mb-4'>
                            <h1 className='p-2 text-center font-bold bg-c1 rounded-t-lg mb-3'>
                                Etat civil
                            </h1>
                            <div className='px-8 py-2 pb-4'>
                                <div className='flex flex-row w-full items-center justify-center border border-c3 rounded-xl mb-8 text-center'>
                                    <label
                                        htmlFor="firstName"
                                        className='w-1/4 p-2 bg-c3 font-bold text-c1 rounded-l-xl'
                                    >
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className='w-3/4  p-2 text-center outline-none rounded-r-xl font-bold'
                                        id="firstName"
                                        value={userInfo.nom}
                                        onChange={handleNomChange}
                                    />
                                </div>
                                <div className='flex flex-row w-full items-center justify-center border border-c3 rounded-xl mb-8'>
                                    <label
                                        htmlFor="firstName"
                                        className='w-1/4 p-2 bg-c3 font-bold text-c1 rounded-l-xl text-center'
                                    >
                                        Prénoms
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className='w-3/4  p-2 text-center outline-none rounded-r-xl font-bold'
                                        id="firstName"
                                        value={userInfo.prenoms}
                                        onChange={handlePrenomsChange}
                                    />
                                </div>
                                <div className='flex flex-row w-full items-center justify-center border border-c3 rounded-xl mb-8'>
                                    <label
                                        htmlFor="firstName"
                                        className='w-1/4 p-2 bg-c3 font-bold text-c1 rounded-l-xl text-center'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className='w-3/4  p-2 text-center outline-none rounded-r-xl font-bold'
                                        id="firstName"
                                        value={userInfo.email}
                                        onChange={handleEmailChange}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-row w-full items-center justify-center border border-c3 rounded-xl mb-8'>
                                    <label
                                        htmlFor="firstName"
                                        className='w-1/4 p-2 bg-c3 font-bold text-c1 rounded-l-xl text-center'
                                    >
                                        Téléphone
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className='w-3/4  p-2 text-center outline-none rounded-r-xl font-bold'
                                        id="firstName"
                                        value={userInfo.telephone}
                                        onChange={handleTelephoneChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full border border-c3 rounded-lg mb-4'>
                            <h1 className='p-2 text-center font-bold bg-c1 rounded-t-lg mb-2'>
                                Filière
                            </h1>
                            <div className='px-3 py-3 pb-4 flex flex-col text-center'>
                                {
                                    filiere.map((item) => (
                                        item.name
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-full border border-c3 rounded-lg mb-4'>
                            <h1 className='p-2 text-center font-bold bg-c1 rounded-t-lg mb-2'>
                                UE & ECUE
                            </h1>
                            <div className='px-3 py-3 pb-4 flex flex-col'>
                                <table className='w-full border border-c3'>
                                    <thead>
                                        <tr className='bg-c3 text-c1'>
                                            <th className='py-2'>N°</th>
                                            <th className='py-2 text-left'>ECUE</th>
                                            <th className='py-2 text-left'>UE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ecus.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className='py-2 px-1 text-center'>{index+1}</td>
                                                    <td className='py-2 px-1'>{item.ecuName}</td>
                                                    <td className='py-2 px-1'>{item.ueName}</td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
