import React from 'react'
import dp from '../assets/dp.jpg'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

function MessageArea() {
  const{selectedUser}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  return (
    <div className={`lg:w-[70%] ${selectedUser?"flex":"hidden"} lg:block h-full w-full bg-slate-400 border-l-2 border-gray-300`}>
      {selectedUser&&<div className='w-full h-25 bg-blue-400 rounded-b-15 shadow-gray-700 shadow-lg flex  items-center px-5 gap-4'>
    <div className='cursor-pointer'onClick={()=>dispatch(setSelectedUser(null))}>
       <IoMdArrowRoundBack className='h-5 w-5 text-white'/> 
       </div>
      <div className='w-10 h-10 overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer'>
        <img src={  selectedUser?.image||dp} alt="" className='h-full w-full object-cover'/>
        </div>
        <h1 className='text-white font-semibold text-7'>{selectedUser?.name||"User"}</h1>

      </div>}
      {!selectedUser&&
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='text-white font-bold text-[50px]'>Welcome To Chatify</h1>   
          </div> }
      
      
    </div>
  )
}

export default MessageArea
