"use client"

import React, { useEffect } from "react";
import useRequestData from "@/hooks/useRequestData";

/* først definerer jeg typen på de data, vi forventer at få fra API'et */
type AboutItem = {
  content1: string
  content2: string
}

const About = () => {
  /* henter funktionen til at lave request og selve data-objektet fra hooken */
  const { makeRequest, data } = useRequestData()
  const about = data as AboutItem | null

  /* henter "About" data fra API'et, når komponenten loader  */
  useEffect(() => {
    makeRequest<AboutItem>('/about', 'GET')
  }, [makeRequest])

  return (
    <section id="About" className="scroll-mt-20 bg-[#434343] px-4 py-12 sm:px-8 md:py-20 text-white">
      {/* Sektion Overskrift Header */}
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          About
        </h1>
        
        {/* Responsiv stjerne-divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
          <img src="/star-solid-full.svg" alt="" className="w-6 sm:w-8 md:w-10 invert" />
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
        </div>
      </div>

      {/* Tekstindhold: 1 kolonne på mobil, 2 kolonner fra medium (md) skærme og op */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-base sm:text-lg md:text-xl text-white/75 leading-relaxed">
        <p className="w-full">{about?.content1}</p>
        <p className="w-full">{about?.content2}</p>
      </div>
    </section>
  )
}

export default About