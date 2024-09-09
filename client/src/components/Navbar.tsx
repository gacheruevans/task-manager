import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-col w-full'>
      <nav className="bg-blck border-gray-300 dark:bg-transparent">
        <div className="flex justify-end flex-wrap items-center mx-auto max-w-screen-xl p-4">
            <div className="flex items-center space-x-6 ">
                <Link to="/logout" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Logout</Link>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar