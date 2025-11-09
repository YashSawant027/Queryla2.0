import React from 'react'
import { 
    ThreeDScrollTriggerContainer, 
    ThreeDScrollTriggerRow 
  } from './lightswind/3d-scroll-trigger';
import sql from '../assets/database/mysql.png'
import mongodb from '../assets/database/mongodb.png'
import oracle from '../assets/database/oracle.png'
import postgre from '../assets/database/postgre.png'
import mariadb from '../assets/database/mariadb.png'

function Tools() {
  return (
    <div className=' py-5 h-auto w-[1220px] mx-auto mt-40 shadow-2xl p-40 rounded-[10px]'><ThreeDScrollTriggerContainer>

      <div className='w-[1120px] mx-auto mb-7'>
        <h1 className='text-[25px] '>Our SQL AI supports</h1>
        <h2 className='text-[35px] font-bold'>All Major SQL and NoSQL Databases <br/>for AI Query Generation</h2>
        <p>Generate SQL for any database. Our LLM system understands <br/>the specific syntax and features of each database system.</p>
      </div>

  <ThreeDScrollTriggerRow baseVelocity={5} direction={1} className='gap-10 overflow-hidden w-full bg-white h-[30vh] flex justify-center items-center'>
    <div className="px-4 py-2 shadow-lg text-white rounded-lg ml-24 ">
      <img src={sql} className='w-[100px] h-auto' />
    </div>
    <div className="px-4 py-2 shadow-lg text-white rounded-lg ml-24">
      <img src={mongodb} className='w-[100px] h-auto' />
    </div>
    <div className="px-4 py-2 shadow-lg text-white rounded-lg ml-24">
      <img src={postgre} className='w-[100px] h-auto' />
    </div>
    <div className="px-4 py-2 shadow-lg text-white rounded-lg ml-24">
      <img src={oracle} className='w-[100px] h-auto' />
    </div>
    <div className="px-4 py-2 shadow-lg text-white rounded-lg ml-24">
      <img src={mariadb} className='w-[100px] h-auto' />
    </div>
  </ThreeDScrollTriggerRow>
</ThreeDScrollTriggerContainer></div>
  )
}

export default Tools