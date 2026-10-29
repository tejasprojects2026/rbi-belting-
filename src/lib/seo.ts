import logo from "@/assets/rb-logo.jpeg";
import classicalBelt from "@/assets/v-belts/classical-clean.jpg";
import coggedBelt from "@/assets/v-belts/cogged-clean.jpg";
import bandedBelt from "@/assets/v-belts/banded-clean.jpg";
import narrowBelt from "@/assets/v-belts/narrow-clean.jpg";
import {
  footerContact,
  pillarList,
  productPhotoShowcases,
  websiteIdentity,
  type Pillar,
  type SubCategory,
} from "@/lib/site-data";

type SchemaNode = Record<string, unknown>;
export const siteUrl = websiteIdentity.url;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
const reference = (id: string) => ({ "@id": id });
const businessId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${absoluteUrl(items.at(-1)?.path ?? "/")}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

function organizationSchema(): SchemaNode {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": businessId,
    name: websiteIdentity.name,
    url: absoluteUrl("/"),
    description: footerContact.description,
    logo: { "@type": "ImageObject", url: absoluteUrl(logo) },
    image: absoluteUrl(logo),
    telephone: websiteIdentity.telephone,
    email: websiteIdentity.email,
    address: { "@type": "PostalAddress", ...websiteIdentity.address },
    openingHours: websiteIdentity.openingHours,
    hasMap: footerContact.mapUrl,
    sameAs: websiteIdentity.socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: websiteIdentity.telephone[0],
      email: websiteIdentity.email[0],
    },
  };
}

function categoryList(pillar: Pillar, url: string): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${url}#products`,
    name: pillar.name,
    numberOfItems: pillar.subcategories.length,
    itemListElement: pillar.subcategories.map((sub, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sub.name,
      url: absoluteUrl(`/${pillar.key}/${sub.slug}`),
    })),
  };
}

function productRange(pillar: Pillar, sub: SubCategory, url: string): SchemaNode {
  // These URLs describe ranges, not priced SKUs. Only show product photos that
  // already belong to the range; division hero photographs are not product images.
  const photos = sub.slug === "v-belts"
    ? [classicalBelt, coggedBelt, bandedBelt, narrowBelt]
    : (productPhotoShowcases[`${pillar.key}/${sub.slug}`] ?? []).map((photo) => photo.image);
  return {
    "@type": "Product",
    "@id": `${url}#product-range`,
    name: sub.name,
    description: sub.short,
    url,
    category: pillar.name,
    ...(photos.length ? { image: photos.map(absoluteUrl) } : {}),
    ...(sub.brands.length ? { brand: sub.brands.map((name) => ({ "@type": "Brand", name })) } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Product types", value: sub.types.join(", ") },
      { "@type": "PropertyValue", name: "Applications", value: sub.applications },
    ],
  };
}

export function pageStructuredData(title: string, description: string, path: string, extra?: object | object[]) {
  const url = absoluteUrl(path);
  const parts = path.split("/").filter(Boolean);
  const pillar = pillarList.find((entry) => entry.key === parts[0]);
  const sub = pillar?.subcategories.find((entry) => entry.slug === parts[1]);
  const supplied = (Array.isArray(extra) ? extra : extra ? [extra] : []) as SchemaNode[];
  const breadcrumb = supplied.find((node) => node["@type"] === "BreadcrumbList");
  const faq = supplied.find((node) => node["@type"] === "FAQPage");
  const pageType = path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : pillar ? "CollectionPage" : "WebPage";
  const page: SchemaNode = {
    "@type": faq ? [pageType, "FAQPage"] : pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: reference(websiteId),
    publisher: reference(businessId),
    ...(breadcrumb ? { breadcrumb: reference(breadcrumb["@id"] as string) } : {}),
    ...(path === "/about" || path === "/contact" ? { about: reference(businessId) } : {}),
    ...(faq ? { mainEntity: faq["mainEntity"] } : {}),
  };
  const nodes: SchemaNode[] = [
    organizationSchema(),
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: websiteIdentity.name,
      description: websiteIdentity.description,
      inLanguage: "en",
      publisher: reference(businessId),
    },
    page,
  ];
  if (breadcrumb) {
    const { "@context": _context, ...node } = breadcrumb;
    nodes.push(node);
  }
  if (pillar && !parts[1]) {
    nodes.push(categoryList(pillar, url));
    page["mainEntity"] = reference(`${url}#products`);
  } else if (pillar && sub) {
    nodes.push(productRange(pillar, sub, url), {
      "@type": "ItemList",
      "@id": `${url}#product-types`,
      name: `${sub.name} product types`,
      numberOfItems: sub.types.length,
      itemListElement: sub.types.map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
    });
    page["about"] = reference(`${url}#product-range`);
    page["mainEntity"] = reference(`${url}#product-types`);
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

export const serializeStructuredData = (schema: object) =>
  JSON.stringify(schema).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

export function pageHead(title: string, description: string, path: string, schema?: object | object[]) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl(path) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
    scripts: [{ type: "application/ld+json", children: serializeStructuredData(pageStructuredData(title, description, path, schema)) }],
  };
}
