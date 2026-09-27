"use client"

import { useEffect } from 'react'
import useRequestData from '@/hooks/useRequestData'

type FooterItem = {
    about: string
    location: string
}

const Footer = () => {
  // Hooken henter footerens data og holder styr på loading og fejl.
  const {
    makeRequest: makeFooterRequest,
    data: footerData,
    isLoading,
    error,
  } = useRequestData();

  // Footer-API'et returnerer ét objekt med about og location.
  const footer = footerData as FooterItem | null;

  useEffect(() => {
    const loadFooter = async () => {
      await makeFooterRequest<FooterItem>('/footer', 'GET');
    };

    loadFooter();
  }, [makeFooterRequest]);

  return (
    <footer className="w-full text-center">
      {/* Hovedindhold i footeren */}
      <div className="bg-[#434343] text-white px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
        
        {/* Location */}
        <div className="flex flex-col items-center">
          <h2 className="uppercase font-extrabold text-xl md:text-3xl mb-3">Location</h2>
          {isLoading && <p className="text-white/70 text-base md:text-xl">Henter adresse...</p>}
          {error && <p className="text-white/70 text-base md:text-xl">Adresse kunne ikke hentes.</p>}
          {!isLoading && !error && (
            <p className="text-white/70 text-base md:text-xl max-w-xs">{footer?.location}</p>
          )}
        </div>

        {/* SoMe links */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="uppercase font-extrabold text-xl md:text-3xl">Around The Web</h2>
          <div className="flex justify-center gap-3 [&_a]:h-12 [&_a]:w-12 sm:[&_a]:h-14 sm:[&_a]:w-14 [&_a]:border-2 [&_a]:border-black [&_a]:rounded-full [&_a]:p-3 [&_a]:invert [&_a]:hover:bg-white [&_a]:hover:border-white [&_a]:transition-colors">
            <a href="#" aria-label="Facebook"><img src="facebook-brands-solid-full.svg" alt="" /></a>
            <a href="#" aria-label="Twitter"><img src="twitter-brands-solid-full(1).svg" alt="" /></a>
            <a href="#" aria-label="LinkedIn"><img src="square-linkedin-brands-solid-full.svg" alt="" /></a>
            <a href="#" aria-label="Dribbble"><img src="dribbble-brands-solid-full.svg" alt="" /></a>
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col items-center">
          <h2 className="uppercase font-extrabold text-xl md:text-3xl mb-3">About Boston Gaming</h2>
          {!isLoading && !error && (
            <p className="text-white/70 text-base md:text-xl max-w-sm leading-relaxed">{footer?.about}</p>
          )}
        </div>

      </div>

      {/* Copyright bundlinje */}
      <div className="bg-[#1a1a1a] py-4 px-4">
        <p className="text-xs sm:text-sm text-white/80">Copyright © Boston Gaming</p>
      </div>
    </footer>
  )
}

export default Footer