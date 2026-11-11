export type NewsArticle = {
  url: string
  title: string
  description: string
  urlToImage: string
  publishedAt: string
  author: string
  sourceName: string
  content: string
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    url: "4",
    author: "Technical Content Team",
    sourceName: "Knowledge Base",
    title: "What Is a Circuit Breaker? A Beginner's Guide",
    description:
      "A circuit breaker is an automatic electrical switch that protects circuits from overcurrent, overloads, and short circuits. Learn how it works, the common types, trip curves, and how it differs from a fuse.",
    urlToImage:
      "https://images.toastduck.com/circuit-breaker-cover-460x200.jpg",
    publishedAt: "2026-10-27T02:00:00.000Z",
    content: `<h2>What Is a Circuit Breaker?</h2><p>A <strong>circuit breaker</strong> is an essential automatic electrical switch designed to protect an electrical circuit from damage caused by <strong>overcurrent, overload, or a short circuit</strong>. Unlike a fuse, which operates once and then must be replaced, a circuit breaker can be <strong>reset</strong> (manually or automatically) to resume normal operation, making it the most common protection device in modern electrical panels.</p><h3>How Does It Work?</h3><p>At its core, a circuit breaker constantly monitors the current flowing through the circuit. When a fault is detected, its internal tripping mechanism instantly opens the contacts, interrupting the dangerous current flow before it can overheat wires, start a fire, or destroy connected equipment.</p><p>Most standard breakers use one or both of these trip principles:</p><ul><li><strong>Thermal trip (overload protection):</strong> A bimetallic strip heats up as current passes through it. Under a sustained overload, the strip bends enough to release the mechanism and open the contacts.</li><li><strong>Magnetic trip (short-circuit protection):</strong> A solenoid (electromagnet) generates a strong magnetic force during a sudden short circuit, instantly striking the trip mechanism to cut power.</li></ul><h3>Key Components</h3><ol><li><strong>Frame / Case:</strong> The insulated housing that contains and protects all internal parts.</li><li><strong>Contacts:</strong> The conductive points that open and close to make or break the circuit.</li><li><strong>Operating Mechanism:</strong> The toggle handle that lets you manually switch the breaker ON or OFF.</li><li><strong>Trip Unit:</strong> The sensing part (thermal and/or magnetic) that triggers disconnection on a fault.</li><li><strong>Arc Extinguishing Chamber:</strong> Extinguishes the electric arc formed when the contacts open, preventing damage and allowing safe re-closure.</li></ol><h3>Common Types of Circuit Breakers</h3><ul><li><strong>MCB (Miniature Circuit Breaker):</strong> Rated up to 125A, used in most residential and light commercial distribution panels.</li><li><strong>MCCB (Molded Case Circuit Breaker):</strong> Rated up to 1600A, with adjustable trip settings, used in heavier commercial and industrial loads.</li><li><strong>ACB (Air Circuit Breaker):</strong> High-capacity breakers (up to 6300A) used as the main incoming protection in low-voltage switchboards.</li><li><strong>VCB / SF6 Breaker:</strong> Used in medium- and high-voltage systems, extinguishing the arc in a vacuum or sulfur hexafluoride (SF6) gas.</li><li><strong>RCBO / RCD:</strong> Combine overload and short-circuit protection with residual-current (earth-leakage) protection for personal safety.</li></ul><h3>Reading the Trip Curve (B, C, D)</h3><p>The letter in a model number (for example, ABB S201-<strong>C</strong>63) tells you the magnetic trip threshold, which must match your load:</p><ul><li><strong>B curve:</strong> trips at 3\u20135\u00d7 rated current \u2014 for residential lighting and simple sockets.</li><li><strong>C curve:</strong> trips at 5\u201310\u00d7 rated current \u2014 for general commercial loads with moderate inrush, such as small motors.</li><li><strong>D curve:</strong> trips at 10\u201320\u00d7 rated current \u2014 for high inrush loads such as transformers and large motors.</li></ul><h3>Circuit Breaker vs. Fuse</h3><p>Both devices protect against overcurrent, but they differ in everyday use:</p><ul><li>A <strong>fuse</strong> melts once and must be replaced; a <strong>circuit breaker</strong> just needs to be flipped back on.</li><li>Fuses react faster and are cheaper upfront, but breakers are reusable, easier to diagnose, and standard in modern installations.</li></ul><h3>Why It Matters</h3><p>Circuit breakers are the first line of defense in every electrical panel. They prevent fires, protect appliances and machinery, and make power systems safer and easier to maintain. Choosing the correct current rating, trip curve, and breaking capacity for your load is the key to reliable, code-compliant protection.</p><p><em>Looking for genuine MCB / MCCB breakers from ABB, Schneider, Siemens, or Omron? Browse our catalog or contact our team for model selection support.</em></p>`,
  },
  {
    url: "3",
    author: "E-commerce Operations Manager",
    sourceName: "Official Promotion",
    title: "Flash Sale: ABB S201-C63 1P at Just $2.99!",
    description:
      "Limited time offer! Get the ABB S201-C63 1P miniature circuit breaker for only $2.99. Limited to 200 units on a first-come, first-served basis.",
    urlToImage:
      "https://images.toastduck.com/Gemini_Generated_Image_yc1uqsyc1uqsyc1u.jpg",
    publishedAt: "2026-09-15T06:00:00.000Z",
    content: `<img src="https://img20.360buyimg.com/vc/jfs/t1/25666/6/22014/20208/66bcbad0F53f85f1f/01a389f9f8b20e35.jpg.avif" style="width:100%;max-width:600px;padding-bottom: 1rem;" /><h2>Special Offer: ABB S201-C63 1P Circuit Breaker</h2><p>Upgrade your electrical safety with industry-leading reliability at an unbeatable price! We are offering a limited batch of genuine <strong>ABB S201-C63 1P</strong> miniature circuit breakers for just <strong>$2.99 each</strong>.</p><h3>Promotion Highlights:</h3><ul><li>Special Price: <strong>$2.99</strong> / unit</li><li>Quantity: Strictly limited to <strong>200 units</strong></li><li>Model: ABB S201-C63 (Single Pole / 63A / C-Curve)</li><li>Authentic quality with standard overload and short-circuit protection</li></ul><h3>How to Order:</h3><ol><li>Go to the product page and add ABB S201-C63 1P to your cart</li><li>The special price of $2.99 will automatically apply while supplies last</li><li>Proceed to checkout and select your preferred payment method</li><li>Complete payment to secure your order</li></ol><p><em>Available on a first-come, first-served basis while supplies last. Don't miss out!</em></p>`,
  },
  {
    url: "2",
    author: "E-commerce Operations Manager",
    sourceName: "Official Announcement",
    title: "WeChat Pay & Alipay Now Supported!",
    description:
      "Great news! We now officially support WeChat Pay and Alipay as payment methods. Enjoy a seamless checkout experience with your preferred Chinese payment platform.",
    urlToImage:
      "https://images.toastduck.com/Gemini_Generated_Image_thierothierothie.png",
    publishedAt: "2026-05-13T10:00:00.000Z",
    content: `<img src="https://images.toastduck.com/5\u670813\u65e5.gif"  style="width:100%;max-width:600px;padding-bottom: 1rem;" /><h2>WeChat Pay & Alipay Now Available!</h2><p>We are thrilled to announce that our platform now officially supports <strong>WeChat Pay (\u5fae\u4fe1\u652f\u4ed8)</strong> and <strong>Alipay (\u652f\u4ed8\u5b9d)</strong> as payment methods!</p><h3>What's New:</h3><ul><li>Pay with WeChat Pay directly at checkout</li><li>Pay with Alipay directly at checkout</li><li>Fast, secure, and convenient transactions</li><li>Supports both domestic and cross-border payments</li></ul><h3>How to Use:</h3><ol><li>Add items to your cart and proceed to checkout</li><li>Select WeChat Pay or Alipay as your payment method</li><li>Scan the QR code or confirm in your app</li><li>Payment confirmed \u2014 order placed instantly</li></ol><p>We are committed to providing more flexible payment options to serve our customers better. If you have any questions, please contact our customer support team.</p><p><em>Shop with ease, pay your way!</em></p>`,
  },
  {
    url: "1",
    author: "E-commerce Operations Manager",
    sourceName: "Official Announcement",
    title: "Mid-Year Sale is Here!",
    description:
      "To thank our valued customers, we are holding a grand mid-year promotion from April 16 to April 22, 2026. Enjoy up to 3% off on select products!",
    urlToImage:
      "https://images.toastduck.com/Gemini_Generated_Image_ooi6iiooi6iiooi6-01KPCQA4QYGD1F1S6S9ZBF58BY.png",
    publishedAt: "2026-04-16T08:00:00.000Z",
    content: `<h2>Mid-Year Sale</h2><img src="https://images.toastduck.com/mid-year%20big%20sales-01KPCQA4QZ85C03EWK7P96JCBX.png" alt="Mid-Year Sale Banner" style="width:100%;max-width:600px;" /><p><strong>Promotion Period:</strong> April 16, 2026 08:00:00 to April 22, 2026 08:00:00 (UTC)</p><p>During the sale, enjoy <strong>up to 3% off</strong> on select products! Popular items available for limited-time flash deals. Stack coupons for extra savings!</p><h3>Rules:</h3><ol><li>Orders placed during the promotion period are eligible</li><li>Limited stock - first come, first served</li><li>Store coupons can be combined with platform coupons</li><li>Final interpretation belongs to the company</li></ol><p><em>Shop now before it's gone!</em></p>`,
  },
]

export function getArticle(id: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.url === id)
}

export function formatDate(iso: string): string {
  return iso.split("T")[0]
}
