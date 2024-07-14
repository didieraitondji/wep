import React, { useEffect, useState } from 'react'
import LogoutEnseignant from '../composants/enseignant/Logout'
import { useNavigate } from 'react-router-dom';

export default function DashboardEnseignant() {
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
        <div>
            Enseignant

            <LogoutEnseignant />
        </div>
    )
}
