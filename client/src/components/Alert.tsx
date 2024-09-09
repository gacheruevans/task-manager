import React, { useState } from 'react'
import { BiCheckSquare } from 'react-icons/bi';

const Alert = () => {
    const [close, setClose] = useState(false);
    const [show, setShow] = useState(true);

  return (
    <div className='flex flex-col gap-5'>
        <div className='max-w-lg rounded bg-green-100 text-green-700 overflow-hidden shadow-md shadow-green-500/20 '>
            <div className='flex'>
                <div className='flex items-center gap-4 p-4'>
                    <div className='shrink-0'>
                        <BiCheckSquare />
                    </div>
                    <div className='space-y-1'>
                        <p className='font-bold capitalize'>Success</p>
                        <p className='text-sm'>You created a new task</p>
                    </div>
                    <div className='flex cursor-pointer items-center border-l border-green-200 hover:bg-green-200'>
                        <button onClick={(e)=>{setClose(true)}}>  </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Alert