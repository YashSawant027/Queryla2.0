import React from 'react'
import BeamGridBackground from "./lightswind/beam";
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import { Check } from "lucide-react";

function Tutorial() {
    return (
        <div className='mt-40 ax-w-[1120px] mx-auto '>
            <BeamGridBackground asBackground={false} showFade={true} gridSize={100}>
                <div className='h-screen flex  justify-around items-center md:mb-0 mb-40 mx-5  mt-40'>
                    <div className='flex md:flex-row flex-col md:gap-5 backdrop-blur-md md:items-start items-center shadow-lg'>
                        <img src={image1} alt="" className='md:w-[700px] w-[900px] h-auto' />
                        <div className='md:mt-5 mt-2 p-7'>
                            <h1 className='md:text-[35px] text-[20px] mb-3 font-bold'>Your personal SQL AI Assistant</h1>
                            <div className='flex gap-2'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Ask in plain English.</b> No need to write queries — just type your<br /> question, and our AI transforms it into accurate SQL instantly</p>
                            </div>
                            <div className='flex gap-2 mt-3'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>All-purpose intelligence.</b> Get answers for anything related to your <br/>database — from simple lookups to complex analytics.</p>
                            </div>
                            <div className='flex gap-2 mt-3'>
                                <Check size={15} className='mt-1.5 font-bold'></Check>
                                <p><b>Fast results.</b> Receive precise SQL and insights within seconds.<br /> No more waiting for analysts or struggling with complex query logic.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='h-screen flex justify-around items-start md:mb-0 mb-40 mx-10  mt-30'>
                    <div className='flex md:flex-row flex-col md:gap-5 backdrop-blur-md md:items-start items-center shadow-lg'>
                        
                        <div className='mt-5 p-7 order-2 md:order-1 h-auto'>
                            <h1 className='md:text-[35px] text-[20px] mb-3 font-bold'>Add your database schema</h1>
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
                        <img src={image2} alt="" className='md:w-[700px] w-[900px] h-auto order-1 md:order-2"' />   
                    </div>

                </div>
            </BeamGridBackground>
        </div>
    )
}

export default Tutorial