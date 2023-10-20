import Link from 'next/link';
import React from 'react'
import { FaInstagram } from 'react-icons/fa';  
 

const Footer = () => {
  return (
  <footer className=' border-t mt-6 dark:invert h-full'>
    <div className='mx-auto py-20'>


    
      <div className='flex items-center gap-3 justify-center mt-3'>
      <Link href="https://www.instagram.com/jorgenoino/" target="_blank">
        <FaInstagram size={40} color="#000" />  
      </Link>
    
      </div>
    <p className='text-center text-xs text-black mt-3'>
    &copy; 2023 Jorgen Oino - All rights Reserved.
    </p>
    </div>

    
  </footer>
  )
}

export default Footer