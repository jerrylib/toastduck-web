"use client"

const WHATSAPP_NUMBER = "8617605010609"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg transition-colors duration-200 font-medium text-sm"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  )
}
