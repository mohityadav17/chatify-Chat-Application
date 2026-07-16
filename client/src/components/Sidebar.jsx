import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.jpg'
import { MdOutlineSearch } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import { serverUrl } from '../main';
import { setOtherUsers, setSelectedUser, setUserData,onlineUsers } from '../redux/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

function Sidebar() {
    const {userData,otherUsers,selectedUser}=useSelector(state=>state.user)
    const[search,setsearch]=useState(false)
    let dispatch = useDispatch()
    const navigate= useNavigate()
    const handlelogout = async()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className={`lg:w-[30%] w-full h-full lg:block ${!selectedUser?"block":"hidden"} bg-slate-200`}>
        <div className='w-15 h-15 overflow-hidden rounded-full flex justify-center items-center bg-blue-400 shadow-gray-500 shadow-lg mt-2.5 cursor-pointer  bottom-4 fixed' onClick={handlelogout}>
            <IoMdLogOut className='w-6 h-6' />
         </div>
      <div className='w-full h-60 bg-blue-400 rounded-b-[30%] shadow-gray-700 shadow-lg flex flex-col justify-center px-5'>
        
         <h1 className='text-white font-bold text-7'>
            Chatify
         </h1>
         <div className='w-full flex justify-between items-center'>
            <h1 className='text-gray-800 font-semibold text-7'>Hii,{userData.name||"user"}</h1>
             <div className='w-16 h-16 overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer' onClick={()=>navigate("/profile")}>
          <img src={userData.image||dp} alt="" className='h-full w-full object-cover'/>
          </div>
         
        </div>
        <div className='w-full flex items-center gap-5'>
            {!search&&  <div className='w-15 h-15 overflow-hidden rounded-full flex justify-center items-center bg-white shadow-gray-500 shadow-lg mt-2.5 cursor-pointer ' onClick={()=>setsearch(true)}>
            <MdOutlineSearch className='w-6 h-6'/>
          
          </div>}
          {search&& 
          <form className='w-full h-16  bg-white shadow-gray-500 shadow-lg flex items-center gap-2.2 mt-2.5 rounded-full overflow-hidden px-5'>
            <MdOutlineSearch className='w-6 h-6'/>
            <input type="text" placeholder='Search Users ...' className='w-full h-full p-2.5 outline-0 border-0 text-4'/>
            <RxCross1 className='w-6 h-6 cursor-pointer' onClick={()=>setsearch(false)} />
          </form>
          }
        
    {!search&&otherUsers?.map((user)=>(
            <div className='w-16 h-16 overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg mt-2.5'>
          <img src={user.image||dp} alt="" className='h-full w-full object-cover'/>
          </div>
          ))}
  
          
          
       
      </div>

        </div >
        <div className='w-full h-[60vh] overflow-auto flex flex-col gap-5 items-center mt-5'>
          {otherUsers?.map((user)=>(
            <div className='w-[95%] h-17 flex justify-start items-center gap-5 shadow-gray-500 shadow-lg rounded-full bg-blue-200 hover:bg-blue-500 cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
            <div className='w-16 h-16 overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 bg-white shadow-lg '>
          <img src={user.image||dp} alt="" className='h-full w-full object-cover'/>
          </div>
          <h1 className='text-gray-800 font-semibold text-7'>{user.name||user.username}</h1>
          </div>
          ))}
        </div>
      </div>
     
  )
}

export default Sidebar
