import LocalizedClientLink from "@modules/common/components/localized-client-link"

import HeroSlider from "../../components/hero-slider"
import Testimonials from "../../components/testimonials"
import ContactForm from "../../components/contact-form"
import { formatDate, NEWS_ARTICLES } from "../../data/news"
import {
  ABOUT,
  COMPANY,
  CONTACT_CTA,
  CTA_BAND,
  MAP_EMBED_URL,
  PRODUCTS,
  SERVICES,
  TEAM,
  TEAM_INTRO,
} from "../../data/site"

const sectionHeading =
  "text-2xl-semi text-ui-fg-base tracking-tight"

export default function CompanyHomeTemplate() {
  const latestNews = NEWS_ARTICLES.slice(0, 3)

  return (
    <div data-testid="company-home">
      <HeroSlider />

      <section className="bg-grey-90 text-white">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-8 small:py-10 flex flex-col small:flex-row items-center justify-between gap-5">
          <p className="text-base-semi small:text-xl-semi max-w-3xl text-center small:text-left">
            {CTA_BAND.text}
          </p>
          <a
            href="#contacts"
            className="rounded-full bg-white text-ui-fg-base px-6 py-3 text-small-regular font-medium whitespace-nowrap hover:bg-white/90 transition-colors"
          >
            {CTA_BAND.cta}
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16">
          <h2 className={sectionHeading}>Services</h2>
          <p className="text-small-regular text-ui-fg-subtle mt-2 max-w-2xl">
            ABB and Schneider Electric components, plus end-to-end export
            logistics from Hong Kong.
          </p>
          <div className="grid grid-cols-1 small:grid-cols-3 gap-6 mt-8">
            {SERVICES.map((service) => (
              <article
                key={service.title}
                className="rounded-lg border border-ui-border-base overflow-hidden flex flex-col"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={`${service.title} - Toastduck International Business`}
                  width={652}
                  height={491}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex-1">
                  <h3 className="text-large-semi text-ui-fg-base">{service.title}</h3>
                  <p className="text-small-regular text-ui-fg-subtle mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-grey-5 border-y border-ui-border-base scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16 grid grid-cols-1 small:grid-cols-12 gap-8">
          <div className="small:col-span-7">
            <h2 className={sectionHeading}>About Us</h2>
            <p className="text-base-regular text-ui-fg-subtle mt-4 leading-relaxed">
              {ABOUT.intro}
            </p>

            <h3 className="text-large-semi mt-8">Our Business Scope</h3>
            <ul className="mt-3 grid grid-cols-1 xsmall:grid-cols-2 gap-2">
              {ABOUT.scope.map((item) => (
                <li key={item} className="text-small-regular text-ui-fg-subtle flex items-start gap-2">
                  <span className="mt-1 text-ui-fg-base">·</span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-large-semi mt-8">Why Choose Us</h3>
            <div className="grid grid-cols-1 xsmall:grid-cols-2 gap-4 mt-3">
              {ABOUT.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border border-ui-border-base bg-white p-4"
                >
                  <p className="text-base-semi text-ui-fg-base">{feature.title}</p>
                  <p className="text-small-regular text-ui-fg-subtle mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="small:col-span-5">
            <div className="rounded-lg border border-ui-border-base overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ABOUT.image}
                alt="Toastduck International Business Team - Our Professional Staff"
                width={420}
                height={317}
                className="w-full h-auto"
              />
              <div className="p-5">
                <h3 className="text-large-semi">{ABOUT.imageTitle}</h3>
                <p className="text-small-regular text-ui-fg-subtle mt-2 leading-relaxed">
                  {ABOUT.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="gallery" className="scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16">
          <h2 className={sectionHeading}>Our Products</h2>
          <p className="text-small-regular text-ui-fg-subtle mt-2 max-w-2xl">
            A selection of the ABB, Schneider Electric and Siemens lines we ship
            most often.
          </p>
          <div className="grid grid-cols-2 small:grid-cols-3 gap-4 small:gap-6 mt-8">
            {PRODUCTS.map((product) => (
              <figure
                key={product.title}
                className="rounded-lg border border-ui-border-base overflow-hidden bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-small-regular text-ui-fg-base">
                  {product.title}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <LocalizedClientLink
              href="/store"
              className="inline-block rounded-full border border-ui-fg-base px-6 py-3 text-small-regular text-ui-fg-base hover:bg-ui-fg-base hover:text-white transition-colors"
            >
              Browse the store
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-grey-5 border-y border-ui-border-base scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16">
          <h2 className={sectionHeading}>Our Team</h2>
          <p className="text-base-regular text-ui-fg-subtle mt-3 max-w-3xl leading-relaxed">
            {TEAM_INTRO}
          </p>
          <div className="grid grid-cols-1 xsmall:grid-cols-3 gap-6 mt-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-lg border border-ui-border-base bg-white overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-large-semi text-ui-fg-base">{member.name}</p>
                  <p className="text-small-regular text-ui-fg-subtle mt-1">
                    {member.position}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {member.socialLinks.map((social, index) => (
                      <a
                        key={`${member.name}-${social.name}-${index}`}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small-regular text-ui-fg-muted hover:text-ui-fg-base underline underline-offset-2"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className={sectionHeading}>Recent News</h2>
              <p className="text-small-regular text-ui-fg-subtle mt-2">
                Product guides, promotions and platform announcements.
              </p>
            </div>
            <LocalizedClientLink
              href="/company/news"
              className="text-small-regular text-ui-fg-subtle hover:text-ui-fg-base underline whitespace-nowrap"
            >
              View More
            </LocalizedClientLink>
          </div>

          <div className="grid grid-cols-1 small:grid-cols-3 gap-6 mt-8">
            {latestNews.map((article) => (
              <LocalizedClientLink
                key={article.url}
                href={`/company/news/${article.url}`}
                className="group rounded-lg border border-ui-border-base overflow-hidden flex flex-col hover:border-ui-fg-base transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-small-regular text-ui-fg-muted">
                    {formatDate(article.publishedAt)} · {article.author}
                  </p>
                  <h3 className="text-base-semi text-ui-fg-base mt-2 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-small-regular text-ui-fg-subtle mt-2 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      {/* Clients / Testimonials */}
      <section id="clients" className="bg-grey-5 border-y border-ui-border-base scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16">
          <h2 className={`${sectionHeading} text-center`}>WHAT PEOPLE SAY</h2>
          <div className="mt-8">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="relative bg-grey-90 text-white bg-cover bg-center"
        style={{
          backgroundImage: "url(https://images.toastduck.com/bg-image-8.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative max-w-[1440px] mx-auto px-4 small:px-6 py-14 small:py-20 text-center">
          <h2 className="text-2xl-semi small:text-3xl-semi max-w-3xl mx-auto leading-tight">
            {CONTACT_CTA.title}
          </h2>
          <a
            href="#contacts"
            className="inline-block rounded-full bg-white text-ui-fg-base px-6 py-3 text-small-regular font-medium mt-6 hover:bg-white/90 transition-colors"
          >
            {CONTACT_CTA.cta}
          </a>
        </div>
      </section>

      {/* Contact details and form */}
      <section id="contacts" className="scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16 grid grid-cols-1 small:grid-cols-12 gap-8">
          <div className="small:col-span-4">
            <h2 className={sectionHeading}>Contact Details</h2>
            <dl className="mt-5 space-y-4 text-small-regular">
              <div>
                <dt className="text-ui-fg-base font-medium">Address</dt>
                <dd className="text-ui-fg-subtle mt-1 leading-relaxed">
                  {COMPANY.address}
                </dd>
              </div>
              <div>
                <dt className="text-ui-fg-base font-medium">Whatsapp</dt>
                <dd className="mt-1">
                  <a
                    href={COMPANY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ui-fg-subtle hover:text-ui-fg-base underline"
                  >
                    {COMPANY.whatsappLabel}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ui-fg-base font-medium">E-mail</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-ui-fg-subtle hover:text-ui-fg-base underline"
                  >
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ui-fg-base font-medium">We are open</dt>
                <dd className="text-ui-fg-subtle mt-1">{COMPANY.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="small:col-span-8">
            <h2 className={sectionHeading}>Get in Touch</h2>
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-ui-border-base">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="420"
            className="border-0 block"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Toastduck International Business Co., Limited Location"
          />
        </div>
      </section>
    </div>
  )
}
