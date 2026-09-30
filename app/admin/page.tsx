"use client"

import { useEffect, useState } from "react"
import useRequestData from "@/hooks/useRequestData"
import AboutAdminDiv from "@/components/AboutAdminDiv"
import ScrollToTop from "@/components/ScrollToTop"

/* Beskriver strukturen på en kontakt fra API'et */
type Contact = {
  _id: string
  name: string
  email: string
  phonenumber: string
  message: string
  read: boolean
  received: string
}

const Admin = () => {
  /* Hooken håndterer API-kald, data og loading fejl */
  const { makeRequest, data, isLoading, error } = useRequestData()

  /* Henter alle kontakter fra admin-endpointet */
  const loadContacts = () => makeRequest("/contact/admin", "GET")

  /* Henter kontakter automatisk */
  useEffect(() => {
    loadContacts()
  }, [])

  /* Skifter kontaktens read-status mellem læst og ulæst (boolean) */
  const handleReadChange = async (contact: Contact) => {
    /* PATCH opdaterer kun read-feltet på den valgte kontakt */
    await makeRequest(`/contact/admin/${contact._id}`, "PATCH", {
      body: { read: !contact.read },
    })
    /* Henter listen igen, så den nye status vises */
    await loadContacts()
  }

  /* Sletter en kontakt efter administratorens bekræftelse */
  const handleDelete = async (contactId: string) => {
    if (!window.confirm("Er du sikker på, at kontakten skal slettes?")) return

    /* DELETE fjerner kontakten fra databasen */
    await makeRequest(`/contact/admin/${contactId}`, "DELETE")
    /* Opdaterer listen efter sletning */
    await loadContacts()
  }

  /* CRASH PROTECTION */
  /* Sikrer, at data altid behandles som en liste. Forhindrer at appen kasserer med en fejl. 
  Fortæller TypeScript "stol på mig. de objekter der ligger i denne liste, følger formatet for en Contact"
  TypeScript ved jo ikke på forhånd, hvad der kommer ud af mit custom hook */
  const contacts = (data ?? []) as Contact[]

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b-4 border-white pb-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
            Boston Gaming / Administration
          </p>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            Kontaktlisten
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Her kan du se, markere og slette indsendte kontaktformularer.
          </p>
        </header>

        <section className="grid gap-6">
          <div className="flex items-center justify-between border-b border-gray-600 pb-3">
            <h2 className="text-2xl font-extrabold uppercase">Indsendte henvendelser</h2>
            <span className="bg-gray-700 px-3 py-1 text-sm font-bold text-white">
              {contacts.length} {contacts.length === 1 ? "kontakt" : "kontakter"}
            </span>
          </div>

          {isLoading && (
            <p className="border border-gray-600 bg-gray-800 p-6 font-bold text-white">Henter kontakter...</p>
          )}
          {error && (
            <p className="border-l-4 border-white bg-gray-800 p-6 font-bold text-white">
              Kontakterne kunne ikke hentes.
            </p>
          )}

          {!isLoading && !error && contacts.length === 0 && (
            <p className="border border-gray-600 bg-gray-800 p-6 text-gray-300">
              Der er endnu ikke modtaget nogen henvendelser.
            </p>
          )}

          {!isLoading && !error && contacts.map((contact) => (
            <article
              className={`border bg-gray-800 p-5 shadow-sm sm:p-7 ${
                contact.read ? "border-gray-600" : "border-white border-l-8"
              }`}
              key={contact._id}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-extrabold">{contact.name}</h3>
                    <span className="border border-gray-500 px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-300">
                      {contact.read ? "Læst" : "Ulæst"}
                    </span>
                  </div>
                  <div className="grid gap-1 text-gray-200">
                    <p>{contact.email}</p>
                    <p>{contact.phonenumber}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 sm:text-right">
                  {new Date(contact.received).toLocaleString("da-DK")}
                </p>
              </div>

              <p className="mt-6 border-t border-gray-600 pt-5 leading-relaxed text-gray-100">
                {contact.message}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleReadChange(contact)}
                  className="bg-white px-4 py-2 text-sm font-bold uppercase text-black transition-colors hover:bg-gray-300"
                >
                  Markér som {contact.read ? "ulæst" : "læst"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(contact._id)}
                  className="border border-gray-300 px-4 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-white hover:text-black"
                >
                  Slet kontakt
                </button>
              </div>
            </article>
          ))}
        </section>

        <header className="mb-10 border-b-4 border-white pb-6 mt-15">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            About Data
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Her kan du redigere About dataen PUT
          </p>
        </header>

        {/* Skemaet til at redigere About Data */}
        <AboutAdminDiv />
        
      </div>
      <ScrollToTop />
    </div>
  )
}

export default Admin