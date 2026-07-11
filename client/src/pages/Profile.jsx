import React, { useRef, useState } from 'react'
import dp from '../assets/dp.jpg'
import { FiCamera } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';


function Profile() {
    let{userData}=useSelector(state=>state.user)
   let dispatch = useDispatch()
    let navigate=useNavigate()
    let[name,setName]=useState(userData.name||"")
    let[frontendImage,setFrontendImage]=useState(userData.image||dp)
    let[backendimage,setbackendimage]=useState(null)
    let image = useRef()
    let[saving,setsaving]=useState(false)
    const handleimage=(e)=>{
      let file = e.target.files[0]
      setbackendimage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
    const handleprofile= async(e)=>{
      
        e.preventDefault()
        setsaving(true)
        try {
          let formData = new FormData()
          formData.append("name",name)
          if(backendimage){
            formData.append("image",backendimage)
          }
          let result = await axios.put(`${serverUrl}/api/user/profile`,formData,{
            withCredentials:true
          })
          setsaving(false)
          dispatch(setUserData(result.data))
        } catch (error) {
          console.log(error)
          setsaving(false)
        }
    }
  return (
    <div className='w-full h-screen bg-slate-300 flex flex-col items-center justify-center gap-5 '>
        <div className='fixed top-5 left-5'>
           <IoMdArrowRoundBack className='h-10 w-10 text-gray-700 cursor-pointer'onClick={()=>navigate("/")}/> 
        </div>
        <div className='w-52 h-52 bg-white rounded-full border-3 border-blue-400 shadow-gray-600 shadow-lg relative' onClick={()=>image.current.click()}>
            <div className='w-50 h-50 overflow-hidden rounded-full flex justify-center items-center '>
          <img src={frontendImage} alt="" className='h-full w-full object-cover'/>
          </div>
          <div className='absolute bottom-8 right-3  w-7.25 h-7.25 text-gray-400 rounded-full bg-blue-400 flex items-center justify-center'>
          <FiCamera className=' bottom-8  w-5 h-5 text-gray-400' />
          </div>
        </div>
        <form className='w-[95%]  max-w-125 flex flex-col gap-5 items-center justify-center' onSubmit={handleprofile}>
          <input type="file" accept='image/*' ref={image} hidden onChange={handleimage} />
         <input type="text" placeholder='Enter Your Name'className='w-[90%] h-12.5 outline-none border-2 border-blue-400 px-2 py-0.5 bg-white rounded-lg shadow-gray-500 shadow-lg
          text-gray-700 text-[19px]' onChange={(e)=>setName(e.target.value)} value={name}/>
         <input type="username" readOnly className='w-[90%] h-12.5 outline-none border-2 border-blue-400 px-2 py-0.5 bg-white rounded-lg shadow-gray-500 shadow-lg
          text-gray-400 text-[19px]' value={userData?.username} />
         <input type="email" readOnly className='w-[90%] h-12.5 outline-none border-2 border-blue-400 px-2 py-0.5 bg-white rounded-lg shadow-gray-500 shadow-lg
          text-gray-400 text-[19px]'value={userData?.email}/>
         <button className='bg-blue-400 w-40 h-15 rounded-lg items-center  shadow-gray-500 shadow-lg text-[20px] mt-2 font-bold hover:shadow-inner' disabled={saving}>{saving?"Saving...":"Save"}</button>
        </form>
      
    </div>
  )
}

export default Profile
