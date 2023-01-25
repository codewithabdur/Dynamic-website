import React from 'react'
import '../pages/contact.css'

export default function Footer() {
  return (
    <>

    <footer className='border-t border-white max-w-7xl text-white mx-auto py-10 flex items-center justify-center text-center flex-col mt-6 b'>
      <h3 className='text-xl capitalize'> Made With <span className='heart'> &#10084;</span> Abdur rahman Khan</h3>
      <p className='text-sm mt-4 flex items-center justify-center gap-1 flex-wrap  med'><span className='heart'>&copy;</span>Copyright Reserved With @CodeWithAbdur
      </p>
    </footer>
      
    </>
  )
}