import CompanyHeader from "@modules/company/components/site-header"
import CompanyFooter from "@modules/company/components/site-footer"
import WhatsAppFloat from "@modules/common/components/whatsapp-float"

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CompanyHeader />
      <main className="flex-1">{children}</main>
      <CompanyFooter />
      <WhatsAppFloat
        positionClass="right-[5px] bottom-[155px] z-20"
        testId="company-whatsapp-float"
      />
    </div>
  )
}
