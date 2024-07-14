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

    let data = JSON.parse(localStorage.getItem("userData")).data;

    return (
        <div className=''>
            <div className='fixed w-[250px] h-[100vh] bg-c3'>
                <LogoutEnseignant />
            </div>
            <div className='fixed h-[100vh] left-[250px] bottom-0 right-0 top-0'>
                <div className='fixed top-0 right-0 left-[250px] bg-c1 min-h-[40px] flex items-center flex-row-reverse pr-5'>
                    <span>

                    </span>
                    <span className='font-bold'>
                        {
                            data.firstName
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}
