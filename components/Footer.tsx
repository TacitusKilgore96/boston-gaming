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
    <div className='mx-auto flex-col w-full text-center'>
        {/* parent div for LOCATION */}
      <div className='bg-[#434343] [&_h1]:uppercase [&_h1]:font-extrabold [&_h1]:text-3xl grid grid-cols-3 p-20'>

        <div>
            <h1>Location</h1>
            {isLoading && <p>Henter adresse...</p>}
            {error && <p>Adresse kunne ikke hentes.</p>}
            {!isLoading && !error && <p className='p-5'>{footer?.location}</p>}
        </div>

        <div className='grid justify-center gap-5'>
            <h1>Around The Web</h1>
            <div className='flex gap-3 [&_a]:h-14 [&_a]:w-14 [&_a]:border-2 [&_a]:border-black [&_a]:rounded-full [&_a]:p-3 [&_a]:invert [&_a]:hover:bg-white [&_a]:hover:border-white'>
                <a href=""><img src="facebook-brands-solid-full.svg" alt="" /></a>
                <a href=""><img src="twitter-brands-solid-full(1).svg" alt="" /></a>
                <a href=""><img src="square-linkedin-brands-solid-full.svg" alt="" /></a>
                <a href=""><img src="dribbble-brands-solid-full.svg" alt="" /></a>
            </div>
        </div>

        <div>
            <h1>About Boston Gaming</h1>
          {!isLoading && !error && <p className='p-5'>{footer?.about}</p>}
        </div>

      </div>
      <div className='bg-[#1a1a1a]'>
        <p className='p-5 text-sm text-white/80'>Copyright © Boston Gaming</p>
      </div>
    </div>
  )
}

export default Footer
