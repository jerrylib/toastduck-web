"use client"

import { useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { COMPANY, NAV_ITEMS, STORE_URL } from "../../data/site"

export default function CompanyHeader() {
  const [open, setOpen] = useState(false)

  const renderLink = (item: (typeof NAV_ITEMS)[number], mobile = false) => {
    const cls = mobile
      ? "block py-3 text-base text-ui-fg-base hover:text-ui-fg-subtle border-b border-ui-border-base"
      : "text-small-regular text-ui-fg-base hover:text-ui-fg-subtle whitespace-nowrap"

    if (item.external) {
      return (
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </a>
      )
    }

    const href = item.anchor ? `${item.href}#${item.anchor}` : item.href

    return (
      <LocalizedClientLink
        href={href}
        className={cls}
        onClick={() => setOpen(false)}
        data-testid={`company-nav-${item.label.toLowerCase()}`}
      >
        {item.label}
      </LocalizedClientLink>
    )
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ui-border-base">
      <div className="max-w-[1440px] mx-auto px-4 small:px-6">
        <div className="h-16 small:h-20 flex items-center justify-between gap-4">
          <LocalizedClientLink
            href="/company/home"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label={COMPANY.shortName}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COMPANY.logoBlack}
              alt="Toastduck logo"
              width={120}
              height={60}
              className="h-10 small:h-12 w-auto"
            />
          </LocalizedClientLink>

          <nav className="hidden small:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <span key={item.label} className="flex">
                {renderLink(item)}
              </span>
            ))}
          </nav>

          <div className="hidden small:block">
            <LocalizedClientLink
              href="/company/home#contacts"
              className="rounded-full border border-ui-fg-base px-4 py-2 text-small-regular text-ui-fg-base hover:bg-ui-fg-base hover:text-white transition-colors"
            >
              Get a quote
            </LocalizedClientLink>
          </div>

          <button
            type="button"
            className="small:hidden p-2 text-ui-fg-base"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-testid="company-menu-toggle"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <nav className="small:hidden pb-4" data-testid="company-mobile-nav">
            {NAV_ITEMS.map((item) => (
              <span key={item.label} className="block">
                {renderLink(item, true)}
              </span>
            ))}
            <LocalizedClientLink
              href="/company/home#contacts"
              className="mt-4 block rounded-full border border-ui-fg-base px-4 py-2 text-center text-small-regular text-ui-fg-base"
              onClick={() => setOpen(false)}
            >
              Get a quote
            </LocalizedClientLink>
          </nav>
        )}
      </div>
    </header>
  )
}
