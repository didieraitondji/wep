import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogoutAdmin() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("userData");
        navigate("/admin-connexion/");
    }

    return (
        <div>
            <span onClick={handleLogOut} className=' cursor-pointer'> Se déconnecter </span>
        </div>
    )
}
