import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#ffffffff] text-black uppercase font-extrabold flex justify-around p-8 [&_a]:transition-all [&_a]:duration-[.3s]'>
        <div className='flex'>
            <img src="dog-solid-full.svg" alt="" className='w-20' />
            <a href="#" className='text-3xl hover:bg-black hover:text-white p-3'>Boston Gaming</a>
        </div>
        <div className='flex gap-5 [&_a:hover]:bg-black [&_a:hover]:text-white [&_a]:p-3'>
            <a href="#">Products</a>
            <a href="#">Design Your Own</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
    </div>
  )
}

export default Header
