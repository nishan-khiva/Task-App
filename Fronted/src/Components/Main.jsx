import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div className='w-full h-[98vh] bg-gray-400 mt-1.5 rounded-[8px] border-[2px] border-gray-600 p-2 overflow-y-auto' >
      
      <Outlet/>
    </div>
  )
}

export default Main
