import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutEtudiant from '../composants/etudiant/Logout';

export default function DashboardEtudiant() {
    const navigate = useNavigate();

    const keyExists = (key) => {
        return localStorage.getItem(key) !== null;
    };

    useEffect(() => {
        if (keyExists("userData")) {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (data.type === "enseignant") {
                navigate('/enseignant/');
            } else if (data.type === "admin") {
                navigate('/admin/');
            }
            else {
                if (data.type !== "etudiant") {
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
            bonjour

            <LogoutEtudiant />
        </div>
    )
}
