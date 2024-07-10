import React, { useState } from 'react'

export default function Fonctionnalites() {

    const [isEnd, setIsEnd] = useState(true);
    const [isfutur, setIsFutur] = useState(false);

    const toggleisFuture = () => {
        setIsFutur(true);
        setIsEnd(false);
    }

    const toggleisEnd = () => {
        setIsFutur(false);
        setIsEnd(true);
    }

    return (
        <>
            <div className='w-[100%] min-h-[400px] bg-c3 font-poppins'>
                <div className='h-[110px] bg-c3'></div>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold w-max mx-auto border-b-[20px] border-b-c1'>
                    <span className=' text-white'>Nos Fonctionnalités</span>
                </h1>
                <div className='h-[50px] bg-c3'></div>
                <div className='text-center'>

                    <span onClick={toggleisEnd} className={` font-bold ${!isEnd && 'bg-gray-600 text-white'} px-4 py-1 rounded-full cursor-pointer hover:bg-c1 hover:text-c3 mx-4 ${isEnd && 'bg-c1 text-c3'}`}> Disponibles </span>

                    <span onClick={toggleisFuture} className={`font-bold ${!isfutur && 'bg-gray-600 text-white'}  px-4 py-1 rounded-full cursor-pointer hover:bg-c1 hover:text-c3 mx-4 capitalize ${isfutur && 'bg-c1 text-c3'}`}> à venir </span>

                </div>
                <div className='w-[80%] mx-auto min-h-[100px] mt-10 flex max-lg:flex-col lg:flex-row lg:flex-wrap'>
                    {
                        // les fonctionnalité du présent !
                    }
                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isEnd && 'hidden'}`}>
                        <div className='w-[95%] px-4 py-6 mb-5 mx-auto border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour tous !</h1>
                            c
                        </div>
                    </div>
                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isEnd && 'hidden'}`}>
                        <div className='w-[95%] px-4 py-6 mb-5 mx-auto border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour les ensignants !</h1>
                        </div>
                    </div>

                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isEnd && 'hidden'}`}>
                        <div className='w-[95%] px-4 py-6 mb-5 mx-auto border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour les étudiants !</h1>
                        </div>
                    </div>

                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isEnd && 'hidden'}`}>
                        <div className='w-[95%] px-4 py-6 mb-5 mx-auto border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour les administratifs !</h1>
                        </div>
                    </div>

                    {
                        // les fonctionnalités du futur
                    }
                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isfutur && 'hidden'}`}>
                        <div className='w-[95%] mx-auto px-4 py-6 mb-5 border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour tous !</h1>
                        </div>
                    </div>
                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isfutur && 'hidden'}`}>
                        <div className='w-[95%] mx-auto px-4 py-6 mb-5 border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour les ensignants !</h1>
                        </div>
                    </div>
                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isfutur && 'hidden'}`}>
                        <div className='w-[95%] mx-auto px-4 py-6 mb-5 border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour les étudiants !</h1>
                        </div>
                    </div>
                    <div className={`w-[100%] lg:w-[50%] mb-1 ${!isfutur && 'hidden'}`}>
                        <div className='w-[95%] mx-auto px-4 py-6 mb-5 border border-c4 rounded-md text-justify'>
                            <h1 className='font-bold text-white mb-6'>Pour les administratifs !</h1>
                        </div>
                    </div>

                </div>
                <div className='h-[100px] bg-c3'></div>
            </div>
            <div className='h-[110px] bg-c2'></div>
            <div className='w-[80%] px-10 text-white mx-auto bg-c3 min-h-[100px] rounded-2xl flex flex-row items-center justify-center font-poppins py-5 max-md:flex-wrap'>
                <div className='max-md:text-center max-md:mb-5'>
                    Envis d'avoir une fonctionnalité spécifique sur <span className='font-bold px-2 text-c1'> WeP </span> ?
                </div>

                <a href='' className='w-[200px] md:mx-5 px-5 bg-c2 text-c3 font-bold py-3 rounded-full hover:px-6 cursor-pointer hover:bg-c1 max-md:block max-md:w-max max-md:mx-auto text-sm text-center'>
                    Suggérez nous !
                </a>
            </div>
        </>

    )
}
