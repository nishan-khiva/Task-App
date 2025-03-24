import React from 'react'
import Sidebar from '../Components/Sidebar'
import Main from '../Components/Main'


const Home = () => {
  return (
    <div className='bg-gray-300 h-screen w-full fixed flex gap-1.5 '>
      <Sidebar/>
      <Main/>

    </div>
  )
}

export default Home
