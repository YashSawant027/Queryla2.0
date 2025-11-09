import React from 'react'
import BeamGridBackground from "./lightswind/beam";
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import { Check } from "lucide-react";

function Tutorial() {
    return (
        <div className='mt-40 w-[1220px] mx-auto '>
            <BeamGridBackground asBackground={false} showFade={true} gridSize={100}>
                <div className='h-screen flex  justify-around items-center md:mb-0 mb-40'>
                    <div className='flex md:flex-row flex-col md:gap-5 backdrop-blur-md md:items-start items-center shadow-lg'>
                        <img src={image1} alt="" className='md:w-[600px] w-[900px] h-auto' />
                        <div className='md:mt-5 mt-2 p-7'>
                            <h1 className='text-[35px] mb-3 font-bold'>Your personal SQL AI Assistant</h1>
                            <div className='flex gap-2'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Plan English questions.</b> allows you to ask question in plain english<br /> no coding required</p>
                            </div>
                            <div className='flex gap-2 mt-3'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>All Purspose.</b> Answer questions for everything related to SQL</p>
                            </div>
                            <div className='flex gap-2 mt-3'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Fast results.</b> Get an accurate response within seconds. No need to<br /> wait for data analytics or waste hours on complex queries</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='h-screen flex justify-around items-start'>
                    <div className='flex md:flex-row flex-col md:gap-5 backdrop-blur-md md:items-start items-center shadow-lg'>
                        
                        <div className='mt-5 p-7'>
                            <h1 className='text-[35px] mb-3 font-bold'>Add your database schema</h1>
                            <div className='flex gap-4'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Accurate Queries.</b> by including your database tables, <br /> columns, and relationship, our AI can craft precise SQL <br/>queries that perfectly match your data</p>
                            </div>
                            <div className='flex gap-2 mt-3'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Optimized SQL code.</b> with our schemas feature, the AI<br/> produces queries optimized for specific database design</p>
                            </div>
                            <div className='flex gap-2 mt-3'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Fast results.</b> Get an accurate response within seconds. <br />No need to wait for data analytics or waste hours on <br />complex queries</p>
                            </div>
                        </div>
                        <img src={image2} alt="" className='md:w-[600px] w-[800px] h-auto' />
                    </div>

                </div>
            </BeamGridBackground>
        </div>
    )
}

export default Tutorial