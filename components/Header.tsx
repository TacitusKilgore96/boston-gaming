import React from 'react'

const Header = () => {
  return (
    <div className='top-0 z-50 bg-[#ffffffff] text-black uppercase font-extrabold flex justify-around p-8 [&_a]:transition-all [&_a]:duration-[.3s]'>
        <div className='flex'>
            <img src="logo.png" alt="" className='w-20' />
            <a href="#" className='text-3xl hover:bg-black hover:text-white p-3'>Boston Gaming</a>
        </div>
        <div className='flex gap-5 [&_a:hover]:bg-black [&_a:hover]:text-white [&_a]:p-3'>
            <a href="#Products">Products</a>
            <a href="#Design">Design Your Own</a>
            <a href="#About">About</a>
            <a href="#Contact">Contact</a>
        </div>
    </div>
  )
}

export default Header
