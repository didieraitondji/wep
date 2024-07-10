import React from 'react'
import Menus from './composants/destination/Menus'
import Barniere from './composants/destination/Barniere'
import Footer from './composants/destination/Footer'
import Wep from './composants/destination/Wep'
import Objectifs from './composants/destination/Objectifs'
import Fonctionnalites from './composants/destination/Fonctionnalites'

export default function Destination() {
  return (
    <>
      <header className=' fixed top-0 left-0 right-0 z-50'>
        <Menus />
      </header>
      <div className='h-[55px] bg-c1'></div>
      <div className='overflow-auto z-0 corps'>
        <Barniere />
        <Wep />
        <Objectifs />
        <Fonctionnalites />
        <Footer />
      </div>
    </>
  )
}
