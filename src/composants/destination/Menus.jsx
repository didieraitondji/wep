import React, { useState } from 'react';

export default function Menus({ menu1 }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className=' font-poppins'>
                <div className=' w-[80%] mx-auto bg-c1'>
                    <nav className="flex items-center justify-between p-3">
                        <div className="flex items-baseline">
                            <img src="/images/logo_wep_dark.png" alt="Logo" className="w-[40px] h-[32px]" />
                        </div>
                        <ul className="hidden lg:flex space-x-10 font-bold">
                            <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black capitalize">WeP c’est quoi ?</a></li>
                            <li><a href="/#fonctions" className={`text-black hover:border-b-4 border-b-black capitalize`}>Nos Fonctionnalités</a></li>
                            <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black capitalize">à propos</a></li>
                            <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black">FAQ</a></li>
                        </ul>
                        <div className="block text-center lg:hidden">
                            <button onClick={toggleMenu} className="text-black block p-1 rounded-sm text-center bg-gray-400">
                                {!isOpen && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-justify" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                    </svg>
                                )}
                                {isOpen && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="block">
                            <img src="/images/logo_imsp.png" alt="Logo" className="w-[40px]" />
                        </div>
                    </nav>
                </div>
            </div>
            {isOpen && (<div className='bg-c1 slide-down lg:hidden'>
                <div className='bg-c1 w-[80%] mx-auto pt-3'>
                    <ul className="flex flex-col space-y-2 py-4 px-1 border-t-2 border-t-black w-[97%] mx-auto font-bold">
                        <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black capitalize">WeP c’est quoi ?</a></li>
                        <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black capitalize">Nos Fonctionnalités</a></li>
                        <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black capitalize">à propos</a></li>
                        <li><a href="#" className="text-black hover:border-b-4 hover:border-b-black">FAQ</a></li>
                    </ul>
                </div>
            </div>
            )}
        </>
    );
}
