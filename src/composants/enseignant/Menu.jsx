import React from 'react'
import LogoutEnseignant from './Logout'

export default function MenuEnseignant({ page }) {
    return (
        <>
            <div className='flex flex-col items-center justify-center pb-3 border-b border-b-c1'>
                <img src="/images/favicop_wep.png" alt="" className='w-[50%]' />
            </div>
            <div className='w-[100%] pt-[30px] pb-[40px] flex flex-col space-y-6 h-[100%] overflow-auto'>
                <a href='/enseignant/dashboard/' className={`flex flex-col items-center justify-center text-c1 cursor-pointer pt-2 px-2 rounded-md hover:bg-gray-500 my-2 ${page == "accueil" ? "bg-gray-500" : "bg-gray-700"}`} title='Tableau de bord'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                        <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                        <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0" />
                    </svg>
                    <span className='text-[0.7em] py-2 font-bold'>
                        Accueil
                    </span>
                </a>
                <a href='/enseignant/tps/' className={`flex flex-col items-center justify-center text-c1 cursor-pointer pt-2 px-2 rounded-md hover:bg-gray-500 my-2 ${page == "tps" ? "bg-gray-500" : "bg-gray-700"}`} title='Voir les TPs'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-ppt-fill" viewBox="0 0 16 16">
                        <path d="M8.188 8.5H7V5h1.188a1.75 1.75 0 1 1 0 3.5" />
                        <path d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m3 4a1 1 0 0 0-1 1v6.5a.5.5 0 0 0 1 0v-2h1.188a2.75 2.75 0 0 0 0-5.5z" />
                    </svg>
                    <span className='text-[0.7em] py-2 font-bold'>
                        TPs
                    </span>
                </a>
                <a href='/enseignant/travaux/' className={`flex flex-col items-center justify-center text-c1 cursor-pointer pt-2 px-2 rounded-md hover:bg-gray-500 my-2 ${page == "travaux" ? "bg-gray-500" : "bg-gray-700"}`} title='Voir les soumissions'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-easel-fill" viewBox="0 0 16 16">
                        <path d="M5 6.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z" />
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8.5 5h2A1.5 1.5 0 0 1 12 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-.473l.447 1.342a.5.5 0 0 1-.948.316L8.973 10H8.5v1a.5.5 0 0 1-1 0v-1h-.473l-.553 1.658a.5.5 0 1 1-.948-.316L5.973 10H5.5A1.5 1.5 0 0 1 4 8.5v-2A1.5 1.5 0 0 1 5.5 5h2a.5.5 0 0 1 1 0" />
                    </svg>
                    <span className='text-[0.7em] py-2 font-bold'>
                        Travaux
                    </span>
                </a>
                <a href='/enseignant/profil/' className={`flex flex-col items-center justify-center text-c1 cursor-pointer pt-2 px-2 rounded-md hover:bg-gray-500 my-2 ${page == "profil" ? "bg-gray-500" : "bg-gray-700"}`} title='Gérer Profil'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                    </svg>
                    <span className='text-[0.7em] py-2 font-bold'>
                        Profil
                    </span>
                </a>
                <LogoutEnseignant />
            </div>
        </>
    )
}
