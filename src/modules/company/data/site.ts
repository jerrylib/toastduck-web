export const COMPANY = {
  name: "Toastduck International Business Co., Limited",
  nameCn: "多士達國際商務有限公司",
  shortName: "Toastduck International",
  tagline:
    "Your trusted partner for industrial electrical components export worldwide.",
  description:
    "Toastduck International Business Co., Limited is a professional international business enterprise established in Hong Kong. We specialize in import and export services covering e-commerce, electronic components, hardware, clothing and footwear, bags and luggage, and sports equipment.",
  address:
    "RM B, UNIT 9, 7/F, WAH SHING CENTRE, NO.11 SHING YIP STREET, KWUN TONG, HONG KONG",
  whatsappLabel: "(+86) 17605010609",
  whatsappUrl: "https://wa.me/8617605010609",
  email: "ferrislee2024@163.com",
  hours: "Mn-Fr: 8 am-10 pm",
  logoBlack: "https://images.toastduck.com/toastduck_banner_3x_black.png",
  logoWhite: "https://images.toastduck.com/toastduck_banner_3x.png",
}

export const STORE_URL = "https://www.toastduck.com"

export const SOCIAL_LINKS = [
  { icon: "facebook", href: "https://www.facebook.com/share/1HX98Ym3K1/", name: "Facebook" },
  { icon: "twitter", href: "https://x.com/ferrislee911", name: "Twitter" },
  {
    icon: "linkedin",
    href: "https://www.linkedin.com/company/%E5%A4%9A%E5%A3%AB%E9%81%94%E5%9C%8B%E9%9A%9B%E5%95%86%E5%8B%99%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/?viewAsMember=true",
    name: "LinkedIn",
  },
  { icon: "youtube", href: "https://www.youtube.com/@ferris-gogogo", name: "YouTube" },
  { icon: "whatsapp", href: "https://wa.me/8617605010609", name: "WhatsApp" },
]

export const NAV_ITEMS = [
  { label: "Home", href: "/company/home", anchor: "home" },
  { label: "Store", href: "/store", external: true },
  { label: "Services", href: "/company/home", anchor: "services" },
  { label: "About", href: "/company/home", anchor: "about" },
  { label: "Portfolio", href: "/company/home", anchor: "gallery" },
  { label: "Team", href: "/company/home", anchor: "team" },
  { label: "News", href: "/company/news" },
  { label: "Clients", href: "/company/home", anchor: "clients" },
  { label: "Contacts", href: "/company/home", anchor: "contacts" },
]

export const HERO_SLIDES = [
  {
    type: "video" as const,
    title: "ABB & Schneider Electric Exporter",
    subtitle:
      "Your trusted partner for industrial electrical components export worldwide.",
    primaryCta: { label: "View Services", href: "#services" },
    secondaryCta: { label: "Get in Touch", href: "#contacts" },
  },
  {
    type: "image" as const,
    image: "https://images.toastduck.com/slide-1.jpg",
    title: "Premium Electrical Components Export",
    subtitle: "Authorized distributor of ABB and Schneider Electric products",
    primaryCta: { label: "View More", href: "#gallery" },
    secondaryCta: { label: "Contact Us", href: "#contacts" },
    align: "start" as const,
  },
  {
    type: "image" as const,
    image: "https://images.toastduck.com/slide-2.jpg",
    title: "Global Commerce",
    subtitle: "Reliable Export Solutions Since 2015",
    primaryCta: { label: "View Services", href: "#services" },
    secondaryCta: { label: "Get in Touch", href: "#contacts" },
    align: "center" as const,
  },
]

export const CTA_BAND = {
  text: "We are ready to help you source premium ABB & Schneider Electric components at competitive prices",
  cta: "Contact Us",
}

export const SERVICES = [
  {
    image: "https://images.toastduck.com/service-1-652x491.jpg",
    title: "ABB Products Export",
    description:
      "We specialize in exporting a wide range of ABB electrical components including circuit breakers, relays, contactors, and automation solutions.",
  },
  {
    image: "https://images.toastduck.com/service-2-652x491.jpg",
    title: "Schneider Electric Products",
    description:
      "Authorized exporter of Schneider Electric products including power distribution equipment, industrial automation, and building management systems.",
  },
  {
    image: "https://images.toastduck.com/service-3-652x491.jpg",
    title: "Global Shipping & Logistics",
    description:
      "End-to-end logistics support including international freight, customs clearance, and reliable delivery to over 50 countries worldwide.",
  },
]

