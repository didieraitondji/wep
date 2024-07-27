import React, { useEffect, useState } from 'react'
import { calculateDifferenceInDays } from './Fonctions';

export default function TpModel({ index, title, description, pubdate, senddate, filiere, ecue, file, enseignant }) {

    let dateobj = new Date();
    let jour = dateobj.getDate();
    let mois = dateobj.getMonth();
    let annee = dateobj.getFullYear();

    let today = `${annee}-${mois + 1}-${jour}`;

    let senddateObj = new Date(senddate);
    let onGoing = calculateDifferenceInDays(today, senddateObj);

    return (
        <>
            <div className='border border-c1 bg-c5 rounded-2xl shadow-xl mb-6'>
                <div className='bg-c1 w-max px-3 py-2 rounded-tl-2xl rounded-r-2xl'>
                    <span className='font-bold'>
                        TP
                    </span>
                    <span className='px-2'>
                        &middot;
                    </span>
                    <span className='pr-4'>
                        {index}
                    </span>
                </div>
                <div className='w-full bg-c3 text-white p-2 font-bold'>
                    {title}
                </div>
                <div className='flex flex-row flex-wrap w-full p-4'>
                    <div className='w-full lg:w-1/2 bg-c4 min-h-[220px] rounded-2xl p-3 text-justify'>
                        <div className='font-bold pb-2'>
                            Description
                        </div>
                        <div className='px-3'>
                            {description}
                            {onGoing}
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 min-h-[220px] rounded-2xl p-3 px-5'>
                        <div className='flex flex-row items-center justify-center'>
                            <div className='p-2 w-1/2 flex items-center'>
                                <span className='capitalize pr-2'>Publier le : </span> <span className='bg-c4 w-1/2 pl-2 py-1 rounded-full'>{pubdate}</span>
                            </div>
                            <div className='p-2 w-1/2 flex items-center justify-center'>
                                <span className='capitalize pr-2'>à rendre le : </span> <span className='bg-c4 w-1/2 pl-2 py-1 rounded-full'>{senddate}</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center mt-7'>
                            <div className='p-2 w-1/2 flex items-center justify-center'>
                                <span className='capitalize pr-2'>Filière : </span> <span className='bg-c4 w-1/2 pl-2 py-1 rounded-full'>{filiere}</span>
                            </div>
                            <div className='p-2 w-1/2 flex items-center justify-center'>
                                <span className='capitalize pr-2'>ECUE : </span> <span className='bg-c4 w-1/2 pl-2 py-1 rounded-full'>{ecue}</span>
                            </div>
                        </div>

                        {
                            file != null ? (
                                <div className='flex flex-row items-center mt-7 bg-c4 rounded-full'>

                                    <div className='p-2 w-1/2 flex items-center justify-center'>
                                        01 fichier associé
                                    </div>
                                    <div className='p-2 w-1/2 flex items-center justify-center'>
                                        <a href={`${file}`} download target='_blank' className='bg-c1 px-3 py-1 rounded-full hover:font-bold'>Télécharger ici !</a>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-row items-center mt-7 bg-c4 rounded-full'>

                                    <div className='p-2 w-full flex items-center justify-center text-red-600'>
                                        <span className='pr-6'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                            </svg>
                                        </span>
                                        <span>
                                            Aucun fichier associé !
                                        </span>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                </div>
                <div className='p-2 w-full bg-c1 rounded-b-2xl flex flex-row flex-wrap items-center'>
                    <div className='w-full md:w-1/2 flex flex-row px-3 items-center'>
                        Prof : <span className='px-3 font-bold'>{enseignant}</span>
                    </div>
                    <div className='w-full md:w-1/2 flex flex-row-reverse items-center'>
                        {
                            onGoing < 0 && (
                                <span className='pr-10 flex items-center'>
                                    <span className='pr-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                        </svg>
                                    </span>
                                    <span>
                                        Terminé
                                    </span>
                                </span>
                            )
                        }
                        {
                            onGoing > 0 && (
                                <span className='pr-10 flex items-center'>
                                    <span className='pr-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush-fill" viewBox="0 0 16 16">
                                            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04" />
                                        </svg>
                                    </span>
                                    <span>
                                        En cours
                                    </span>
                                </span>
                            )
                        }
                        {
                            onGoing == 0 && (
                                <span className='pr-10 flex items-center'>
                                    <span className='pr-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-minus" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5" />
                                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                        </svg>
                                    </span>
                                    <span>
                                        Termine Aujourd'hui
                                    </span>
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
