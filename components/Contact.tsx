"use client"

import { useState } from "react"

const Contact = () => {
  /* Gemmer alle formularfelter samlet i ét objekt. */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  })

  /* Bruges til at vise, om formularen står stille, sender, lykkes eller fejler */
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    /* feltets name-attribut bestemmer, hvilken værdi der opdateres */
    setFormData((previousData) => ({ ...previousData, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus("sending")

    try {
      // Bruger samme lokale backend-fallback som de øvrige API-kald i projektet.
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5039").replace(/\/$/, "")

      /* Sender formularens data til kontakt-endpointet som JSON */
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Kontaktformularen kunne ikke sendes")
      }

      setStatus("success")
      /* Tømmer felterne efter en vellykket indsendelse */
      setFormData({ name: "", email: "", phonenumber: "", message: "" })
    } catch (error) {
      console.error("Fejl ved indsendelse af kontaktformular", error)
      setStatus("error")
    }
  }

  return (
    <section id="Contact" className="scroll-mt-20 bg-black text-white py-12 px-4 sm:px-6 md:py-20">
      {/* Overskrift & stjerne */}
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          Contact Us
        </h2>
        
        {/* Responsiv stjerne-divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
          <img src="/star-solid-full.svg" alt="" className="w-6 sm:w-8 md:w-10 invert" />
          <span className="h-[2px] bg-white/80 w-12 sm:w-20 md:w-25"></span>
        </div>
      </div>

      {/* Form med samlet styling på alle input og textarea felter */}
      <form 
        onSubmit={handleSubmit} 
        className="max-w-xl mx-auto flex flex-col gap-6 sm:gap-8 [&_input]:w-full [&_input]:bg-transparent [&_input]:border-b [&_input]:border-gray-600 [&_input]:pb-3 [&_input]:focus:outline-none [&_input]:focus:border-white [&_input]:placeholder-gray-400 [&_textarea]:w-full [&_textarea]:bg-transparent [&_textarea]:border-b [&_textarea]:border-gray-600 [&_textarea]:pb-3 [&_textarea]:focus:outline-none [&_textarea]:focus:border-white [&_textarea]:placeholder-gray-400"
      >
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="tel" 
          name="phonenumber" 
          placeholder="Phone Number" 
          value={formData.phonenumber} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="message" 
          placeholder="Message" 
          rows={4} 
          value={formData.message} 
          onChange={handleChange} 
          required 
          className="resize-none" 
        />

        <button 
          type="submit" 
          disabled={status === "sending"} 
          className="w-full sm:w-fit border-2 border-white px-8 py-3 text-base sm:text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-center font-bold">Kontaktformular afsendt!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-center font-bold">Der opstod en fejl. Prøv igen.</p>
        )}
      </form>
    </section>
  )
}

export default Contact