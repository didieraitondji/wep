import React, { useEffect, useState } from 'react'
import { loadGetData } from '../Fonctions';
import TpModel from '../TpModel';

export default function TpEtudiants() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")).data);
    const [idEcu, setIdEcu] = useState("");
    const [lesTp, setLesTp] = useState([]);
    const [lesEcus, setLesEcus] = useState([]);

    useEffect(() => {
        loadGetData(`filiere/${userData.id_filiere}/ecus`, setLesEcus);
    }, [])

    console.log(userData.id_filiere)

    const handleSetIdEcu = (e) => {
        let id = e.target.value;

        if (id != "") {
            setIdEcu(id);
        }
    }

    const handleShowEcuTp = (e) => {
        e.preventDefault();

        if (idEcu != "") {
            loadGetData(`filiere/${userData.id_filiere}/ecu/${idEcu}/tps`, setLesTp);
        }
    }

    useEffect(() => { }, [lesTp])

    console.log(lesTp)


    return (
        <>
            <div className='bg-c5 min-h-full rounded-2xl overflow-auto p-5'>
                <div className=''>
                    <form onSubmit={handleShowEcuTp} className='bg-c4 p-5 rounded-full flex items-center justify-center'>
                        <div className='flex w-1/2 items-center'>
                            <label htmlFor="" className='px-3 w-1/2 text-right'>ECUE : </label>
                            <select
                                name="ecue"
                                id="ecue"
                                className=' p-2 rounded-full w-2/3'
                                value={idEcu}
                                onChange={handleSetIdEcu}
                            >
                                <option value="">Choisissez une filière</option>
                                {
                                    lesEcus.map((item) => (
                                        <option key={item.id} value={item.id}>{item.ecuName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-1/2 items-center justify-start pl-10'>
                            <input type="submit" value="Afficher" className='p-2 px-5 bg-c1 rounded-full cursor-pointer hover:font-bold' />
                        </div>
                    </form>
                </div>
                <div className='bg-c4 p-5 h-[68vh] mt-5 rounded-3xl overflow-auto'>

                    {
                        lesTp.length == 0 && (
                            <div className='flex flex-col text-center items-center justify-center w-full h-full'>
                                <span className='text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-patch-exclamation" viewBox="0 0 16 16">
                                        <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                                        <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                    </svg>
                                </span><br />
                                <span className='text-c3'>
                                    Aucun TP à afficher ! <br /> <br /> Veuillez effectuer de Selection et cliquer sur le bouton  <span className='font-bold text-c1'>Afficher</span>
                                </span>
                            </div>
                        )
                    }

                    {
                        lesTp.map((item, index) => (
                            <TpModel key={item.id} index={index + 1} title={item.title} description={item.description} pubdate={item.datePublier} senddate={item.dateSoumission} filiere={item.fname} ecue={item.ename} file={item.filePath} enseignant={item.efirstName + " " + item.esurName} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
