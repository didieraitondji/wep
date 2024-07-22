import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../composants/admin/Menu';
import TopBarAdmin from '../composants/admin/TopBar';
import AddEnseignant from '../composants/admin/AddEnseignant';
import AddEtudiant from '../composants/admin/AddEtudiant';

export default function Utilisateurs() {

    document.getElementsByTagName("title")[0].innerHTML = "Gérer les Utilisateurs | Admin WeP";

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

    // gestion du choix d'options enseignant/etudiant
    const [isEnseignant, setisEnseignant] = useState(true);
    const [isEtudiant, setIsEtudiant] = useState(false);

    const handleChoiceEnseignant = () => {
        setIsEtudiant(false);
        setisEnseignant(true);
    }

    const handleChoiceEtudiant = () => {
        setIsEtudiant(true);
        setisEnseignant(false);
    }

    return (
        <>
            <div className='font-poppins'>
                <div className='bg-c1 fixed left-[80px] right-0 top-0 h-[54px]'>
                    <TopBarAdmin text={"Gestion des Utilisateur"} prenom={userData.firstName} />
                </div>
                <div className='fixed top-[54px] left-[80px] bottom-0 right-0 overflow-auto px-5 py-3'>

                    <div className='flex flex-wrap items-center bg-c3 p-3 m-5'>
                        <div className='w-1/2 text-center '>
                            <span onClick={handleChoiceEnseignant} className={`rounded-full px-4 py-1 hover:bg-c1 cursor-pointer font-bold ${isEnseignant ? "bg-c1" : "bg-c5"}`} > Enseignants </span>
                        </div>
                        <div className='w-1/2 text-center '>
                            <span onClick={handleChoiceEtudiant} className={`rounded-full px-4 py-1 font-bold hover:bg-c1 cursor-pointer ${isEtudiant ? "bg-c1" : "bg-c5"}`}>Etudiants</span>
                        </div>
                    </div>
                    <div className='m-3'>
                        {
                            // ajouter enseignant

                            isEnseignant && (
                                <div>
                                    <AddEnseignant />
                                </div>
                            )
                        }

                        {
                            // ajouter etudiant
                            isEtudiant && (
                                <div>
                                    <AddEtudiant />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='bg-c3 fixed left-0 top-0 bottom-0 w-[80px] px-2 py-2'>
                    <MenuAdmin page={"utilisateurs"} />
                </div>
            </div>
        </>
    )
}
