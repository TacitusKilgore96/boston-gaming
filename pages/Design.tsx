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
// Nøglen er gear-itemets _id, så prisen kobles til det rigtige gear.
// Ændr beløbene her, hvis du vil bruge andre priser.
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
  // Gemmer det valgte gear-id for hver kategori. Et objekt bruges, fordi
  // brugeren må vælge ét produkt i hver kategori samtidig.
  const [selectedGear, setSelectedGear] = useState<Record<string, string>>({});

  // Der bruges én hook-instans pr. API-kald, fordi hooken gemmer data fra
  // det seneste kald i sin egen state.
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
    // Kategorierne bestemmer rækkefølgen og overskriften på hver gear-række.
    makeCategoryRequest<GearCategory[]>("/gearcategory", "GET");
    // Gear-listen indeholder de konkrete valgmuligheder under hver kategori.
    makeGearRequest<Gear[]>("/gear", "GET");
  }, [makeCategoryRequest, makeGearRequest]);

  // Hookens data-type er unknown, så den omdannes til de typer, API'et forventes
  // at returnere. ?? [] gør, at .map() kan bruges, før kaldet er færdigt.
  const gearCategories = (gearCategoryData as GearCategory[] | null) ?? [];
  const gear = (gearData as Gear[] | null) ?? [];
  const isLoading = isCategoryLoading || isGearLoading;
  const hasError = categoryError || gearError;
  // Object.values() henter alle valgte gear-id'er, hvorefter deres priser
  // lægges sammen. ?? 0 gør beregningen robust, hvis et id mangler en pris.
  const total = Object.values(selectedGear).reduce(
    (sum, gearId) => sum + (gearPrices[gearId] ?? 0),
    0,
  );

  return (
    <section className="px-6 py-16 text-white">
      <h1 className="mb-10 text-center text-6xl font-extrabold uppercase">Design Your Own Rig!</h1>
      <div className="flex justify-center gap-4">
        <span className="mt-4.5 h-0.5 w-25 border-1"></span>
        <img src="/star-solid-full.svg" alt="" className="w-10 invert" />
        <span className="mt-4.5 h-0.5 w-25 border-1"></span>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-3 text-center text-xl font-extrabold">Pick your gear</h2>
          {isLoading && <p className="text-center">Henter gear...</p>}
          {hasError && <p className="text-center">Gear kunne ikke hentes.</p>}
          {!isLoading && !hasError && (
            <div className="space-y-1">
              {/* Én visuel række oprettes for hver kategori fra API'et. */}
              {gearCategories.map((category) => (
                <div className="grid grid-cols-[6.5rem_1fr] gap-3 rounded bg-[#464646] px-3 py-2 text-xs" key={category._id}>
                  <h3 className="font-semibold">{category.gearcategorytitle}</h3>
                  <div className="space-y-1">
                    {/* Kun gear med samme kategori-id vises i denne række. */}
                    {gear
                      .filter((item) => item.gearcategory._id === category._id)
                      .map((item) => (
                        <label className="flex items-start gap-2" key={item._id}>
                          <input
                            type="radio"
                            // Samme name pr. kategori betyder, at kun ét gear
                            // kan vælges inden for den kategori.
                            name={`gear-${category._id}`}
                            value={item._id}
                            className="mt-0.5 accent-blue-400"
                            onChange={() => {
                              // Når et radio-valg ændres, gemmes gear-id'et
                              // under den aktuelle kategori og totalen opdateres.
                              setSelectedGear((currentSelection) => ({
                                ...currentSelection,
                                [category._id]: item._id,
                              }));
                            }}
                          />
                          <span className="flex w-full justify-between gap-2">
                            <span>{item.geartitle}</span>
                            <span className="shrink-0">${gearPrices[item._id] ?? 0}</span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-center text-xl font-extrabold">Summary</h2>
          <div className="flex min-h-10 justify-between rounded bg-white p-3 text-sm text-black">
            <span>Total</span>
            {/* toLocaleString formaterer tallet, så det er let at læse */}
            <strong>${total.toLocaleString("en-US")}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Design
