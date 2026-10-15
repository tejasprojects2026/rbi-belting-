export type PillarKey = "power-transmission" | "automation" | "adhesives";
export const footerContact = { email: "sales@rbcorp.in", gst: "27AAHFR3595G1ZU" };
export const companyHistory = {
  eyebrow: "Milestones",
  title: "From a belting shop to three industrial divisions",
  description: "The timeline below contains approximate milestones and will be confirmed before final publication.",
  milestones: [
    { year: "2003", description: "Founded in Bhosari, Pune as a belting supply firm." },
    { year: "2006", description: "Built authorized dealer relationships with major belting brands." },
    { year: "2010", description: "Expanded into industrial adhesives through RB Adhesive Company." },
    { year: "2014", description: "Added automation and motion control products." },
    { year: "2018", description: "Crossed 300 active client accounts across Maharashtra." },
    { year: "2020", description: "Expanded service to PAN India and international markets." },
    { year: "2023", description: "Completed 20 years with 500+ active clients and 50+ brand relationships." },
  ],
} as const;
export const brochureContent = {
  description: "Share your details to request the latest product brochure.",
};
export const productRangeContent = {
  typesTitle: "Available product types",
  applicationsTitle: "Applications",
  brandsTitle: "Available brands",
  quoteTitle: "For faster quotation",
  quoteDetails: [
    "Existing size, marking or part number",
    "Preferred brand or equivalent options",
    "Quantity, application and machine type",
    "Delivery location and urgency",
  ],
  benefits: ["Genuine brands", "Selection support", "PAN India supply"],
  enquiryHint: "Share your requirement for selection and pricing.",
  enquiryLabel: "Enquire now",
};
export const upcomingRange = {
  eyebrow: "Coming soon",
  title: "RB International: our own range",
  description: "We are developing our own line of automation components and select belting products. Register interest with our team.",
  linkLabel: "Register interest",
  href: "/contact",
  detailsTitle: "What we're developing",
  focusAreas: [
    {
      title: "Automation components",
      description: "A planned range for machinery and motion control applications.",
    },
    {
      title: "Selected belting products",
      description: "Belting options for industrial equipment and maintenance needs.",
    },
  ],
  interestTitle: "Help shape the range",
  interestDescription: "Share your application, required sizes and expected quantities when you register your interest.",
};
type BrandLogo = { src: string; fit?: "contain" | "cover"; position?: string; scale?: number };
export const brandLogos: Record<string, BrandLogo> = {
  "Gates": { src: "/brand-logos/gates.svg" },
  "Fenner": { src: "/brand-logos/fenner.png" },
  "PIX": { src: "/brand-logos/pix.png", fit: "cover", position: "center 55%" },
  "Pidilite": { src: "/brand-logos/pidilite.avif" },
  "Optibelt": { src: "/brand-logos/optibelt.jpeg" },
  "Goodyear": { src: "/brand-logos/goodyear.png" },
  "Continental ContiTech": { src: "/brand-logos/continental-contitech.png" },
  "Megadyne": { src: "/brand-logos/megadyne.png", fit: "cover" },
  "Carlisle": { src: "/brand-logos/carlisle.jpg" },
  "Hutchinson": { src: "/brand-logos/hutchinson.jpg", fit: "cover" },
  "Mitsuboshi": { src: "/brand-logos/mitsuboshi.png" },
  "Polymaxx": { src: "/brand-logos/polymaxx.png" },
  "Loctite": { src: "/brand-logos/loctite.png", fit: "cover" },
  "3M": { src: "/brand-logos/3m.png", fit: "cover" },
  "Anabond": { src: "/brand-logos/anabond.png", fit: "cover", position: "center 40%" },
  "Araldite": { src: "/brand-logos/araldite.jpeg", fit: "cover" },
  "Amico": { src: "/brand-logos/amico.jpg" },
  "Speb 7": { src: "/brand-logos/speb7.png", fit: "cover" },
  "WD-40": { src: "/brand-logos/wd40.avif" },
  "Arofine Polymers": { src: "/brand-logos/arofine-polymers.png", fit: "cover" },
  "SAV Chemicals": { src: "/brand-logos/sav-chemicals.png", fit: "cover" },
  "Atul": { src: "/brand-logos/atul.svg" },
  "Metlok": { src: "/brand-logos/metlok.jpeg", fit: "cover", position: "center 45%" },
  "Bondtite": { src: "/brand-logos/bondtite.webp", fit: "cover" },
  "Dr. Fixit": { src: "/brand-logos/dr-fixit.png" },
  "Fevicol": { src: "/brand-logos/fevicol.jpg", fit: "cover" },
  "Ecodrive": { src: "/brand-logos/ecodrive.png" },
  "Lapox": { src: "/brand-logos/lapox.png", fit: "cover" },
  "Lord Adhesive": { src: "/brand-logos/lord.webp", fit: "cover" },
  "M-Seal": { src: "/brand-logos/m-seal.jpg" },
  "MxBon": { src: "/brand-logos/mxbon.png" },
  "Polygrip": { src: "/brand-logos/polygrip.webp", fit: "cover" },
  "Bando": { src: "/brand-logos/bando.png", fit: "cover" },
  "Nitta": { src: "/brand-logos/nitta.png" },
  "Habasit": { src: "/brand-logos/habasit.png", scale: 1.65 },
  "TOCO": { src: "/brand-logos/toco-transparent.png" },
  "THK": { src: "/brand-logos/thk.png", fit: "cover" },
  "HIWIN": { src: "/brand-logos/hiwin.png" },
  "Rexroth": { src: "/brand-logos/rexroth.png" },
};
const brandLogoAliases: Record<string, string> = {
  "Goodyear Eagle NRG": "Goodyear",
  "Pidilite IBS": "Pidilite",
  "Bond Tide": "Bondtite",
};
export const logoBrands = Object.keys(brandLogos);
export const dealerRelationships = {
  eyebrow: "Dealer relationships",
  title: "Authorized dealers and distributors",
  brands: ["Gates", "Fenner", "PIX", "Pidilite"],
  certificateLabel: "Authorized Dealer Certificate",
  certificateNote: "Certificate image and start year placeholder.",
};
export const getBrandLogo = (brand: string) => brandLogos[brandLogoAliases[brand] ?? brand];
export const justdialReviews = {
  title: "Customer reviews",
  description: "Customer feedback on our products and service.",
  invitationTitle: "Share your experience",
  source: "Justdial",
  scriptSrc: "https://www.justdial.com/Jd-Widget",
  badgeStyle: "b1",
  badgeCode: "Y3RyY3QlNDAlNDAlNDAwMjBQWFgyMCUyQlhYMjAlMkIxNzAxMDcxNjQ1NTUlMkJUNUQ0",
  listingUrl: "https://www.justdial.com/Pune/R-B-International-Belting-Nr-Hotel-Sai-Palace-Bhosari-Industrial-Estate/020PXX20-XX20-170107164555-T5D4_BZDET",
  linkLabel: "Read reviews",
  linkAccessibleLabel: "Read reviews on Justdial",
  reviewCount: 483,
  reviewCountLabel: "reviews",
  loadingText: "Loading Justdial reviews...",
  unavailableText: "Read our customer reviews directly on Justdial.",
};
export const reviewPlatforms = [
  {
    id: "justdial",
    source: justdialReviews.source,
    title: justdialReviews.title,
    description: justdialReviews.description,
    listingUrl: justdialReviews.listingUrl,
    linkLabel: justdialReviews.linkLabel,
    linkAccessibleLabel: justdialReviews.linkAccessibleLabel,
  },
  {
    id: "google",
    source: "Google",
    title: "Customer reviews",
    description: "Read customer feedback and share your experience on Google.",
    listingUrl: "https://maps.app.goo.gl/v51wGZH4o8cT1e3D8",
    linkLabel: "Read reviews",
    linkAccessibleLabel: "View RB International on Google Maps",
  },
  {
    id: "indiamart",
    source: "IndiaMART",
    title: "Products & enquiries",
    description: "Explore our industrial products and connect with us on IndiaMART.",
    listingUrl: "https://m.indiamart.com/r-btraders-pune/profile.html",
    linkLabel: "View profile",
    linkAccessibleLabel: "View our business profile on IndiaMART",
  },
] as const;
export type SubCategory = { slug: string; name: string; short: string; types: string[]; brands: string[]; applications: string };
export type Pillar = { key: PillarKey; name: string; kicker: string; description: string; image: "power" | "automation" | "adhesives"; subcategories: SubCategory[]; brands: string[] };
const typeDescriptions: Record<string,string> = {
  "Classical V-Belts":"Standard A, B, C, D and E section belts for dependable general industrial drives.",
  "Narrow V-Belts":"SPA, SPB, SPC and SPZ profiles for compact, high-power drive systems.",
  "Micro V-Belts":"Multi-rib PJ, PK, PL and PM series for precision and light-duty equipment.",
  "Variable Speed Belts":"Wide-angle belts for variable speed drives in textile, packaging and processing machines.",
  "Link/Nutlink V-Belts":"Adjustable belts cut to length on site to reduce replacement downtime.",
  "Cogged V-Belts":"Flexible, heat-dissipating belts for high-speed and high-load applications.",
};
export const describeType=(name:string)=>typeDescriptions[name] ?? `${name} for industrial equipment, replacement, maintenance and new machine builds. Ask our team for brand, size and application guidance.`;
const sub=(slug:string,name:string,short:string,types:string[],brands:string[],applications:string):SubCategory=>({slug,name,short,types,brands,applications});
export const pillars: Record<PillarKey,Pillar> = {
 "power-transmission": { key:"power-transmission",name:"Power Transmission",kicker:"Belts & Drives",image:"power",description:"Belts, pulleys, couplings and tools that keep production lines moving, from one-off replacements to complete drive packages.",brands:["Fenner","Gates","Optibelt","Goodyear Eagle NRG","Continental ContiTech","Megadyne","Carlisle","PIX","Hutchinson","Mitsubishi","Polymaxx"],subcategories:[
  sub("v-belts","V-Belts","Classical, narrow, cogged, banded and variable speed V-belts for industrial drives.",["Classical V-Belts","Narrow V-Belts","Micro V-Belts","Banded V-Belts","Variable Speed Belts","Link/Nutlink V-Belts","Cogged V-Belts"],["Fenner","Gates","Optibelt","PIX","Continental ContiTech","Carlisle","Hutchinson","Goodyear"],"compressors, pumps, fans, machine tools, textile machinery and production equipment"),
  sub("timing-belts","Timing Belts","Rubber, PU, coated and carbon-fibre synchronous belts for accurate power transfer.",["Rubber Timing Belts","PU Timing Belts","PU Coated Timing Belts","Eagle PD Timing Belts","Gates Polychain GT Carbon","Gates Polyflex JB","HTD Belts","Special Timing Belts"],["Gates","Megadyne","Optibelt","Continental ContiTech","Goodyear"],"packaging machines, robotics, printing presses, conveyors and precision positioning systems"),
  sub("conveyor-belts","Conveyor Belts","PU, PVC, modular, rubber and food-grade belts for material movement.",["PU Conveyor Belts","PVC Conveyor Belts","Food Grade Belts","Plastic Modular Belts","Steel Modular Belts","Rubber Conveyor Belts","Elevator/Lift Belts","Vacuum Belts"],["Megadyne","Habasit","Polymaxx","Continental ContiTech"],"food processing, packaging, logistics, pharmaceuticals, mining and general manufacturing"),
  sub("flat-belts","Flat Belts","High-efficiency flat transmission, steel cord, round PU and woven belts.",["Flat Transmission Belts","Steel Cord Flat Belts","Round PU Cords/Belts","Woven Belts"],["Megadyne","Hutchinson","Polymaxx"],"textile machinery, printing, paper conversion, light conveyors and high-speed drives"),
  sub("pulleys-and-bushes","Pulleys & Bushes","Precision timing and V-pulleys with taper lock and keyless bushes.",["Timing Pulleys","CI Timing Pulleys","V-Pulleys","Taper Lock Bushes","Keyless Bushes"],["Fenner","Gates","PIX"],"drive assemblies, machine upgrades, conveyors and OEM equipment"),
  sub("couplings","Couplings","Flexible, servo and encoder couplings for reliable shaft connection.",["Eurogrip Flexible Couplings","Servo Couplings","Encoder Couplings"],["Gates","Fenner","Polymaxx"],"motors, pumps, encoders, servo axes and industrial drive trains"),
  sub("accessories","Accessories & Tools","Tension testers, maintenance tools, cleaners and rust preventives.",["Belt Tension Testers","Maintenance Tools","Rust Preventives & Cleaners"],["Gates","Fenner","WD-40","CRC"],"preventive maintenance, belt installation and plant reliability work") ]},
 automation:{key:"automation",name:"Automation & Motion Control",kicker:"Precision components",image:"automation",description:"Linear motion, robotics, motors and controllers for machine builders and production teams upgrading speed, accuracy and repeatability.",brands:["Gates","Megadyne","Polymaxx","Mitsubishi"],subcategories:[
  sub("linear-motion","Linear Motion Systems","Ball screws, guideways, shafts and rack systems for accurate movement.",["Ball Screws","Ball Screw Support Units","Linear Guideways","Linear Shafts","Racks & Pinions"],["Mitsubishi","Polymaxx"],"CNC machines, packaging lines, pick-and-place systems and machine automation"),
  sub("robotics","Robotics & Actuators","Gantry robots, XYTH systems and mono stages for automated handling.",["Gantry Robots/Actuators","XYTH Series","Mono Stage Systems"],["Mitsubishi","Polymaxx"],"assembly, dispensing, inspection, palletising and material handling"),
  sub("motors-and-drives","Motors & Drives","Servo, stepper and precision gearbox solutions for controlled motion.",["Servo Motors & Drives","Stepper Motors","Gearbox PAB/PPG/PPGA Series"],["Mitsubishi","Polymaxx"],"machine axes, conveyors, indexing systems and production automation"),
  sub("controllers","Controllers","CNC and DSP controllers for coordinated industrial machine control.",["CNC Controllers","DSP Controllers"],["Mitsubishi","Polymaxx"],"CNC equipment, custom machinery and multi-axis motion systems") ]},
 adhesives:{key:"adhesives",name:"Industrial Adhesives & Chemicals",kicker:"RB Adhesive Company",image:"adhesives",description:"A complete MRO range covering threadlocking, sealing, structural bonding, tapes, cleaners and specialty maintenance chemicals.",brands:["Pidilite","Loctite","3M","Anabond","Araldite","Amico","Polymaxx","Speb 7","WD-40","Arofine Polymers","SAV Chemicals","Atul","Metlok"],subcategories:[
  sub("threadlockers","Threadlockers & Retaining Compounds","Lock fasteners and secure cylindrical assemblies against vibration.",["Medium Strength Threadlockers","High Strength Threadlockers","Bearing Retainers","Flange Sealants"],["Loctite","Anabond","3M"],"gearboxes, motors, pumps, automotive assemblies and maintenance repair"),
  sub("sealants","Silicone Sealants & Gasket Makers","Flexible sealing and formed-in-place gasketing for industrial assemblies.",["RTV Silicone Sealants","Gasket Makers","High Temperature Sealants"],["Boss Silicone","Anabond","Polymaxx"],"flanges, engine covers, electrical enclosures and industrial maintenance"),
  sub("structural","Structural & Epoxy Adhesives","High-strength bonding for metal, composite, plastic and repair work.",["Two-Part Epoxies","Structural Acrylics","Metal Repair Compounds","Industrial Bonding Adhesives"],["Araldite","Lapox","Loctite","Lord Adhesive","Bond Tide","Metlok","MxBon"],"fabrication, automotive parts, machine repair and product assembly"),
  sub("general-purpose","General Purpose & Wood Adhesives","Reliable bonding products for wood, maintenance and rapid repairs.",["Wood Adhesives","Instant Adhesives","Construction Chemicals","Contact Adhesives"],["Fevicol","Pidilite IBS","Fevi Kwik","Dr. Fixit","Polygrip"],"woodwork, fixtures, packaging, repair shops and factory maintenance"),
  sub("specialty","Specialty Chemicals & MRO","Cleaners, lubricants, rust preventives, putties and maintenance products.",["Penetrating Lubricants","Electrical Cleaners","Steel Putty","Hot Melt Adhesives","Rust Preventives"],["WD-40","CRC","Speb 7","M-Seal","Arofine Polymers","SAV Chemicals"],"plant maintenance, electrical panels, workshops and breakdown repair"),
  sub("tapes","Industrial Tapes & Compounds","Industrial tapes and compounds for fixing, masking, sealing and protection.",["Double-Sided Tapes","Foam Tapes","Masking Tapes","Specialty Compounds"],["3M","Polymaxx"],"assembly, signage, electronics, packaging and surface protection") ]}
};
export const pillarList=Object.values(pillars);
export const allBrands=Array.from(new Set(pillarList.flatMap(p=>p.brands)));
export const industryCoverage = {
  eyebrow: "Industry coverage",
  title: "Trusted across manufacturing sectors",
  instruction: "Select an industry to explore how we support your production.",
};
export const industries = [
  { name: "Automotive & Auto Components", image: "factory", description: "Belts, drives and motion components for assembly lines and automotive production equipment." },
  { name: "Food & Beverage Processing", image: "belting", description: "Conveyor and drive belt selection for processing, bottling and handling equipment." },
  { name: "Packaging & Printing", image: "automation", description: "Timing belts, motion components and adhesives for packaging and printing machinery." },
  { name: "Pharmaceuticals", image: "automation", description: "Belting and motion components for filling, labelling and packaging equipment." },
  { name: "Textiles & Garments", image: "belting", description: "Drive belts and transmission components for spinning, weaving and textile processing machinery." },
  { name: "Cement, Mining & Heavy Industries", image: "belting", description: "Belts, pulleys and couplings for demanding drives and bulk material handling equipment." },
  { name: "Logistics, Warehousing & Material Handling", image: "automation", description: "Conveyor belts and motion components for sorting, conveying and warehouse handling systems." },
  { name: "OEM & Machine Building", image: "automation", description: "Belting, linear motion and drive components for new machines and equipment upgrades." },
  { name: "General Manufacturing & Job Shops", image: "factory", description: "Replacement belts, maintenance adhesives and drive components for everyday workshop needs." },
] as const;
export const navItems=[{label:"Home",to:"/"},{label:"About",to:"/about"},{label:"Power Transmission",to:"/power-transmission"},{label:"Automation",to:"/automation"},{label:"Adhesives",to:"/adhesives"},{label:"Contact",to:"/contact"},{label:"Franchise",to:"/franchise"}] as const;
export const searchItems=pillarList.flatMap(p=>p.subcategories.flatMap(s=>[{name:s.name,to:`/${p.key}/${s.slug}`,keywords:[s.name,...s.types,...s.brands].join(" ").toLowerCase()},...s.types.map(t=>({name:t,to:`/${p.key}/${s.slug}`,keywords:`${t} ${s.name} ${s.brands.join(" ")}`.toLowerCase()}))]));
