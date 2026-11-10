import LocalizedClientLink from "@modules/common/components/localized-client-link"

const COMPANY_NAME = "Toastduck International Business Co., Limited"
const COMPANY_NAME_CN = "多士達國際商務有限公司"
const COMPANY_WEBSITE = "https://company.toastduck.com"
const COMPANY_NEWS = "https://company.toastduck.com/news"

const WHATSAPP_NUMBER = "+86 176 0501 0609"
const WHATSAPP_URL = "https://wa.me/8617605010609"
const CONTACT_EMAIL = "ferrislee2024@163.com"
const COMPANY_ADDRESS =
  "RM B, Unit 9, 7/F, Wah Shing Centre, No.11 Shing Yip Street, Kwun Tong, Hong Kong"
const BUSINESS_HOURS = "Mon – Fri, 8:00 – 22:00 (HKT)"

const stats = [
  { value: "2015", label: "Established in Hong Kong" },
  { value: "50+", label: "Countries served" },
  { value: "6", label: "Business lines" },
  { value: "ABB · Schneider", label: "Core electrical brands" },
]

const businessScope = [
  {
    title: "E-commerce Business",
    text: "Cross-border online retail and marketplace operations, from product sourcing to fulfilment.",
  },
  {
    title: "Electronic Components Export",
    text: "Circuit breakers, contactors, relays, PLCs, drives and automation parts for industrial buyers.",
  },
  {
    title: "Hardware Products",
    text: "Tools, fasteners and general hardware sourced from vetted factories and trading partners.",
  },
  {
    title: "Clothing, Footwear & Accessories",
    text: "Apparel and footwear supply for wholesale, retail and private-label programmes.",
  },
  {
    title: "Bags and Luggage",
    text: "Travel bags, backpacks and cases produced to buyer specifications and destination standards.",
  },
  {
    title: "Sports Equipment",
    text: "Fitness and outdoor equipment for distributors, clubs and retail chains.",
  },
]

const advantages = [
  {
    title: "Global business expertise",
    text: "Years of experience in international trade with streamlined customs and logistics procedures, serving clients worldwide.",
  },
  {
    title: "Competitive pricing",
    text: "Factory-direct pricing across our product lines, so your projects stay within budget.",
  },
  {
    title: "Quality assurance",
    text: "Strict quality control before shipment, with products meeting the certifications required by destination markets.",
  },
  {
    title: "Professional support",
    text: "A dedicated team for consultation, documentation and after-sales follow-up in English and Chinese.",
  },
]

const team = [
  { name: "Ferris", role: "CEO, Founder" },
  { name: "Jenny", role: "E-commerce Operations Manager" },
  { name: "Cassie", role: "Marketing Manager" },
]

const news = [
  {
    title: "What Is a Circuit Breaker? A Beginner's Guide",
    date: "2026-10-27",
    summary:
      "How a circuit breaker protects circuits from overcurrent, overloads and short circuits, the common types and trip curves.",
  },
  {
    title: "Flash Sale: ABB S201-C63 1P at Just $2.99!",
    date: "2026-09-15",
    summary:
      "Limited-time offer on the ABB S201-C63 single-pole miniature circuit breaker, limited to 200 units.",
  },
  {
    title: "WeChat Pay & Alipay Now Supported!",
    date: "2026-05-13",
    summary:
      "Chinese payment platforms are now available at checkout for customers paying in CNY.",
  },
]

