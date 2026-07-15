import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import getMessage from '../customhooks/getMessages'

function Home() {
  getMessage()
  return (
    <div className='w-full h-screen flex'>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home
