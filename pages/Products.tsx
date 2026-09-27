"use client"

import { useEffect } from "react";
import useRequestData from "@/hooks/useRequestData";

type Product = {
  _id: string;
  title: string;
  productimage: string;
};

/* Produkt titlernes ID'er */
const productIds = [
  "5f95d114595ad72688f9550e",
  "5f95d588595ad72688f9550f",
  "5f95d5c4595ad72688f95510",
  "5f95d5fc595ad72688f95511",
  "5f95d63e595ad72688f95512",
  "5f95d686595ad72688f95513",
];

export default function Products() {
  const {
    makeRequest: makeProductRequest,
    data: productData,
    isLoading,
    error,
  } = useRequestData();

  // API'et returnerer alle produkter som en liste.
  const products = (productData as Product[] | null ?? [])
    // Viser kun de valgte produkter i den ønskede rækkefølge.
    .filter((product) => productIds.includes(product._id))
    .sort((first, second) => productIds.indexOf(first._id) - productIds.indexOf(second._id));

  // API'et gemmer filnavnet, så den fulde billed-URL bygges her.
  const getImageUrl = (image: string) =>
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5039"}/images/product/${image}`;

  useEffect(() => {
    // Henter produkterne, når komponenten vises på forsiden.
    makeProductRequest<Product[]>("/product", "GET");
  }, [makeProductRequest]);

  return (
    <section id="Products" className="scroll-mt-20 px-4 py-12 sm:px-6 md:py-20 text-white max-w-7xl mx-auto">
      {/* Sektion Overskrift Header */}
      <div className="mb-10 sm:mb-14 text-center">
        <h2 className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          Our Products
        </h2>
        
        {/* Responsiv stjerne-divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
          <img src="/star-solid-full.svg" alt="" className="w-6 sm:w-8 md:w-10 invert" />
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-lg text-gray-300">Henter produkter...</p>
      )}

      {error && (
        <p className="text-center text-lg text-red-400">Produkterne kunne ikke hentes.</p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article 
              className="flex flex-col justify-between overflow-hidden bg-[#f2f2f26a] text-center rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300" 
              key={product._id}
            >
              <p className="p-4 sm:p-6 font-extrabold text-lg sm:text-xl uppercase">
                {product.title}
              </p>
              <div className="p-4 sm:p-6 pt-0 flex justify-center items-center">
                <img 
                  className="h-48 sm:h-64 w-full object-contain rounded-lg" 
                  src={getImageUrl(product.productimage)} 
                  alt={product.title} 
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}