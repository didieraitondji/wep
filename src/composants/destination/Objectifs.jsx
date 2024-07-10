import React from 'react'

export default function Objectifs() {
    return (
        <>
            <div className='w-[80%] mx-auto z-0'>
                <div className='h-[100px] bg-white'></div>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold w-max mx-auto border-b-[20px] border-b-c1'>
                    <span className='slide-down1'>Objectifs de WeP</span>
                </h1>
                <div className='h-[80px] bg-white'></div>
                <div className='flex flex-row font-poppins max-lg:flex-wrap'>
                    <div className='px-5 py-4 border border-c1 w-1/4 max-lg:w-2/4 max-sm:w-[100%]'>
                        <div className='text-start'>
                            <span className='w-[70px] h-[70px] flex flex-col items-center justify-center rounded-sm bg-c3 text-c1 font-bold '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </span>
                            <br />
                            <span className='block leading-7 text-justify'>
                                Améliorer la traçabilité des travaux pratiques en fournissant un enregistrement électronique de toutes les soumissions et corrections. Cela permet de disposer de preuves en cas de litige entre étudiants et enseignants.
                            </span>
                        </div>
                    </div>
                    <div className='px-5 py-4 border border-c1 w-1/4 max-lg:w-2/4 max-sm:w-[100%]'>
                        <div className='text-start'>
                            <span className='w-[70px] h-[70px] flex flex-col items-center justify-center rounded-sm bg-c3 text-c1 font-bold'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-database-fill-down" viewBox="0 0 16 16">
                                    <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1" />
                                    <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905" />
                                </svg>
                            </span>
                            <br />
                            <span className='block leading-7 text-justify'>
                                Simplifier la gestion des travaux pratiques pour les enseignants en centralisant la publication, la soumission et la correction des travaux dans une seule interface.
                            </span>
                        </div>
                    </div>
                    <div className='px-5 py-4 border border-c1 w-1/4 max-lg:w-2/4 max-sm:w-[100%]'>
                        <div className='text-start'>
                            <span className='w-[70px] h-[70px] flex flex-col items-center justify-center rounded-sm bg-c3 text-c1 font-bold'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-journal-code" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708m-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                                </svg>
                            </span>
                            <br />
                            <span className='block leading-7 text-justify'>
                                Accès facile aux travaux pratiques par les étudiants, soumission des TPs en ligne et consultations des notes et commentaires, ce qui améliore l'expérience d'apprentissage chez l'étudiant.
                            </span>
                        </div>
                    </div>
                    <div className='px-5 py-4 border border-c1 w-1/4 max-lg:w-2/4 max-sm:w-[100%]'>
                        <div className='text-start'>
                            <span className='w-[70px] h-[70px] flex flex-col items-center justify-center rounded-sm bg-c3 text-c1 font-bold'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                </svg>
                            </span>
                            <br />
                            <span className='block leading-7 text-justify'>
                                Renforcer la Communication entre Étudiants et Enseignants permettant aux étudiants et aux enseignants de discuter des travaux pratiques, de poser des questions et de recevoir des clarifications.
                            </span>
                        </div>
                    </div>
                </div>
                <div className='h-[170px] bg-white'></div>
            </div>

        </>
    )
}
