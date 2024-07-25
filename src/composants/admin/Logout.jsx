import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { childCliked } from '../Fonctions';

export default function LogoutAdmin() {
    const navigate = useNavigate();
    const [avis, setAvis] = useState(false);

    const handleLogOut = () => {
        setAvis(!avis);
    }

    const handleOkay = () => {
        localStorage.removeItem("userData");
        navigate("/admin-connexion/");
    }

    return (
        <div>
            <div onClick={handleLogOut} className='flex flex-col items-center justify-center text-c1 cursor-pointer bg-red-700 pt-2 px-2 rounded-md hover:bg-red-600' title='Se déconnecter'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                </svg>
                <span className='text-[0.7em] py-2 font-bold'>
                    log-out
                </span>
            </div>

            {
                avis && (
                    <div onClick={handleLogOut} className='bg-[#00000072] fixed top-0 right-0 left-0 bottom-0 flex flex-row items-center justify-center'>
                        <div onClick={childCliked} className='bg-c2 p-5 shadow-lg rounded-md slide-down'>
                            <div>
                                Voulez vous vraiment vous déconnecter ?
                            </div>
                            <div className='pt-10 flex'>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleOkay} className='px-4 py-2 bg-c1 rounded-md cursor-pointer'>Oui</span>
                                </div>
                                <div className='w-1/2 flex items-center justify-center font-bold'>
                                    <span onClick={handleLogOut} className='px-4 py-2 cursor-pointer hover:bg-c3 hover:text-c2 rounded-md'>Non</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
