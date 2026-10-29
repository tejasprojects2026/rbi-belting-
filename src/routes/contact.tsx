import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnquiryForm } from "@/components/enquiry";
import { PageHero } from "@/components/page-sections";
import { breadcrumbSchema, pageHead } from "@/lib/seo";
import { footerContact, formContent } from "@/lib/site-data";
import hero from "@/assets/factory-hero.jpg";

const local = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RB International Belting & Automation",
  telephone: ["+91 87881 95839", "+91 98909 61752"],
  email: "response@rbibelting.in",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate",
    addressLocality: "Pune",
    postalCode: "411026",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 09:30-18:30",
};

export const faqs = [
  {
    question: "What details should I share for a fast quotation?",
    answer:
      "Share the product type, brand preference, size or part number, quantity, machine application and delivery location. Photos of existing markings or drawings help our team identify the correct option faster.",
  },
  {
    question: "Do you supply outside Pune?",
    answer:
      "Yes. RB International supports customers across India and selected export requirements from our Bhosari, Pune base.",
  },
  {
    question: "Can you help if I do not know the exact product code?",
    answer:
      "Yes. Send the application, current product photo, size, pulley or machine details, and our team will help shortlist suitable belting, automation or adhesive options.",
  },
  {
    question: "Which product categories can I enquire about?",
    answer:
      "You can enquire for power transmission products, automation and motion control components, industrial adhesives, MRO chemicals and related maintenance requirements.",
  },
  {
    question: "How quickly will your team respond?",
    answer:
      "For working-hour enquiries, the team aims to respond quickly by phone, email or WhatsApp after reviewing the requirement details.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact RB International Belting & Automation, Pune",
      "Send your industrial belt, automation or adhesive requirement to RB International in Bhosari, Pune. Call, email or WhatsApp our sales team today.",
      "/contact",
      [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), local, faqSchema],
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        kicker="Send your requirement"
        title="Talk directly to our industrial supply team."
        description="Share the part number, brand, size, drawing or machine application. Choose email or WhatsApp to send your details."
        image={hero}
        compact
      />
      <section className="pattern-shared py-20">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div className="self-start border border-border bg-background p-6 md:p-8">
            <h2 className="text-3xl font-black">{formContent.generalTitle}</h2>
            <div className="mt-7">
              <EnquiryForm variant="general" />
            </div>
          </div>
          <aside className="space-y-4">
            <ContactItem Icon={MapPin} title="Visit us">
              Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate, Pune 411026
            </ContactItem>
            <ContactItem Icon={Phone} title="Call Sales">
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <a href="tel:+918788195839" className="whitespace-nowrap">+91 87881 95839</a>
                <span aria-hidden="true">/</span>
                <a href="tel:+919890961752" className="whitespace-nowrap">+91 98909 61752</a>
              </div>
            </ContactItem>
            <ContactItem Icon={Mail} title="Email">
              <a href="mailto:response@rbibelting.in">response@rbibelting.in</a>
              <br />
              <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
            </ContactItem>
            <ContactItem Icon={Clock} title="Working hours">
              Monday to Saturday
              <br />
              9:30 AM to 6:30 PM IST
            </ContactItem>
          </aside>
        </div>
      </section>
      <section className="pattern-shared bg-background py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-3">Before you send an enquiry</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Quick answers for product identification, dispatch and support from the RB International team.
            </p>
          </div>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-black hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

function ContactItem({ Icon, title, children }: { Icon: typeof MapPin; title: string; children: ReactNode }) {
  return (
    <div className="border border-border bg-background p-5">
      <Icon className="text-primary" />
      <h2 className="mt-3 font-black">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}
