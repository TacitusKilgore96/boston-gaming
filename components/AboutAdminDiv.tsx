"use client"

import { useEffect, useState } from "react"
import useRequestData from "@/hooks/useRequestData"

/* Beskriver strukturen på About-data fra API'et */
type AboutItem = {
  _id: string
  content1: string
  content2: string
}

const AboutAdminDiv = () => {
  /* Henter request-funktionen, data samt loading- og fejl-status fra min hook */
  const { makeRequest, data, isLoading, error } = useRequestData()

  /* Lokal state til formularens felter */
  const [formData, setFormData] = useState<AboutItem>({
    _id: "",
    content1: "",
    content2: "",
  })

  /* Tilstand til statusbeskeder (f.eks. "Gemmer...", "Gemt!") */
  const [statusMessage, setStatusMessage] = useState<string>("")

  /* Henter eksisterende About-data fra API'et, når komponenten indlæses */
  useEffect(() => {
    const fetchAboutData = async () => {
      await makeRequest<AboutItem>("/about", "GET")
    }
    fetchAboutData()
  }, [makeRequest])

  /* Lægger de hentede data over i formularen, så snart de lander fra API'et */
  useEffect(() => {
    if (data) {
      /* Hvis API'et returnerer et array, tager vi det første element, ellers tages data direkte */
      const aboutData = Array.isArray(data) ? data[0] : (data as AboutItem)
      if (aboutData) {
        setFormData(aboutData)
      }
    }
  }, [data])

  /* Opdaterer den lokale state, når admin skriver i tekstfelterne */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /* Sender PUT-requesten med de opdaterede data */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage("Gemmer...")

    try {
      /* PUT-kald til endpointet med de nye tekstdata og ID */
      await makeRequest("/about/admin", "PUT", {
        body: formData,
      })
      setStatusMessage("About-teksten blev opdateret!")
    } catch (err) {
      console.error(err)
      setStatusMessage("Der opstod en fejl under gemning.")
    }
  }

  return (
    <div>
      <section className="mb-12">
        {isLoading && (
          <p className="border border-gray-600 bg-gray-800 p-6 font-bold text-white">
            Henter About-data...
          </p>
        )}

        {error && (
          <p className="border-l-4 border-white bg-gray-800 p-6 font-bold text-white">
            Kunne ikke hente About-data.
          </p>
        )}

        {!isLoading && !error && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="content1" className="mb-2 block font-bold text-gray-300">
                  Tekst 1 (Venstre kolonne)
                </label>
                <textarea
                  id="content1"
                  name="content1"
                  rows={6}
                  value={formData.content1 ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-600 bg-gray-800 p-4 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label htmlFor="content2" className="mb-2 block font-bold text-gray-300">
                  Tekst 2 (Højre kolonne)
                </label>
                <textarea
                  id="content2"
                  name="content2"
                  rows={6}
                  value={formData.content2 ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-600 bg-gray-800 p-4 text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-white px-6 py-3 font-bold uppercase text-black transition-colors hover:bg-gray-300 cursor-pointer"
              >
                Gem About-tekst (PUT)
              </button>
              {statusMessage && (
                <p className="font-bold text-gray-300">{statusMessage}</p>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default AboutAdminDiv