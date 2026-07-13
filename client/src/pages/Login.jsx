import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
  const [show,setshow] = useState(false)
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[loading,setloading]=useState("")
  const[err,seterr]=useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  
  const handlelogin=async(e)=>{
    e.preventDefault()
    setloading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,password
      },{withCredentials:true})
      dispatch(setUserData(result.data));
      navigate("/")
      setemail("")
      setpassword("")
      setloading(false)
      seterr("")
      
    } catch (error) {
      // console.log(error.response);
      console.log(error);
      
      setloading(false)
      seterr(error.response.data.message)
      
    }
  }
  
  return (
    <div className= 'w-full min-h-screen bg-slate-300 flex items-center justify-center'>
      <div className='w-full max-w-125 h-150 bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-10 '>
        <div className='w-full h-50 bg-blue-400 rounded-b-[30%] shadow-gray-700 shadow-lg flex items-center justify-center  '>
          <h1 className='text-white font-bold text-[30px]'>
            Welcome To <span className='text-black'>Chatify</span>
          </h1>

        </div>
         <form className='w-full flex flex-col gap-5 items-center' autoComplete='off' onSubmit={handlelogin}>
         
          <input type="email" placeholder='Email' autoComplete='off'
          readOnly onFocus={(e)=>e.target.removeAttribute('readonly')} className='w-[90%] h-12.5 outline-none border-2 border-blue-400 px-1 py-0.5 bg-white rounded-lg shadow-gray-500 shadow-lg
          text-gray-700 text-[19px] ' autoComplete='off' onChange={(e)=>setemail(e.target.value)} value={email}/>
          <div className='w-[90%] h-12.5 border-2 border-blue-400 overflow-hidden rounded-lg  shadow-gray-500 shadow-lg relative'>
            <input type={`${show?"text":"password"}`} placeholder='Password' className='w-full  h-full outline-none   px-1 py-0.5 bg-white
          text-gray-700 text-[19px]' onChange={(e)=>setpassword(e.target.value)} value={password}/>
          <span className='absolute top-2.5 right-2.5 text-2 text-blue-400 font-semibold cursor-pointer'onClick={()=>setshow(prev=>!prev)}>{`${show?"Hidden":"show"}`}</span>

          </div>
          {err&& <p className='text-red-500'>{"*"+err}</p> }

          <button className='bg-blue-400 w-40 h-15 rounded-lg items-center  shadow-gray-500 shadow-lg text-[20px] mt-2 font-bold hover:shadow-inner' disabled={loading}>{loading?"Loading..":"Login"}</button>
          <p className='cursor-pointer' onClick={()=>navigate("/signup")}>Want To Create New Account ? <span className='text-blue-400 font-bold'>SignUp</span> </p>
      </form>

      </div>
     
      
     </div>
  )
}

export default Login
