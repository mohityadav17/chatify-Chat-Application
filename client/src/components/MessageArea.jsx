import React, { useRef, useState , useEffect} from 'react'
import dp from '../assets/dp.jpg'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { BsEmojiSmileFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios'
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice';


function MessageArea() {
  const{selectedUser,userData,socket}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const[showPicker,setShowPicker]=useState(false)
  const[input,setInput]=useState("")
  const[frontImage,setFrontendImage]= useState("")
  const[backendImage,setBackendImage]=useState("")
  const image = useRef()
  
const messagesEndRef = useRef(null)
  let {messages} = useSelector(state=>state.message)
   const handleImage=(e)=>{
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSendMessage=async(e)=>{
    e.preventDefault()
     if(!input.trim() && !backendImage){
    return
  }
    try {
      let formData = new FormData()
      formData.append("message",input)
      if(backendImage){
        formData.append("image",backendImage)
      }

      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
      dispatch(setMessages([...messages,result.data]))
      setInput("")
      setBackendImage(null)
      setFrontendImage("")
    } catch (error) {
      console.log(error)
    }
  }
 
  const onEmojiClick=(emojidata)=>{
      setInput(prevInput=>prevInput+emojidata.emoji)
      setShowPicker(false)
  }
  
  useEffect(()=>{
     socket.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
     })
     return ()=>socket.off("newMessage")
  },[messages,setMessages])
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}
const messagesContainerRef = useRef(null)
useEffect(() => {
  scrollToBottom()
}, [messages])


  
  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:block h-full w-full bg-slate-400 border-l-2 border-gray-300`}>
      {selectedUser&&
      <div className='w-full h-full flex flex-col'>
      <div className='w-full h-25 bg-blue-400 rounded-b-15 shadow-gray-700 shadow-lg flex   items-center px-5 gap-4'>
    <div className='cursor-pointer'onClick={()=>dispatch(setSelectedUser(null))}>
       <IoMdArrowRoundBack className='h-5 w-5 text-white'/> 
       </div>
      <div className='w-10 h-10 overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer'>
        <img src={  selectedUser?.image||dp} alt="" className='h-full w-full object-cover'/>
        </div>
        <h1 className='text-white font-semibold text-7'>{selectedUser?.name||"User"}</h1>

      </div>
      <div ref={messagesContainerRef}
  onLoadCapture={scrollToBottom} className='w-full h-[70%] flex flex-col gap-3 py-8 px-5 pb-24 overflow-auto'>
        {showPicker&&  <div className='absolute bottom-30 left-5 z-50'><EmojiPicker width={250} height={350} className='shadow-lg' onEmojiClick={onEmojiClick} /></div>}
      {messages&&messages.map((mess)=>(
        mess.sender===userData._id?<SenderMessage image={mess.image} message={mess.message}/>:<ReceiverMessage image={mess.image} message={mess.message}/>
      ))}
      <div ref={messagesEndRef}/>
      </div>
      </div>}
      {!selectedUser&&
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='text-white font-bold text-[50px]'>Welcome To Chatify</h1>   
          </div>
           }
     {selectedUser && <div className='w-full lg:w-[70%] h-25 fixed bottom-5 flex items-center justify-center '>
       <img src={frontImage} alt="" className='w-20 absolute bottom-25 right-[20%] rounded-lg shadow-gray-700 shadow-lg ' />
       <form className='w-[90%] lg:w-[70%] h-16  bg-blue-400 rounded-full shadow-gray-700 shadow-lg flex items-center gap-5 px-5 'onSubmit={handleSendMessage}>
       
        <div onClick={()=>setShowPicker(prev=>!prev)}>
          <BsEmojiSmileFill className='h-6 w-6 text-white cursor-pointer' />
        </div>
        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
        <input type="text" className='w-full h-full px-2.5 outline-none border-0 text-5 text-white bg-transparent' placeholder='Message' onChange={(e)=>setInput(e.target.value)} value={input}/>
        <div onClick={()=>image.current.click()}><CiImageOn className='h-6 w-6 text-white cursor-pointer' /></div>
        <button><IoMdSend className='h-6 w-6 text-white cursor-pointer' /></button>
       </form>
     </div>}
      
    </div>
  )
}

export default MessageArea
