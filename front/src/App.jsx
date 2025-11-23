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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from 'lucide-react'


function App() {

  return (
    <>
      <BrowserRouter basename='/Queryla2.0'>
        <Routes>
          <Route path='/Queryla2.0' element={<Practicals/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
