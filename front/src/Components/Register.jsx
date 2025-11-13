import React from 'react'
import Nav from './Nav'
function Register() {
  return (
    <>
        <Nav/>
    
    <div className='w-full h-screen flex justify-center items-center'>
        
        <div className='w-sm p-5 rounded-[10px] shadow-2xl -100'>
            <h1 className='text-center font-bold text-[35px]'>Register</h1>
            <p className='text-center'>Enter your details below</p>
            <div className='mt-4'>
                <form>
                    
                        <div>
                            <label className='block'>Name</label>
                            <input type="text" id='name'  className='border-1 mt-2  border-gray-300 rounded-[7px] w-full h-[40px] px-2' placeholder='alex'/>
                        </div>

                        <div>
                            <label className='block'>Email</label>
                            <input type="email" id='name'  className='border-1 mt-2  border-gray-300 rounded-[7px] w-full h-[40px] px-2' placeholder='alex@gmail.com'/>
                        </div>
                    
                    
                        <div className='mt-3 mb-4'>
                            <label className='block'>Password  </label>
                            <input type="password" id='name'  className='border-1 mt-2 border-gray-300 rounded-[7px] w-full h-[40px] px-2'/>
                        </div>
                    
                        <div className='flex justify-center items-center'>
                            <button className='bg-black block mx-auto w-full text-white px-3 py-2 rounded-[5px] hover:bg-gray-900 cursor-pointer'>Register</button>
                        </div>
                        <p className='mt-3 text-center'>Already have a account ? <a href="" className='text-blue-800'><u>Login</u></a></p>
                </form>
            </div>
        </div>
    </div></>
  )
}

export default Register