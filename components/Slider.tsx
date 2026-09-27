'use client'

import { useEffect, useState } from "react";

type Slide = {
  sliderimage: string;
  alttext: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5039";

export default function Slider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/slider`)
      .then((response) => {
        if (!response.ok) throw new Error("Slider kunne ikke hentes");
        return response.json();
      })
      .then(setSlides)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;

    // Skifter til næste slide hvert 9 sekund.
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden text-base sm:text-xl md:text-2xl">
      {/* 1. Renders ALLE billeder oven på hinanden i absolutte lag */}
      {slides.map((item, index) => (
        <img
          key={index}
          src={`${apiUrl}/images/slider/${item.sliderimage}`}
          alt={item.alttext}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* 2. Teksten og overlayet ligger øverst oven på billederne */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8 text-center text-white/85">
        <div className="w-full max-w-2xl bg-black/50 p-4 sm:p-8 backdrop-blur-xs">
          <div className="flex flex-col items-center w-full gap-4 sm:gap-6 md:gap-10">
            {/* Responsiv overskrift: fra 4xl på mobil til 8xl på desktop */}
            <h1 className="text-3xl sm:text-6xl md:text-8xl font-extrabold tracking-tight">
              Boston Gaming
            </h1>

            {/* Responsiv stjerne-divider */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
              <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
              <img src="/star-solid-full.svg" alt="" className="w-6 sm:w-8 md:w-10 invert" />
              <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
            </div>
            
            {/* Teksten skifter glidende sammen med billedet */}
            <p className="transition-all duration-500 text-sm sm:text-lg md:text-2xl px-2">
              {slides[activeSlide].alttext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}