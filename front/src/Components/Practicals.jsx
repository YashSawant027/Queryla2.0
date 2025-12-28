import React, { useContext } from 'react';
import ParticlesBackground from './lightswind/particles-background';
import quality from '../assets/no1.png'
import Nav from './Nav';
import Tools from './Tools';
import Tutorial from './Tutorial';
import Faqitems from './Faqitems';
import Review from './Review';
import Database from './Database';
import Footer from './Footer';
import { AuthContext } from './Authprovider';
import { Link, useNavigate } from 'react-router-dom';

function Practicals() {
  const {islogin, setislogin} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleclick = (e) => {
  const loginstate = islogin
    if (loginstate){
      navigate('/data')
    }
    else{
      navigate('/login')
    }
  }
  return (
    <>
      <Nav />
      <ParticlesBackground
        colors={['#00ffff', '#ff00ff', '#ffaa00']}
        size={4}
        countDesktop={80}
        countTablet={60}
        countMobile={40}
        zIndex={-100}
        height="100vh"
      >
        
      </ParticlesBackground>
      <div className='min-h-screen w-full m-auto flex justify-center items-center md:px-0 px-5'>
        <div>
          <img src={quality} alt="no1" className='w-[200px] text-center h-auto object-cover mx-auto mb-3'/>
          <h1 className='font-bold md:text-[45px]  text-[27px] text-center'>Welcome to Queryla <br/>Search smarter. Understand faster.</h1>
        <p className='text-center md:text-[17px] text-[16px] mt-2'>Queryla helps you run powerful searches, filter information, and visualize results<br/> without any complicated setup or coding experience.</p>
        <button onClick={handleclick} className='text-[15px] px-4 mx-auto block py-3 bg-black mt-5 cursor-pointer hover:bg-gray-900 transition rounded-[7px] text-white' >Try Now</button>
        </div>
      </div>
      <Tools/>
      <Tutorial/>
      <Faqitems />
      <Review/>
      <Footer/>
    </>
  )
}

export default Practicals;
