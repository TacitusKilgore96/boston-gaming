"use client"

import React from 'react'
import { useEffect, useState } from "react";
import useRequestData from "@/hooks/useRequestData";

/* først definerer jeg typen på de data, vi forventer at få fra API'et */
type AboutItem = {
  content1: string
  content2: string
}

const About = () => {

  /* henter funktionen til at lave request og selve data-okjektet fra hooken */
  const { makeRequest, data } = useRequestData()
  const about = data as AboutItem | null

  /* henter "About" data fra API'et, når komponenten loader  */
  useEffect(() => {
    makeRequest<AboutItem>('/about', 'GET')
  }, [makeRequest])

  return (
    <div id="About" className="scroll-mt-32 bg-[#434343] p-20">
      <h1 className="mb-10 text-center text-6xl font-extrabold uppercase">About</h1>
      <div className="flex justify-center gap-4">
        <span className="mt-4.5 h-0.5 w-25 border-1"></span>
        <img src="/star-solid-full.svg" alt="" className="w-10 invert" />
        <span className="mt-4.5 h-0.5 w-25 border-1"></span>
      </div>
      {/* About */}
      <div className='p-10 flex justify-center gap-15 [&_p]:w-85 [&_p]:text-xl text-white/65'>
        <p>{about?.content1}</p>
        <p>{about?.content2}</p>
      </div>
    </div>
  )
}

export default About
