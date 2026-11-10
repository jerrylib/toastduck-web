"use client"

import { useState } from "react"

import { CONTACT_FORM_ENDPOINT } from "../../data/site"

type Status = "idle" | "sending" | "success" | "error"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error("Form submission failed")

      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-base border border-ui-border-base text-small-regular text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none focus:border-ui-fg-base"

  return (
    <form onSubmit={submit} className="mt-4" data-testid="company-contact-form">
      <div className="grid grid-cols-1 xsmall:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-small-regular text-ui-fg-base">
            Your Name <span className="text-red-600">*</span>
          </span>
          <input
            className={`${inputClass} mt-1`}
            type="text"
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Your Name"
            required
          />
        </label>
        <label className="block">
          <span className="text-small-regular text-ui-fg-base">
            Your Email <span className="text-red-600">*</span>
          </span>
          <input
            className={`${inputClass} mt-1`}
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            placeholder="Your Email"
            required
          />
        </label>
      </div>

      <label className="block mt-4">
        <span className="text-small-regular text-ui-fg-base">
          Your Message <span className="text-red-600">*</span>
        </span>
        <textarea
          className={`${inputClass} mt-1`}
          name="message"
          rows={5}
          value={form.message}
          onChange={update}
          placeholder="Your Message"
          required
        />
      </label>

      <div className="flex items-center gap-4 mt-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full border border-ui-fg-base bg-ui-fg-base px-6 py-3 text-small-regular text-white disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <span className="text-small-regular text-green-700" role="status">
            Thank you for your message! We will get back to you soon.
          </span>
        )}
        {status === "error" && (
          <span className="text-small-regular text-red-700" role="status">
            Failed to send message. Please try again or email us directly.
          </span>
        )}
      </div>
    </form>
  )
}
