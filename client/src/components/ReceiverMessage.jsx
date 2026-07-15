import React from 'react'
import dp from '../assets/dp.jpg'

function ReceiverMessage({image,message}) {
  return (
     <div className='w-fit max-w-125 bg-blue-300 px-5 py-1.25 text-white text-[20px] rounded-tl-none rounded-2xl relative left-0  shadow-gray-700 shadow-lg gap-2.5 flex flex-col'>
             {image&&<img src={image} alt="" className='w-30 rounded-lg' />}
                  {message&&<span>{message}</span>}
        </div>
  )
}

export default ReceiverMessage
