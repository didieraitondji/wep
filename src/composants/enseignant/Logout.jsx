import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogoutEnseignant() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("userData");
        navigate("/enseignant-connexion/");
    }

    return (
        <div>
            <span onClick={handleLogOut} className=' cursor-pointer'> Se déconnecter </span>
        </div>
    )
}