export const ABOUT = {
  intro:
    "Welcome to Toastduck International Business Co., Limited, a professional international business enterprise established in Hong Kong. We specialize in import and export services covering e-commerce, electronic components, hardware, clothing and footwear, bags and luggage, and sports equipment. With extensive experience in global commerce and a strong network of suppliers and clients worldwide, we are your trusted partner for quality products and reliable service. Our commitment to quality, competitive pricing, and reliable delivery has made us a preferred partner for businesses across the globe.",
  scope: [
    "E-commerce Business",
    "Electronic Components Export",
    "Hardware Products",
    "Clothing, Footwear & Accessories",
    "Bags and Luggage",
    "Sports Equipment",
  ],
  features: [
    {
      title: "Global Business Expertise",
      description:
        "Years of experience in international business with streamlined customs and logistics procedures, serving clients worldwide.",
    },
    {
      title: "Competitive Pricing",
      description:
        "We offer factory-direct pricing on all products, ensuring the best value for your business needs.",
    },
    {
      title: "Quality Assurance",
      description:
        "Strict quality control processes to ensure all products meet international standards.",
    },
    {
      title: "Professional Support",
      description:
        "Dedicated customer service team providing professional consultation and after-sales support.",
    },
  ],
  image: "https://images.toastduck.com/blog-image-1-420x317.jpg",
  imageTitle: "Who We Are",
  imageCaption:
    "We are a professional international business enterprise based in Hong Kong, specializing in import and export of various consumer and industrial products.",
}

export const PRODUCTS = [
  { image: "https://images.toastduck.com/product1.webp", title: "ABB SACET1N160 series" },
  { image: "https://images.toastduck.com/product2.webp", title: "ABB Leakage circuit breaker" },
  { image: "https://images.toastduck.com/product3.webp", title: "ABB XT series" },
  { image: "https://images.toastduck.com/product4.webp", title: "Schneider Leakage circuit breaker" },
  { image: "https://images.toastduck.com/product5.webp", title: "ABB F200 series" },
  { image: "https://images.toastduck.com/product6.png", title: "Siemens series" },
]

export const TEAM = [
  {
    image: "https://images.toastduck.com/avator1.png",
    name: "Ferris",
    position: "CEO, Founder",
    socialLinks: [
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61572340576005" },
      ...SOCIAL_LINKS.filter((s) => s.name !== "Facebook"),
    ],
  },
  {
    image: "https://images.toastduck.com/avator3.png",
    name: "Jenny",
    position: "E-commerce Operations Manager",
    socialLinks: [
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100092165776596" },
      { name: "WhatsApp", href: "https://wa.me/8613720881796" },
    ],
  },
  {
    image: "https://images.toastduck.com/avator2.jpg",
    name: "Cassie",
    position: "Marketing Manager",
    socialLinks: [
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61588692832933" },
      { name: "Facebook", href: "https://www.facebook.com/share/1GdhtaFmfF/?mibextid=wwXIfr" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/cassie-huang-791537323/" },
      { name: "WhatsApp", href: "https://wa.me/8613859190905" },
    ],
  },
]

export const TEAM_INTRO =
  "We are a team of professionals from different backgrounds who share knowledge and expertise in business consulting aiming to provide professional services and support to our clients to the highest standards."

export const BRANDS = [
  { image: "https://images.toastduck.com/company-1-126x102.png", name: "Brand 1" },
  { image: "https://images.toastduck.com/company-2-134x102.png", name: "Brand 2" },
  { image: "https://images.toastduck.com/company-3-132x102.png", name: "Brand 3" },
  { image: "https://images.toastduck.com/company-4-126x102.png", name: "Brand 4" },
  { image: "https://images.toastduck.com/company-5-138x102.png", name: "Brand 5" },
  { image: "https://images.toastduck.com/company-6-143x102.png", name: "Brand 6" },
]

export const TESTIMONIALS = [
  {
    text: "My cooperation with your team helped me understand that you really care about your clients - it has already been proven by a lot of positive reviews - and that's why I chose you. Your reliable solutions helped me improve my business plan in no time!",
    author: "Jane Smith",
    position: "Customer",
    image: "https://images.toastduck.com/testimonials-1-120x120.jpg",
  },
  {
    text: "Working with Toastduck has been an exceptional experience. Their professional approach and attention to detail helped us achieve our business goals faster than we expected. Highly recommended!",
    author: "Michael Johnson",
    position: "CEO, Tech Solutions",
    image: "https://images.toastduck.com/testimonials-2-120x120.jpg",
  },
  {
    text: "The quality of products and services provided by Toastduck is outstanding. They have been our trusted partner for over two years, and we couldn't be happier with the results.",
    author: "Sarah Wilson",
    position: "Operations Manager",
    image: "https://images.toastduck.com/testimonials-3-120x120.jpg",
  },
]

export const CONTACT_CTA = {
  title:
    "Get high-quality ABB & Schneider Electric components for your projects!",
  cta: "Contact Us",
}

export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xqeyzqze"

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.568578572536!2d114.22453207696954!3d22.310651976554595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404014550f6a08d%3A0x79b6c25484e016e3!2z5Y2O5oiQ5bel5ZWG5Lit5b-D!5e0!3m2!1szh-CN!2s!4v1774597081958!5m2!1szh-CN!2s"

export const QUICK_LINKS = [
  { text: "Privacy Policy", href: "#" },
  { text: "Terms of Service", href: "#" },
  { text: "Support", href: "#" },
  { text: "FAQ", href: "#" },
]
