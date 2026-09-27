"use client" // Tilføj denne linje, hvis du bruger Next.js (App Router)

import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    // 'sticky lg:static' gør den sticky på mobil/tablet og static på desktop (lg og op)
    <header className="sticky top-0 lg:static z-50 bg-white text-black uppercase font-extrabold shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 max-w-7xl mx-auto [&_a]:transition-all [&_a]:duration-[.3s]">
        
        {/* Logo og Brand */}
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Boston Gaming Logo" className="w-12 md:w-20 h-auto" />
          <a href="#" className="text-xl md:text-3xl hover:bg-black hover:text-white p-2 md:p-3">
            Boston Gaming
          </a>
        </div>

        {/* Desktop Navigation (synlig på lg og op) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-5 [&_a:hover]:bg-black [&_a:hover]:text-white [&_a]:p-3">
          <a href="#Products">Products</a>
          <a href="#Design">Design Your Own</a>
          <a href="#About">About</a>
          <a href="#Contact">Contact</a>
        </nav>

        {/* Burgermenu Knap (Mobil & Tablet) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-black hover:bg-black hover:text-white transition-colors focus:outline-none"
          aria-label="Skift menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil & Tablet Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-2 [&_a:hover]:bg-black [&_a:hover]:text-white [&_a]:p-3 [&_a]:block text-center">
          <a href="#Products" onClick={() => setIsMenuOpen(false)}>
            Products
          </a>
          <a href="#Design" onClick={() => setIsMenuOpen(false)}>
            Design Your Own
          </a>
          <a href="#About" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#Contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header