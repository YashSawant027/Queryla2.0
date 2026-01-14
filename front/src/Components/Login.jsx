import React, { useContext, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import  { AuthContext } from './Authprovider'
import { Link } from 'react-router-dom'
function Login() {

    const [username, setusername] = useState()
    const [password, setpassword] = useState()
    const [error, seterror] = useState({})
    const [loading, setloading] = useState()
    const {islogin, setislogin} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const userdata = {
        'username': username,
        'password': password
    }

        try{
            setloading(true)
            const response = await axios.post('https://queryla2-0-1.onrender.com/api/v1/LoginPage', userdata)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            console.log("Login successfull")
            setislogin(true)
            navigate('/')
            seterror({})
        }
        catch(error){
            seterror(error.response.data)
            console.log("Login error=>",error.response.data)
        }
        finally{
            setloading(false)
        }
    
    }
    

  return (
    <>
        <Nav/>
    
    <div className='w-full h-screen flex justify-center items-center'>
        
        <div className='w-sm p-5 rounded-[10px] shadow-2xl -100'>
            <h1 className='text-center font-bold text-[35px]'>Login</h1>
            <p className='text-center'>Enter your credentials below</p>
            <div className='mt-4'>
                <form onSubmit={handleLogin}>
                    
                        <div>
                            <label className='block'>Name</label>
                            <input type="text" id='name' onChange={(e)=>setusername(e.target.value)}  className='border-1 mt-2  border-gray-300 rounded-[7px] w-full h-[40px] px-2' placeholder='alex'/>
                            {error.username && (<p className="text-red-600 text-sm">{error.username}</p>)}
                        </div>
                    
                    
                        <div className='mt-3 mb-4'>
                            <label className='block'>Password  </label>
                            <input type="password" id='password' onChange={(e)=>setpassword(e.target.value)}  className='border-1 mt-2 border-gray-300 rounded-[7px] w-full h-[40px] px-2'/>
                            {error.Password && (<p className="text-red-600 text-sm">{error.Password}</p>)}
                        </div>
                    
                        <div className='flex justify-center items-center'>
                            {loading ? (<button className='bg-black block mx-auto w-full text-white px-3 py-2 rounded-[5px] hover:bg-gray-900 cursor-pointer'>Please wait ...</button>) : (<button className='bg-black block mx-auto w-full text-white px-3 py-2 rounded-[5px] hover:bg-gray-900 cursor-pointer'>Login</button>)}
                            
                        </div>
                        <p className='mt-3 text-center'>Don't have a account ? <u><Link to='/register' className='text-blue-800'>Register</Link></u></p>
                </form>
            </div>
        </div>
    </div></>
  )
}

export default Login