export default function CompanyTemplate() {
  return (
    <div className="content-container py-10" data-testid="company-page">
      {/* Hero */}
      <section className="border-b border-ui-border-base pb-8 mb-10">
        <p className="text-small-regular uppercase tracking-wide text-ui-fg-muted">
          Company
        </p>
        <h1 className="text-2xl-semi mt-2" data-testid="company-title">
          {COMPANY_NAME}
        </h1>
        <p className="text-small-regular text-ui-fg-subtle mt-1">
          {COMPANY_NAME_CN}
        </p>
        <p className="text-base-regular text-ui-fg-subtle mt-4 max-w-3xl">
          Your trusted partner for industrial electrical components and
          international trade — importing and exporting ABB &amp; Schneider
          Electric products, hardware, apparel and sports equipment from Hong
          Kong to customers worldwide.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <LocalizedClientLink
            href="/store"
            className="rounded-full border border-ui-fg-base bg-ui-fg-base px-4 py-2 text-small-regular text-white"
          >
            Browse products
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/price-list"
            className="rounded-full border border-ui-border-base px-4 py-2 text-small-regular text-ui-fg-base hover:border-ui-fg-base"
          >
            View RMB price list
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/company/home"
            className="rounded-full border border-ui-border-base px-4 py-2 text-small-regular text-ui-fg-base hover:border-ui-fg-base"
            data-testid="company-full-site-link"
          >
            Company site
          </LocalizedClientLink>
        </div>
      </section>

      {/* Stats */}
      <section
        className="grid grid-cols-2 small:grid-cols-4 gap-4 mb-12"
        data-testid="company-stats"
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-ui-border-base px-4 py-5"
          >
            <p className="text-large-semi text-ui-fg-base">{item.value}</p>
            <p className="text-small-regular text-ui-fg-subtle mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="mb-12 max-w-3xl" data-testid="company-about">
        <h2 className="text-xl-semi mb-4">About us</h2>
        <p className="text-base-regular text-ui-fg-subtle">
          Toastduck International Business Co., Limited is a professional
          international business enterprise established in Hong Kong. We
          specialise in import and export services covering e-commerce,
          electronic components, hardware, clothing and footwear, bags and
          luggage, and sports equipment. With extensive experience in global
          commerce and a strong network of suppliers and clients worldwide, we
          are your trusted partner for quality products and reliable service.
        </p>
        <p className="text-base-regular text-ui-fg-subtle mt-4">
          On the industrial side we focus on ABB and Schneider Electric circuit
          breakers, contactors, relays, PLCs and drives — supplied to
          contractors, panel builders, distributors and maintenance teams who
          need genuine parts with clear documentation and predictable lead
          times.
        </p>
      </section>

      {/* Business scope */}
      <section className="mb-12" data-testid="company-scope">
        <h2 className="text-xl-semi mb-4">Our business scope</h2>
        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          {businessScope.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-ui-border-base px-5 py-4"
            >
              <p className="text-base-semi">{item.title}</p>
              <p className="text-small-regular text-ui-fg-subtle mt-1">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mb-12" data-testid="company-advantages">
        <h2 className="text-xl-semi mb-4">Why choose us</h2>
        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-ui-border-base px-5 py-4"
            >
              <p className="text-base-semi">{item.title}</p>
              <p className="text-small-regular text-ui-fg-subtle mt-1">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-12" data-testid="company-team">
        <h2 className="text-xl-semi mb-4">Our team</h2>
        <p className="text-small-regular text-ui-fg-subtle max-w-3xl mb-4">
          A team of professionals from different backgrounds who share
          knowledge and expertise in international trade, supporting clients to
          the highest standards.
        </p>
        <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-lg border border-ui-border-base px-5 py-4"
            >
              <p className="text-base-semi">{member.name}</p>
              <p className="text-small-regular text-ui-fg-subtle mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        className="rounded-lg border border-ui-border-base px-5 py-6 small:px-8 small:py-8 mb-12"
        data-testid="company-contact"
      >
        <h2 className="text-xl-semi mb-4">Contact us</h2>
        <dl className="grid grid-cols-1 small:grid-cols-2 gap-x-8 gap-y-4 text-small-regular">
          <div>
            <dt className="text-ui-fg-base txt-small-plus">Address</dt>
            <dd className="text-ui-fg-subtle mt-1">{COMPANY_ADDRESS}</dd>
          </div>
          <div>
            <dt className="text-ui-fg-base txt-small-plus">Business hours</dt>
            <dd className="text-ui-fg-subtle mt-1">{BUSINESS_HOURS}</dd>
          </div>
          <div>
            <dt className="text-ui-fg-base txt-small-plus">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ui-fg-subtle hover:text-ui-fg-base underline"
                data-testid="company-whatsapp"
              >
                {WHATSAPP_NUMBER}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-ui-fg-base txt-small-plus">E-mail</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-ui-fg-subtle hover:text-ui-fg-base underline"
                data-testid="company-email"
              >
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* News */}
      <section className="mb-6" data-testid="company-news">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h2 className="text-xl-semi">Latest news</h2>
          <a
            href={COMPANY_NEWS}
            target="_blank"
            rel="noopener noreferrer"
            className="text-small-regular text-ui-fg-subtle hover:text-ui-fg-base underline"
          >
            All news
          </a>
        </div>
        <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
          {news.map((item) => (
            <a
              key={item.title}
              href={COMPANY_NEWS}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-ui-border-base px-5 py-4 hover:border-ui-fg-base transition-colors"
            >
              <p className="text-small-regular text-ui-fg-muted">{item.date}</p>
              <p className="text-base-semi mt-1">{item.title}</p>
              <p className="text-small-regular text-ui-fg-subtle mt-2">
                {item.summary}
              </p>
            </a>
          ))}
        </div>
      </section>

      <p className="text-small-regular text-ui-fg-muted">
        More about the company at{" "}
        <a
          href={COMPANY_WEBSITE}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ui-fg-base"
        >
          company.toastduck.com
        </a>
        .
      </p>
    </div>
  )
}
