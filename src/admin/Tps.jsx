import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../composants/admin/Menu';
import TopBarAdmin from '../composants/admin/TopBar';
import ListeTPsAdmin from '../composants/admin/ListeTPs';

export default function TpsAdmin() {

    document.getElementsByTagName("title")[0].innerHTML = "TPs | Admin WeP";

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
                    <TopBarAdmin text={"Travaux Pratiques"} prenom={userData.firstName} />
                </div>
                <div className='fixed top-[54px] left-[80px] bottom-0 right-0 overflow-auto px-5 py-6'>
                    <ListeTPsAdmin />
                </div>
                <div className='bg-c3 fixed left-0 top-0 bottom-0 w-[80px] px-2 py-2'>
                    <MenuAdmin page={"tps"} />
                </div>
            </div>
        </>
    )
}
