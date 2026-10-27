import { validateBrochure, validateBrochureEmail, validateBrochurePhone, type BrochureField } from "@/lib/brochure-validation";
import { useEffect,useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight,CheckCircle2,ChevronRight,Download,Home,MessageSquareText,Pause,Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductRangeDialog } from "@/components/product-range-dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMAIL,EnquiryForm,EnquiryDialog } from "@/components/enquiry";
import { describeType,formContent,getBrandLogo,getImageAlt,productPhotoShowcases,type Pillar,type SubCategory } from "@/lib/site-data";
import powerImg from "@/assets/power-transmission.jpg";import automationImg from "@/assets/automation.jpg";import adhesivesImg from "@/assets/adhesives.jpg";
import classicalImg from "@/assets/v-belts/classical-clean.jpg";import coggedImg from "@/assets/v-belts/cogged-clean.jpg";import bandedImg from "@/assets/v-belts/banded-clean.jpg";import narrowImg from "@/assets/v-belts/narrow-clean.jpg";
const images={power:powerImg,automation:automationImg,adhesives:adhesivesImg};
const vBeltPhotos=[{image:classicalImg,title:"Classical wrapped belts",note:"General-purpose wrapped profiles for dependable plant maintenance."},{image:coggedImg,title:"Raw-edge cogged belts",note:"Flexible profiles for compact drives and improved heat dissipation."},{image:bandedImg,title:"Banded drive systems",note:"Joined belts for vibration control and shock-loaded applications."},{image:narrowImg,title:"Narrow and variable-speed profiles",note:"Compact section options for high-power and adjustable-speed drives."}];
const formCategory=(key:string)=>key==="power-transmission"?"Power Transmission":key==="automation"?"Automation":"Adhesives";
const rangePhotos=(pillar:Pillar,sub:SubCategory)=>productPhotoShowcases[`${pillar.key}/${sub.slug}`] ?? (sub.slug==="v-belts"?vBeltPhotos:[{image:images[pillar.image],title:sub.name,note:sub.short}]);
export function Breadcrumbs({items}:{items:{label:string;to:string}[]}){return <section className="border-b border-border bg-background"><div className="site-container py-5"><nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2 text-sm font-semibold"><li><Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"><Home className="size-4"/>Home</Link></li>{items.map((item,index)=>{const current=index===items.length-1;return <li key={item.to} className="flex items-center gap-2"><ChevronRight className="size-4 text-muted-foreground/60"/>{current?<span aria-current="page" className="text-primary">{item.label}</span>:<a href={item.to} className="text-muted-foreground hover:text-primary">{item.label}</a>}</li>})}</ol></nav></div></section>}
export function PageHero({kicker,title,description,image,accent="brand",compact=false}:{kicker:string;title:string;description:string;image?:string;accent?:string;compact?:boolean}){
  return (
    <section className={`page-hero bg-foreground pattern-${accent} ${compact ? "page-hero-compact md:h-[300px]" : "page-hero-full"}`}>
      <div className="absolute inset-0 hidden bg-foreground/75 md:block" />
      {image && (
        <img
          src={image}
          alt={getImageAlt(image, `${kicker} industrial equipment`)}
          width={1408}
          height={912}
          className="h-auto w-full md:absolute md:inset-0 md:-z-10 md:size-full md:object-cover"
        />
      )}
      <div className={`site-container relative flex flex-col justify-center text-background md:h-full ${compact ? "py-6" : "py-8 md:py-28"}`}>
        <p className="eyebrow text-primary-soft">{kicker}</p>
        <h1 className={`mt-3 max-w-4xl font-black leading-tight ${compact ? "text-2xl sm:text-3xl md:text-4xl" : "text-4xl md:text-6xl"}`}>{title}</h1>
        <p className={`max-w-2xl text-background/80 ${compact ? "mt-3 text-sm leading-6 md:text-base md:leading-7" : "mt-6 text-lg leading-8"}`}>{description}</p>
      </div>
    </section>
  );
}
export function SectionHeading({eyebrow,title,text}:{eyebrow?:string;title:React.ReactNode;text?:string}){return <div className="mb-10 max-w-3xl">{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h2 className="section-title mt-3">{title}</h2>{text&&<p className="mt-4 text-lg leading-8 text-muted-foreground">{text}</p>}</div>}
export { PillarCards } from "@/components/division-cards";
export function BrandStrip({ brands }: { brands: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlaying(!motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 3000);
    return () => window.clearInterval(timer);
  }, [api, playing]);

  if (!brands.length) return null;
  // Extra slides keep short brand lists looping even with four tiles visible.
  const slides = brands.length > 4 ? brands : [...brands, ...brands, ...brands];
  const controlClass = "static size-9 translate-y-0 rounded-none border-background/25 bg-transparent text-background hover:bg-background hover:text-foreground";

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      setApi={setApi}
      className="brand-strip min-w-0"
      aria-label="Available brands"
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) setPlaying(false);
      }}
    >
      <CarouselContent className="ml-0 touch-pan-y" aria-live="off">
        {slides.map((brand, index) => {
          const logo = getBrandLogo(brand);
          return (
          <CarouselItem key={`${brand}-${index}`} className="basis-1/2 pl-0 sm:basis-1/3 lg:basis-1/4" aria-label={brand}>
            <div className="brand-tile">
              {logo ? <>
                <div className="brand-logo-frame">
                  <img src={logo.src} alt={`${brand} logo`} width={180} height={88} loading="lazy" decoding="async" draggable={false} style={{ objectFit: logo.fit ?? "contain", objectPosition: logo.position ?? "center", transform: logo.scale ? `scale(${logo.scale})` : undefined }} />
                </div>
                <span className="brand-tile-label">{brand}</span>
              </> : <span>{brand}</span>}
            </div>
          </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-3 flex justify-end gap-2">
        <CarouselPrevious className={controlClass} title="Previous brands" />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={controlClass}
          aria-label={playing ? "Pause automatic sliding" : "Start automatic sliding"}
          title={playing ? "Pause automatic sliding" : "Start automatic sliding"}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <CarouselNext className={controlClass} title="Next brands" />
      </div>
    </Carousel>
  );
}
export function CategoryGrid({pillar}:{pillar:Pillar}){const searchStr=useRouterState({select:state=>state.location.searchStr});const [selected,setSelected]=useState<SubCategory|null>(null);useEffect(()=>{if(pillar.key!=="power-transmission")return;const slug=new URLSearchParams(searchStr).get("product");setSelected(pillar.subcategories.find(sub=>sub.slug===slug)??null)},[pillar,searchStr]);const [enquiry,setEnquiry]=useState<SubCategory|null>(null);return <><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{pillar.subcategories.map((s,i)=><article className="category-card" key={s.slug}><span className="text-xs font-black text-category">0{i+1}</span><h3 className="mt-5 text-xl font-black"><button type="button" className="text-left hover:text-category focus-visible:outline-2 focus-visible:outline-category" onClick={()=>setSelected(s)}>{s.name}</button></h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{s.short}</p><div className="mt-6 flex flex-wrap gap-2"><Button type="button" size="sm" onClick={()=>setSelected(s)}>View range <ArrowRight/></Button><Button asChild variant="outline" size="sm"><a href={`/${pillar.key}/${s.slug}#enquire`}>Quick enquiry</a></Button></div></article>)}</div><ProductRangeDialog key={selected?.slug ?? "range"} pillar={pillar} sub={selected} photos={selected?rangePhotos(pillar,selected):[]} open={!!selected} onOpenChange={open=>!open&&setSelected(null)} onEnquire={sub=>{setSelected(null);setEnquiry(sub)}}/><EnquiryDialog open={!!enquiry} onOpenChange={open=>!open&&setEnquiry(null)} seed={{category:formCategory(pillar.key),requirement:enquiry?`${enquiry.name} requirement: `:""}}/></>}
const brochureSafe=(value:string)=>value.replace(/[^\w-]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase();
const pdfText=(value:string)=>value.replace(/[\\()]/g,"\\$&").replace(/[^\x20-\x7e]/g,"");
function downloadBrochurePdf(brand:string){
const lines=[brand,"RB International Belting & Automation","Power transmission, automation and industrial adhesive supply from Pune.","","This generated PDF placeholder confirms your download request.","The RBI team will share the latest official literature and selection support by email.","","Contact: response@rbibelting.in | +91 87881 95839"];
const streamLines=lines.map((line,index)=>`BT /F1 ${index===0?24:12} Tf 72 ${720-index*34} Td (${pdfText(line)}) Tj ET`).join("\n");
const objects=["<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>","<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",`<< /Length ${streamLines.length} >>\nstream\n${streamLines}\nendstream`];
let pdf="%PDF-1.4\n";const offsets=[0];objects.forEach((object,index)=>{offsets[index+1]=pdf.length;pdf+=`${index+1} 0 obj\n${object}\nendobj\n`});const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n${offsets.slice(1).map(offset=>`${String(offset).padStart(10,"0")} 00000 n `).join("\n")}\ntrailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
const url=URL.createObjectURL(new Blob([pdf],{type:"application/pdf"}));const link=document.createElement("a");link.href=url;link.download=`${brochureSafe(brand) || "rbi"}-product-information.pdf`;document.body.appendChild(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function BrochureRequestDialog({brand,open,onOpenChange}:{brand:string|null;open:boolean;onOpenChange:(open:boolean)=>void}){const [errors,setErrors]=useState<Partial<Record<BrochureField,string>>>({});
useEffect(()=>{setErrors({})},[open,brand]);if(!brand)return null;const submit=(form:HTMLFormElement)=>{const data=new FormData(form);const name=String(data.get("name")||"").trim();const phone=String(data.get("phone")||"").trim();const email=String(data.get("email")||"").trim();const company=String(data.get("company")||"").trim();const nextErrors=validateBrochure({name,phone,email,company});setErrors(nextErrors);const firstError=(Object.keys(nextErrors) as BrochureField[])[0];if(firstError){form.querySelector<HTMLInputElement>(`[name="${firstError}"]`)?.focus();return}const message=`PDF download request\nBrand: ${brand}\nName: ${name}\nCompany: ${company || "-"}\nPhone: ${phone}\nEmail: ${email}`;window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(`PDF request: ${brand}`)}&body=${encodeURIComponent(message)}`;window.setTimeout(()=>{downloadBrochurePdf(brand);onOpenChange(false)},700)};return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><p className="eyebrow">Download PDF</p><DialogTitle className="text-2xl">{brand}</DialogTitle><DialogDescription className="sr-only">Download the selected brand PDF.</DialogDescription></DialogHeader><form noValidate className="space-y-4" onSubmit={(event)=>{event.preventDefault();submit(event.currentTarget)}}><div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="br-name">Name *</Label><Input id="br-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name?"br-name-error":undefined} onChange={()=>setErrors(current=>{const next={...current};delete next.name;return next})} required maxLength={100} className="mt-1 h-12"/>{errors.name&&<p id="br-name-error" role="alert" className="mt-1 text-sm text-destructive">{errors.name}</p>}</div><div><Label htmlFor="br-company">Company</Label><Input id="br-company" name="company" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={errors.company?"br-company-error":undefined} onChange={()=>setErrors(current=>{const next={...current};delete next.company;return next})} maxLength={120} className="mt-1 h-12"/>{errors.company&&<p id="br-company-error" role="alert" className="mt-1 text-sm text-destructive">{errors.company}</p>}</div><div><Label htmlFor="br-phone">Phone *</Label><Input id="br-phone" name="phone" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone?"br-phone-error":undefined} onChange={event=>{const error=validateBrochurePhone(event.currentTarget.value);setErrors(current=>{const next={...current};if(error)next.phone=error;else delete next.phone;return next})}} onBlur={event=>{const error=validateBrochurePhone(event.currentTarget.value);setErrors(current=>{const next={...current};if(error)next.phone=error;else delete next.phone;return next})}} type="tel" inputMode="tel" required maxLength={20} className={`mt-1 h-12 ${errors.phone?"border-destructive focus-visible:ring-destructive":""}`}/><p id="br-phone-error" aria-live="polite" className={errors.phone?"mt-1 text-sm font-medium text-destructive":"sr-only"}>{errors.phone??""}</p></div><div><Label htmlFor="br-email">Email *</Label><Input id="br-email" name="email" onBlur={event=>{const email=event.currentTarget.value;const error=validateBrochureEmail(email);setErrors(current=>{const next={...current};if(error)next.email=error;else delete next.email;return next})}} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="br-email-error" onChange={event=>{const error=validateBrochureEmail(event.currentTarget.value);event.currentTarget.setCustomValidity(error??"");setErrors(current=>{const next={...current};if(error)next.email=error;else delete next.email;return next})}} type="email" inputMode="email" required maxLength={200} className={`mt-1 h-12 ${errors.email?"border-destructive focus-visible:ring-destructive":""}`}/><p id="br-email-error" aria-live="polite" aria-atomic="true" className={errors.email?"mt-1 text-sm font-medium text-destructive":"sr-only"}>{errors.email??""}</p></div></div><p className="text-xs leading-5 text-muted-foreground">{formContent.contactDisclaimer}</p><Button type="submit" size="lg" className="h-12 w-full"><Download/>Download PDF</Button></form></DialogContent></Dialog>}
export function BrochureGrid({brands}:{brands:string[]}){const [selected,setSelected]=useState<string|null>(null);return <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{brands.slice(0,8).map(b=><article key={b} className="border border-border bg-background p-5"><Download className="text-primary"/><h3 className="mt-5 text-lg font-black">{b}</h3><Button type="button" variant="outline" size="sm" className="mt-5" onClick={()=>setSelected(b)}>Download PDF</Button></article>)}</div><BrochureRequestDialog brand={selected} open={!!selected} onOpenChange={open=>!open&&setSelected(null)}/></>}
export function ProductTypes({pillar,sub,onQuote,onView}:{pillar:Pillar;sub:SubCategory;onQuote?:(name:string)=>void;onView?:(name:string)=>void}){return <div className="grid gap-4 md:grid-cols-2">{sub.types.map((t,i)=><article key={t} className="product-type"><div className="flex items-start justify-between gap-4"><span className="grid size-9 shrink-0 place-items-center bg-category text-sm font-black text-category-foreground">{String(i+1).padStart(2,"0")}</span><CheckCircle2 className="text-category"/></div><h3 className="mt-6 text-xl font-black">{t}</h3><p className="mt-3 leading-7 text-muted-foreground">{describeType(t)}</p>{onView?<Button className="mt-5" onClick={()=>onView(t)}>View range <ArrowRight/></Button>:onQuote&&<Button variant="outline" className="mt-5" onClick={()=>onQuote(t)}><MessageSquareText/>Request quote</Button>}</article>)}</div>}
export function EnquiryBand({title,category,requirement}:{title:string;category:string;requirement?:string}){return <section id="enquire" className="pattern-shared bg-muted py-16"><div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Technical enquiry</p><h2 className="section-title mt-3">{title}</h2><p className="mt-5 leading-7 text-muted-foreground">Share a part number, size, brand, drawing or application. Our team will help identify the right option.</p></div><div className="border border-border bg-background p-5 shadow-sm md:p-8"><EnquiryForm seed={requirement?{category,requirement}:{category}} compact/></div></div></section>}
export {images};
