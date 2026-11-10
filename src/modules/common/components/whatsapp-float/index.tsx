/**
 * Floating WhatsApp shortcuts, shared by the store chrome and the company
 * pages. Same numbers, size and colors as the original company site
 * (App.jsx WhatsappButton x2 + App.css .ui-to-top-whatsapp).
 */

const DEFAULT_NUMBERS = ["8613459831691", "8613859190905"]

export function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path
        d="M16.5 14.5s-1.5 1-2.5 0-3-2-3-3 1-2.5 1-2.5-.5-1.5-1.5-1.5c-1.2 0-2 .8-2 2 0 2.5 4 6.5 6.5 6.5 1.2 0 2-.8 2-2 0-1-1.5-1.5-1.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

type WhatsAppFloatProps = {
  numbers?: string[]
  /** Positioning classes, so each layout can place the stack where it belongs. */
  positionClass?: string
  testId?: string
}

export default function WhatsAppFloat({
  numbers = DEFAULT_NUMBERS,
  positionClass = "right-[5px] top-1/2 -translate-y-1/2 z-50",
  testId = "whatsapp-float",
}: WhatsAppFloatProps) {
  return (
    <div
      className={`fixed ${positionClass} flex flex-col gap-[5px]`}
      data-testid={testId}
    >
      {numbers.map((number) => (
        <a
          key={number}
          href={`https://wa.me/${number}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp: ${number}`}
          title={`Chat on WhatsApp: ${number}`}
          data-testid={`${testId}-${number}`}
          className="w-[50px] h-[50px] flex items-center justify-center bg-[rgb(33,192,99)] text-white transition-colors duration-300 hover:bg-[rgba(33,192,99,0.69)]"
        >
          <WhatsAppIcon />
        </a>
      ))}
    </div>
  )
}
