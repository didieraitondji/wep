import React, { useState, useEffect } from 'react'
import { loadGetData, loadPostData, childCliked } from '../Fonctions';
import Warning from '../Warning';
import Succefful from '../Succefful';
import Loader from '../Loader';


export default function Departement() {

    const [departements, setDepartements] = useState([]);
    const [postData, setPostData] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [formData, setFormeData] = useState("");
    const [warning, setWarning] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        loadGetData('departements', setDepartements);
    }, []);

    const handleAddDepartement = (e) => {
        setLoad(true);

        const data = {
            name: formData,
        }

        loadPostData('departement', data, setPostData, () => {
            loadGetData('departements', setDepartements);
            setConfirm(!confirm);
        });

        setWarning(!postData);


        setInterval(() => {
            setWarning(false);
            setLoad(false);
            setPostData(false);
        }, 3000);
    }

    const handleAcceptAddDepartement = (e) => {
        e.preventDefault();
        setConfirm(!confirm);
        setFormeData(document.getElementById("namedep").value);
    }

    return (
        <>
            <div className='p-3 h-full bg-c5 grid grid-rows-[1fr_auto] shadow-md rounded-lg'>
                <div>
                    <div className='p-2'>
                        <div className='grid grid-cols-[auto_100px] border border-c1 rounded-t-lg'>
                            <h1 className='p-2 bg-c2 rounded-tl-lg'>
                                Départements
                            </h1>
                            <span className='bg-c1 p-2 text-center rounded-tr-lg font-bold'>
                                {
                                    departements.length
                                } +
                            </span>
                        </div>
                        <div className='border border-c1 text-c3'>
                            <table className='w-[100%]'>
                                <thead>
                                    <tr className='bg-c1 w-[100%]'>
                                        <th className='p-2'>N°</th>
                                        <th className='p-2 text-left'>Libellé</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        departements.map((item, index) => (
                                            <tr key={item.id} className='bg-c2'>
                                                <td className='p-2 text-center border border-c1'>{index + 1}</td>
                                                <td className='p-2 border border-c1'>
                                                    {item.name}
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='mt-3 p-2'>
                    <div className='bg-c3 text-c2 font-bold p-2'>
                        Ajouter un département
                    </div>
                    <div className='pt-2 border border-c3 rounded-b-lg'>
                        <form onSubmit={handleAcceptAddDepartement} className='py-8 px-4'>
                            <div className='flex flex-row items-center'>
                                <label htmlFor="" className='w-1/3 text-center'>Nom :</label>
                                <input type="text" name='name' className='border border-c3 w-2/3 p-2 rounded-lg text-sm' autoComplete='on' id='namedep' required placeholder='entrer le nom du département' />
                            </div>
                            <div className='flex flex-row pt-5'>
                                <span className='w-1/3'></span>
                                <button type='submit' className='w-2/3 text-center p-2 bg-c1 rounded-lg hover:font-bold' title='Ajouter une filière'>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
                confirm && (
                    <div onClick={handleAcceptAddDepartement} className='fixed top-0 left-[80px] right-0 bottom-0 bg-[#00000065] flex items-center justify-center'>
                        <div onClick={childCliked} className='bg-c2 p-5 shadow-lg rounded-md slide-down min-w-[200px]'>
                            <div>
                                Ajouter le departement "{formData}" ?
                            </div>
                            <div className='pt-10 flex'>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleAddDepartement} className='px-4 py-2 bg-c1 rounded-md cursor-pointer'>Oui</span>
                                </div>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleAcceptAddDepartement} className='px-4 py-2 cursor-pointer hover:bg-c3 hover:text-c2 rounded-md'>Non</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <Loader value={load} />
            <Warning value={warning} text={"Le Département existe déjà !"} />
            <Succefful value={postData} text={"Département ajoutée avec succès !"} />
        </>
    )
}
