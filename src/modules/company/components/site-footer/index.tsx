import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { COMPANY, QUICK_LINKS, SOCIAL_LINKS } from "../../data/site"

const ICON_PATHS: Record<string, string> = {
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  twitter:
    "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
}

const footerNav = [
  { text: "Home", href: "/company/home" },
  { text: "Services", href: "/company/home#services" },
  { text: "About", href: "/company/home#about" },
  { text: "Portfolio", href: "/company/home#gallery" },
  { text: "Team", href: "/company/home#team" },
  { text: "News", href: "/company/news" },
  { text: "Contact", href: "/company/home#contacts" },
]

export default function CompanyFooter() {
  return (
    <footer className="bg-grey-90 text-white" data-testid="company-footer">
      <div className="max-w-[1440px] mx-auto px-4 small:px-6">
        <div className="py-12 small:py-16 grid grid-cols-1 small:grid-cols-2 large:grid-cols-4 gap-8">
          <div className="small:col-span-2">
            <LocalizedClientLink href="/company/home" className="inline-block mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY.logoWhite}
                alt="Toastduck logo"
                width={176}
                height={88}
                className="h-12 w-auto"
              />
            </LocalizedClientLink>
            <p className="text-small-regular text-grey-30 max-w-md leading-relaxed">
              {COMPANY.name} is a professional international business enterprise
              dedicated to delivering high-quality products and exceptional
              service to clients worldwide.
            </p>
            <p className="text-small-regular text-grey-40 mt-3">{COMPANY.nameCn}</p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={`${social.name}-${social.href}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-grey-80 flex items-center justify-center text-grey-30 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={ICON_PATHS[social.icon]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-base-semi mb-4">Quick Links</h5>
            <ul className="space-y-2">
              {footerNav.map((link) => (
                <li key={link.text}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-small-regular text-grey-30 hover:text-white transition-colors"
                  >
                    {link.text}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-base-semi mb-4">Contact Info</h5>
            <div className="space-y-4 text-small-regular text-grey-30">
              <p className="leading-relaxed">{COMPANY.address}</p>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                {COMPANY.whatsappLabel}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="block hover:text-white transition-colors"
              >
                {COMPANY.email}
              </a>
              <p>{COMPANY.hours}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-grey-80 py-5 flex flex-col small:flex-row items-center justify-between gap-3">
          <p className="text-small-regular text-grey-40">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-small-regular text-grey-40 hover:text-white transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
