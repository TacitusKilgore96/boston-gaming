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

  const slide = slides[activeSlide];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden text-2xl">
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
      <div className="absolute inset-0 z-20 flex items-center justify-center p-8 text-center text-white/85">
        <div className="w-fit max-w-full bg-black/50 p-8">
          <div className="flex flex-col items-center min-w-190 gap-10">
            <h1 className="text-8xl font-extrabold">Boston Gaming</h1>
            <div className="flex justify-center gap-4">
              <span className="border-1 mt-4.5 h-0.5 w-25"></span>
              <img src="/star-solid-full.svg" alt="" className="w-10 invert" />
              <span className="border-1 mt-4.5 h-0.5 w-25"></span>
            </div>
            
            {/* Teksten skifter også glidende sammen med billedet */}
            <p className="transition-all duration-500">
              {slides[activeSlide].alttext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
