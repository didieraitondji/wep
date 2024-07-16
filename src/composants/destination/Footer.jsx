import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className='h-[150px] bg-white'></div>
            <div className='min-h-[200px] w-[100%] bg-c3 font-poppins'>
                <div className='w-[80%] mx-auto'>

                    <div className='flex flex-row flex-wrap py-12'>
                        <div className='w-[100%] pb-10 border-b mb-10 lg:mb-0 lg:border-b-0 border-b-gray-600 lg:pb-0 lg:w-6/12 flex flex-col p-3'>
                            <div className='text-start'>
                                <img src="/images/logo_wep_white.png" alt="" className='w-[50px] h-[37px]' />
                                <form action="" className='pt-4'>
                                    <label htmlFor="rejoins-nous" className='text-white font-bold block p-2'>Rejoins-nous !</label>
                                    <input type="text" name='name' placeholder='nom et prénom *' className='w-[90%] px-4 py-2 rounded-full text-sm max-lg:w-[100%]' /><br /><br />
                                    <input type="text" name='email' placeholder='email *' className='w-[90%] px-4 py-2 rounded-full text-sm max-lg:w-[100%]' />
                                    <br /> <br />
                                    <input type="submit" value="Envoyer" className='w-[100px] bg-c1 px-4 py-2 rounded-full font-bold text-sm cursor-pointer hover:bg-gray-500 hover:text-white' />
                                </form>
                            </div>
                        </div>
                        <div className='max-md:w-[100%] pb-10 border-b mb-10 md:mb-0 md:border-b-0 border-b-gray-600 max-lg:w-[50%] lg:w-3/12 max-lg:px-4'>
                            <h3 className='text-c1 font-bold uppercase mt-3'>Liens rapides</h3>
                            <h6 className='px-2 pt-4 font-semibold'><a href="/#wep" className='text-white text-sm capitalize hover:text-c1'>WeP c'est quoi ?</a></h6>
                            <h6 className='px-2 pt-4 font-semibold'><a href="/#fonctions" className='text-white text-sm capitalize hover:text-c1'>Nos fonctionnalités</a></h6>
                            <h6 className='px-2 pt-4 hidden font-semibold'><a href="/#apropos" className='text-white text-sm capitalize hover:text-c1'>à propos</a></h6>
                            <h6 className='px-2 pt-4 font-semibold'><a href="/#faq" className='text-white text-sm capitalize hover:text-c1'>FAQ</a></h6>

                        </div>
                        <div className='max-lg:px-4 max-md:w-[100%] max-lg:w-[50%] lg:w-3/12'>
                            <h3 className='text-c1 font-bold uppercase mt-3'>adresse</h3>
                            <h6 className='px-2 pt-4 text-justify text-white mb-14 text-sm'>
                                <span>WeP est une plateforme de l'IMSP. Pour nous trouver, rendez-vous à l'IMSP, situé à Dangbo. </span>
                            </h6>
                            <h3 className='text-c1 font-bold uppercase mt-3'>contacts</h3>
                            <h6 className='px-2 pt-4 text-white flex'>
                                <span className='text-c1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                    </svg>
                                </span> &nbsp;&nbsp;&nbsp;
                                <span> secretariat@imsp-uac.org </span>
                            </h6>
                            <h6 className='px-2 pt-4 text-white flex'>
                                <span className='text-c1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                    </svg>
                                </span> &nbsp;&nbsp;&nbsp;
                                <span>+229 97 24 62 27</span>
                            </h6>

                            <h3 className='text-c1 font-bold mt-8'>WeP, les TPs autrement !</h3>
                        </div>

                    </div>

                    <div className='border-t-2 border-t-gray-600 text-center font-bold mt-4 text-white py-2'>
                        &copy; {currentYear} &middot; <span className='text-c1'>CED - Enterprise </span>
                    </div>
                </div>

            </div>
        </>
    )
}
