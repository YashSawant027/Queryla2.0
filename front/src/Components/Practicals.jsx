import React from 'react';
import ParticlesBackground from './lightswind/particles-background';
import quality from '../assets/no1.png'

function Practicals() {
  return (
    <>
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
          <h1 className='font-bold md:text-[45px]  text-[27px] text-center'>Convert Text to SQL with <br/>AI in seconds</h1>
        <p className='text-center text-[16px] mt-2'>Transform Natural Language into Powerful Database Queries. <br/>Our AI-powered tool converts your plain English instructions into precise SQL and NoSQL queries.</p>
        <button className='text-[15px] px-4 mx-auto block py-3 bg-black mt-5 cursor-pointer hover:bg-gray-900 transition rounded-[7px] text-white'>Try now</button>
        </div>
      </div>
    </>
  )
}

export default Practicals;
