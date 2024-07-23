import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../composants/admin/Menu';
import TopBarAdmin from '../composants/admin/TopBar';
import CardNumber from '../composants/admin/CardNumber';
import Filiere from '../composants/admin/Filiere';
import Ue from '../composants/admin/Ue';

export default function DashboardAdmin() {
    document.getElementsByTagName("title")[0].innerHTML = "Tableau de bord | Admin WeP";

    const navigate = useNavigate();
    const [nav, setNav] = useState(false);
    const [userData, setUserData] = useState("");

    const keyExists = (key) => {
        return localStorage.getItem(key) !== null;
    };

    useEffect(() => {
        if (keyExists("userData") && JSON.parse(localStorage.getItem("userData")).type === "enseignant") {
            navigate('/enseignant/');
        }
        else if (keyExists("userData") && JSON.parse(localStorage.getItem("userData")).type === "etudiant") {
            navigate('/etudiant/');
        }
        else if (keyExists("userData") && JSON.parse(localStorage.getItem("userData")).type === "admin") {
            //navigate('/admin/');
            const data = JSON.parse(localStorage.getItem("userData"));
            setNav(true);
            setUserData(JSON.parse(localStorage.getItem("userData")).data);

        }
        else {
            navigate('/');
        }
    }, [navigate, setNav, setNav]);

    return (
        <>
            <div className='font-poppins'>
                <div className='bg-c1 fixed left-[80px] right-0 top-0 h-[54px]'>
                    <TopBarAdmin text={"Tableau de bord"} prenom={userData.firstName} />
                </div>
                <div className='fixed top-[54px] left-[80px] bottom-0 right-0 overflow-auto px-5 py-5'>
                    {
                        // quelques chiffres
                    }
                    <div className='px-5 py-5 bg-c5 rounded-lg shadow-md'>
                        <h1 className='text-lg font-bold pb-2 border-b border-b-c3'>We Pratice, c'est : </h1>
                        <div className='mt-4 p-3 grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr]'>
                            <div className='px-2'>
                                <CardNumber url={'http://wep-api.com/total/enseignants'} forme={3} />
                            </div>
                            <div className='px-2'>
                                <CardNumber url={'http://wep-api.com/total/etudiants'} forme={1} />
                            </div>
                            <div className='px-2'>
                                <CardNumber url={'http://wep-api.com/total/tp'} forme={3} />
                            </div>
                            <div className='px-2'>
                                <CardNumber url={'http://wep-api.com/total/soumissions'} forme={1} />
                            </div>
                        </div>
                    </div>
                    {
                        // block pour les formulaire d'ajout de filieres, ue, ecu et départements
                    }
                    <div className='py-5 grid md:grid-cols-[1fr_1fr] w-full'>
                        <div className='mb-6 mr-4'>
                            <Filiere />
                        </div>
                        <div className='mb-6 ml-4'>
                            <Ue />
                        </div>
                    </div>
                </div>
                <div className='bg-c3 fixed left-0 top-0 bottom-0 w-[80px] px-2 py-2'>
                    <MenuAdmin page={"accueil"} />
                </div>
            </div>
        </>
    )
}
