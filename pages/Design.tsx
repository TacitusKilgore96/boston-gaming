"use client"

import { useEffect, useState } from "react";
import useRequestData from "@/hooks/useRequestData";

type GearCategory = {
  // En kategori fra /gearcategory, f.eks. CPU eller Memory.
  _id: string;
  gearcategorytitle: string;
};

type Gear = {
  // Et produkt fra /gear. API'et inkluderer den kategori, produktet hører til.
  _id: string;
  geartitle: string;
  gearcategory: GearCategory;
};

// Priserne ligger lokalt, fordi API'et ikke sender et price-felt endnu.
const gearPrices: Record<string, number> = {
  "5f99c37f3017c27f70b7068f": 89,
  "5f99c3903017c27f70b70690": 159,
  "5f99c39f3017c27f70b70691": 219,
  "5f99c3c43017c27f70b70692": 74,
  "5f99c3e33017c27f70b70693": 109,
  "5f99c44a3017c27f70b70694": 39,
  "5f99c4833017c27f70b70695": 54,
  "5f99c5103017c27f70b70696": 29,
  "5f99c5513017c27f70b70697": 69,
  "5f99c5773017c27f70b70698": 139,
  "5f99c5903017c27f70b70699": 249,
  "5f99c5b33017c27f70b7069a": 399,
  "5f99c5dd3017c27f70b7069b": 59,
  "5f99c5ef3017c27f70b7069c": 79,
  "5f99c6023017c27f70b7069d": 99,
  "5f99c62d3017c27f70b7069e": 49,
  "5f99c6663017c27f70b7069f": 69,
  "5f99c6853017c27f70b706a0": 89,
};

const Design = () => {
  const [selectedGear, setSelectedGear] = useState<Record<string, string>>({});

  const {
    makeRequest: makeCategoryRequest,
    data: gearCategoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useRequestData();
  
  const {
    makeRequest: makeGearRequest,
    data: gearData,
    isLoading: isGearLoading,
    error: gearError,
  } = useRequestData();

  useEffect(() => {
    makeCategoryRequest<GearCategory[]>("/gearcategory", "GET");
    makeGearRequest<Gear[]>("/gear", "GET");
  }, [makeCategoryRequest, makeGearRequest]);

  const gearCategories = (gearCategoryData as GearCategory[] | null) ?? [];
  const gear = (gearData as Gear[] | null) ?? [];
  const isLoading = isCategoryLoading || isGearLoading;
  const hasError = categoryError || gearError;

  const total = Object.values(selectedGear).reduce(
    (sum, gearId) => sum + (gearPrices[gearId] ?? 0),
    0,
  );

  return (
    <section id="Design" className="scroll-mt-20 px-4 py-12 sm:px-6 md:py-20 text-white max-w-7xl mx-auto">
      {/* Sektion Overskrift Header */}
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          Design Your Own Rig!
        </h1>
        
        {/* Responsiv stjerne-divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
          <img src="/star-solid-full.svg" alt="" className="w-6 sm:w-8 md:w-10 invert" />
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
        </div>
      </div>

      <div className="mx-auto mt-6 sm:mt-10 grid max-w-5xl gap-8 md:grid-cols-[1.4fr_1fr] items-start">
        {/* Venstre side: Gear selection */}
        <div>
          <h2 className="mb-4 text-center sm:text-left text-xl font-extrabold uppercase tracking-wider">
            Pick your gear
          </h2>
          
          {isLoading && <p className="text-center sm:text-left text-gray-300">Henter gear...</p>}
          {hasError && <p className="text-center sm:text-left text-red-400">Gear kunne ikke hentes.</p>}
          
          {!isLoading && !hasError && (
            <div className="space-y-2 sm:space-y-1">
              {gearCategories.map((category) => (
                <div 
                  className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-2 sm:gap-3 rounded bg-[#464646] p-3 sm:px-4 sm:py-3" 
                  key={category._id}
                >
                  <h3 className="font-bold text-gray-200 border-b border-gray-500 pb-1 sm:border-0 sm:pb-0">
                    {category.gearcategorytitle}
                  </h3>
                  <div className="space-y-1.5 sm:space-y-1">
                    {gear
                      .filter((item) => item.gearcategory._id === category._id)
                      .map((item) => (
                        <label className="flex items-center sm:items-start gap-2.5 cursor-pointer py-0.5 hover:text-gray-200 transition-colors" key={item._id}>
                          <input
                            type="radio"
                            name={`gear-${category._id}`}
                            value={item._id}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-blue-400 cursor-pointer"
                            onChange={() => {
                              setSelectedGear((currentSelection) => ({
                                ...currentSelection,
                                [category._id]: item._id,
                              }));
                            }}
                          />
                          <span className="flex w-full justify-between gap-2 text-sm sm:text-base">
                            <span>{item.geartitle}</span>
                            <span className="shrink-0 font-semibold">${gearPrices[item._id] ?? 0}</span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Højre side: Summary (bliver sticky øverst, når man scroller på mobil/tablet) */}
        <div className="sticky top-20 z-30 md:static">
          <h2 className="mb-4 text-center sm:text-left text-xl font-extrabold uppercase tracking-wider">
            Summary
          </h2>
          <div className="flex items-center justify-between rounded bg-white p-4 text-base sm:text-lg text-black shadow-lg">
            <span className="font-bold uppercase tracking-wide">Total</span>
            <strong className="text-xl sm:text-2xl">${total.toLocaleString("en-US")}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Design;