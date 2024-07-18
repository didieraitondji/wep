import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuEtudiant from '../composants/etudiant/Menu';
import TopBarEtudiant from '../composants/etudiant/TopBar';

export default function ProfilEtudiant() {
    document.getElementsByTagName("title")[0].innerHTML = "Profil | Etudiant";
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
            //navigate('/etudiant/');
            const data = JSON.parse(localStorage.getItem("userData"));
            setNav(true);
            setUserData(JSON.parse(localStorage.getItem("userData")).data);
        }
        else if (keyExists("userData") && JSON.parse(localStorage.getItem("userData")).type === "admin") {
            navigate('/admin/');
        }
        else {
            navigate('/');
        }
    }, [navigate, setNav, setNav]);

    return (
        <>
            <div className='font-poppins'>
                <div className='bg-c3 fixed left-0 top-0 bottom-0 w-[80px] px-2 py-2'>
                    <MenuEtudiant page={"profil"} />
                </div>
                <div className='bg-c1 fixed left-[80px] right-0 top-0 h-[54px]'>
                    <TopBarEtudiant text={"Profil Personel"} prenom={userData.firstName} />
                </div>
                <div className='fixed top-[54px] left-[80px] bottom-0 right-0 overflow-auto px-5 py-3'>
                    {
                        // le corps de chaque page restera dans ce div juste après l'accollade suivante 
                    }
                </div>
            </div>
        </>
    )
}
