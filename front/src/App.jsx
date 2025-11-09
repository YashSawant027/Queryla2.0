import { useState } from 'react'
import './App.css'
import React from 'react' 
import Nav from './Components/Nav'
import Practicals from './Components/Practicals'
import Tools from './Components/Tools'
import Tutorial from './Components/Tutorial'
import Reviews from './Components/Reviews'


function App() {

  return (
    <>
      <Nav />
      <Practicals/>
      <Tools/>
      <Tutorial/>
      <Reviews />
    </>
  )
}

export default App
