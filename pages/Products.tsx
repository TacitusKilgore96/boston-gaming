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
    <section className=" px-6 py-16 text-white">
      <div className="mb-15 pt-15">
          <h2 className="mb-10 text-center text-6xl font-extrabold uppercase">Our Products</h2>
          <div className="flex justify-center gap-4">
              <span className="border-1 mt-4.5 h-0.5 w-25"></span>
              <img src="/star-solid-full.svg" alt="" className="w-10 invert" />
              <span className="border-1 mt-4.5 h-0.5 w-25"></span>
            </div>
      </div>
      {isLoading && <p className="text-center">Henter produkter...</p>}
      {error && <p className="text-center">Produkterne kunne ikke hentes.</p>}
      {!isLoading && !error && (
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article className="flex flex-col overflow-hidden bg-[#f2f2f26a] text-center rounded-lg shadow-md" key={product._id}>
              <p className="p-6 font-extrabold text-xl">{product.title}</p>
              <img className="h-64 p-6 rounded-lg w-full" src={getImageUrl(product.productimage)} alt={product.title} />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
