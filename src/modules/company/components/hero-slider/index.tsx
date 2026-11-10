"use client"

import { useEffect, useState } from "react"

import { HERO_SLIDES } from "../../data/site"

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const total = HERO_SLIDES.length

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  const go = (offset: number) => {
    setCurrent((prev) => (prev + offset + total) % total)
  }

  return (
    <section
      className="relative overflow-hidden bg-grey-90 text-white"
      style={{ height: "70vh", minHeight: "400px", maxHeight: "70vh" }}
      data-testid="company-hero"
      id="home"
    >
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={index !== current}
        >
          {slide.type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.toastduck.com/video.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://images.toastduck.com/video.mp4" type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-black/55" />

          <div
            className={`relative h-full max-w-[1440px] mx-auto px-4 small:px-6 pt-10 pb-16 small:pb-20 flex flex-col justify-center ${
              slide.align === "start" ? "items-start text-left" : "items-center text-center"
            }`}
          >
            <h1 className="text-3xl small:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
              {slide.title}
            </h1>
            <p className="text-base-regular small:text-large-regular text-white/80 mt-4 max-w-2xl">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={slide.primaryCta.href}
                className="rounded-full bg-white text-ui-fg-base px-6 py-3 text-small-regular font-medium hover:bg-white/90 transition-colors"
              >
                {slide.primaryCta.label}
              </a>
              <a
                href={slide.secondaryCta.href}
                className="rounded-full border border-white/70 px-6 py-3 text-small-regular font-medium hover:bg-white/10 transition-colors"
              >
                {slide.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="hidden small:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="hidden small:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
