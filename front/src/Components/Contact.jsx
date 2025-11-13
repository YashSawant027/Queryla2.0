import React from 'react'
import {Building2, Phone, Eclipse, Mail} from 'lucide-react'
import Nav from './Nav'
function Contact() {
  return (
    <>
        <Nav/>
    
    <div className='w-full h-auto'>
    <div className='md:max-w-xl mx-auto  flex justify-center items-center h-screen'>
        
            <div className='shadow-xl w-full flex justify-center items-center p-6'>
           <div>
             <h1 className='text-center text-[30px] font-medium'>Contact Information</h1>
            <div className='mt-4'>
                <div className='shadow-lg p-3 rounded-[10px] mb-4'>
                    
                <div className='flex gap-3  items-center'>
                    <Building2 size={35} className='bg-gray-300 p-2 rounded-[50%]'/><p className='font-medium'>YashUno</p>
                </div>
                <p className='ml-12 text-gray-500'>Innovative Solutions Inc.</p>
                </div>

                <div className='shadow-lg p-3 rounded-[10px] mb-4'>
                    
                <div className='flex gap-3  items-center'>
                    <Phone size={35} className='bg-gray-300 p-2 rounded-[50%]'/><p className='font-medium'>Phone</p>
                </div>
                <p className='ml-12 text-gray-500'>+91 9082258820</p>
                </div>

                <div className='shadow-lg p-3 rounded-[10px] mb-4'>
                    
                <div className='flex gap-3  items-center'>
                    <Mail size={35} className='bg-gray-300 p-2 rounded-[50%]'/><p className='font-medium'>Email</p>
                </div>
                <p className='ml-12 text-gray-500'>yashsawan70@gmail.com</p>
                </div>

                <div className='shadow-lg p-3 rounded-[10px] mb-4'>
                    
                <div className='flex gap-3  items-center'>
                    <Eclipse size={35} className='bg-gray-300 p-2 rounded-[50%]'/><p className='font-medium'>Website</p>
                </div>
                <p className='ml-12 text-gray-500'>https://Yash-Portfolio/</p>
                </div>
            </div>
           </div>
        </div>
        </div>
        </div>
    </>
  )
}

export default Contact