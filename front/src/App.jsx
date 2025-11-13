import { useState } from 'react'
import './App.css'
import React from 'react' 
import Nav from './Components/Nav'
import Practicals from './Components/Practicals'
import Tools from './Components/Tools'
import Tutorial from './Components/Tutorial'
import Faqitems from './Components/Faqitems'
import Footer from './Components/Footer'
import Review from './Components/Review'
import Databaseconfig from './Components/Databaseconfig'
import Login from './Components/Login'
import Register from './Components/Register'
import Contact from './Components/Contact'


function App() {

  return (
    <>
      <Nav />
      <Practicals/>
      <Tools/>
      <Tutorial/>
      <Faqitems />
      <Review/>
      <Footer/>
      <Databaseconfig/>
      {/* <Login/>
      <Register/> */}
      <Contact/>
    </>
  )
}

export default App
