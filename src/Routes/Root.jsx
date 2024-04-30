import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
   
    <Navbar/>
    <div className='min-vh-100'>
    <Outlet/>
    </div>
    <Footer/>
   
    </>
  )
}

export default Root