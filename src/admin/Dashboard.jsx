import React, { useEffect, useState } from 'react'
import LogoutAdmin from '../composants/admin/Logout'
import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {

    const navigate = useNavigate();

    const keyExists = (key) => {
        return localStorage.getItem(key) !== null;
    };

    useEffect(() => {
        if (keyExists("userData")) {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (data.type === "enseignant") {
                navigate('/enseignant/');
            } else if (data.type === "etudiant") {
                navigate('/etudiant/');
            }
            else {
                if (data.type !== "admin") {
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
            <div className=''>

            </div>
            <div>


                <LogoutAdmin />
            </div>
        </>
    )
}
