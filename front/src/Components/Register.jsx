import React, { useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Register() {

    const [username, setusername] = useState()
    const [password, setpassword] = useState()
    const [email, setemail] = useState()
    const [error, seterror] = useState({})
    const [loading, setloading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const userdata = {
            username, email, password
        }

        try{
            setloading(true)
            const response = await axios.post('http://0.0.0.0:8000/api/v1/RegisterPage', userdata)
            console.log("Registration successfull")
            seterror({})
            navigate('/login')

        }
        catch (error){
            if (error.response && error.response.data) {
            seterror(error.response.data); 
            console.log(error.response.data)
        }
        }
        finally{
            setloading(false)
        }
    }

    return (
        <>
            <Nav />

            <div className='w-full h-screen flex justify-center items-center'>

                <div className='w-sm p-5 rounded-[10px] shadow-2xl -100'>
                    <h1 className='text-center font-bold text-[35px]'>Register</h1>
                    <p className='text-center'>Enter your details below</p>
                    <div className='mt-4'>
                        <form onSubmit={handleSubmit}>

                            <div className='h-auto'>
                                <label className='block'>Name</label>
                                <input type="text"
                                    id='name'
                                    onChange={(e) => setusername(e.target.value)}
                                    className='border-1 mt-2  border-gray-300 rounded-[7px] w-full h-[40px] px-2'
                                    placeholder='alex' />
                                    {error.username && (<p className="text-red-600 text-sm">{error.username}</p>)}
                            </div>

                            <div>
                                <label className='block'>Email</label>
                                <input type="email"
                                    onChange={(e) => setemail(e.target.value)}
                                    id='email' className='border-1 mt-2  border-gray-300 rounded-[7px] w-full h-[40px] px-2'
                                    placeholder='alex@gmail.com' />
                                    {error.email && (<p className="text-red-600 text-sm">{error.email}</p>)}
                            </div>


                            <div className='mt-3 mb-4'>
                                <label className='block'>Password  </label>
                                <input type="password"
                                    onChange={(e) => setpassword(e.target.value)}
                                    id='password'
                                    className='border-1 mt-2 border-gray-300 rounded-[7px] w-full h-[40px] px-2' />
                            </div>

                            <div className='flex justify-center items-center'>
                                {loading ? (<button className='bg-black block mx-auto w-full text-white px-3 py-2 rounded-[5px] hover:bg-gray-900 cursor-pointer'>Please wait ...</button>) : (<button className='bg-black block mx-auto w-full text-white px-3 py-2 rounded-[5px] hover:bg-gray-900 cursor-pointer'>Register</button>)}
                                
                            </div>
                            <p className='mt-3 text-center'>Already have a account ? <u><Link to='/login' className='text-blue-800'>Login</Link></u></p>
                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default Register