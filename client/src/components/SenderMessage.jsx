import React from 'react'
import dp from '../assets/dp.jpg'
function SenderMessage({image,message}) {
  return (
    <div className='w-fit max-w-125 bg-blue-400 px-5 py-1.25 text-white text-[20px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-700 shadow-lg gap-2.5 flex flex-col'>
        {image&&<img src={image} alt="" className='w-30 rounded-lg' />}
      {message&&<span>{message}</span>}
    </div>
  )
}

export default SenderMessage
