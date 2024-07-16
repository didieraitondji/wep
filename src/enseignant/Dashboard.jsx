import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuEnseignant from '../composants/enseignant/Menu';
import TopBarEnseignant from '../composants/enseignant/TopBar';

export default function DashboardEnseignant() {
    document.getElementsByTagName("title")[0].innerHTML = "Tableau de bord | Enseignant";
    // récupération des données utilisateur
    let userData = JSON.parse(localStorage.getItem("userData")).data;

    const navigate = useNavigate();

    const keyExists = (key) => {
        return localStorage.getItem(key) !== null;
    };

    useEffect(() => {
        if (keyExists("userData")) {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (data.type === "etudiant") {
                navigate('/etudiant/');
            } else if (data.type === "admin") {
                navigate('/admin/');
            }
            else {
                if (data.type !== "enseignant") {
                    navigate('/');
                }
            }
        }
        else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <div className='font-poppins'>
                <div className='bg-c3 fixed left-0 top-0 bottom-0 w-[80px] px-2 py-2'>
                    <MenuEnseignant page={"accueil"} />
                </div>
                <div className='bg-c1 fixed left-[80px] right-0 top-0 h-[54px]'>
                    <TopBarEnseignant text={"Tableau de bord"} prenom={userData.firstName} />
                </div>
                <div className='fixed top-[54px] left-[80px] bottom-0 right-0 overflow-auto px-5 py-3'>

                </div>
            </div>
        </>
    )
}
