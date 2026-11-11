"use client"

import { useEffect, useState } from "react"

import { BRANDS, TESTIMONIALS } from "../../data/site"

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const total = TESTIMONIALS.length

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [total])

  const active = TESTIMONIALS[current]

  return (
    <div className="grid grid-cols-1 small:grid-cols-12 gap-8 items-start">
      <div className="small:col-span-5 grid grid-cols-3 gap-4">
        {BRANDS.map((brand) => (
          <div
            key={brand.image}
            className="flex items-center justify-center rounded-lg border border-ui-border-base p-4 min-h-[92px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.image}
              alt={brand.name}
              className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>

      <div className="small:col-span-7 relative">
        <div className="rounded-lg border border-ui-border-base p-6 small:p-8">
          <svg
            className="w-6 h-6 text-grey-40 mb-4"
            viewBox="0 0 30.234 23.484"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.129,0v1.723c-2.438,0.891-4.348,2.291-5.73,4.201c-1.383,1.911-2.074,3.897-2.074,5.959c0,0.445,0.07,0.773,0.211,0.984c0.093,0.141,0.199,0.211,0.316,0.211c0.117,0,0.293-0.082,0.527-0.246c0.75-0.539,1.699-0.809,2.848-0.809c1.336,0,2.519,0.545,3.551,1.635c1.031,1.09,1.547,2.385,1.547,3.885c0,1.57-0.592,2.953-1.775,4.148c-1.184,1.195-2.619,1.793-4.307,1.793c-1.969,0-3.668-0.809-5.098-2.426C0.715,19.441,0,17.274,0,14.555c0-3.164,0.972-6,2.918-8.508C4.863,3.539,7.933,1.524,12.129,0z M29.039,0v1.723c-2.438,0.891-4.348,2.291-5.73,4.201c-1.383,1.911-2.074,3.897-2.074,5.959c0,0.445,0.07,0.773,0.211,0.984c0.094,0.141,0.199,0.211,0.316,0.211s0.293-0.082,0.527-0.246c0.75-0.539,1.699-0.809,2.848-0.809c1.336,0,2.52,0.545,3.551,1.635s1.547,2.385,1.547,3.885c0,1.57-0.592,2.953-1.775,4.148s-2.619,1.793-4.307,1.793c-1.969,0-3.668-0.809-5.098-2.426s-2.145-3.785-2.145-6.504c0-3.164,0.973-6,2.918-8.508C21.773,3.539,24.844,1.524,29.039,0z" />
          </svg>
          <p className="text-base-regular small:text-large-regular italic text-ui-fg-subtle leading-relaxed">
            “{active.text}”
          </p>
          <div className="flex items-center gap-3 mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.author}
              width={56}
              height={56}
              className="w-12 h-12 rounded-full object-cover border border-ui-border-base"
            />
            <div>
              <p className="text-base-semi text-ui-fg-base">{active.author}</p>
              <p className="text-small-regular text-ui-fg-subtle">{active.position}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.author}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === current ? "w-6 bg-ui-fg-base" : "w-2.5 bg-grey-30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
