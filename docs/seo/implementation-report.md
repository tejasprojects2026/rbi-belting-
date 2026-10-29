# Structured data implementation and validation

Audit date: 29 October 2026. Changes are local; not pushed or deployed.

## Scope and canonical domain

Audited all 25 existing public routes on https://rbi-belting-y8in.vercel.app/; all returned HTTP 200. The previous canonical domain, https://rbibelting.com, did not resolve. At the user's instruction, JSON-LD, canonical links, Open Graph URLs, robots.txt and sitemap.xml now consistently use the live Vercel origin. The missing Caterpillar Belts URL was added to the sitemap. Existing titles, descriptions and other SEO metadata are retained; all 25 page titles were compared with the live audit and match.

No UI, layout, animation, visible text, review content, or product/enquiry behavior was changed for this SEO task. The working tree already contained the separately requested reviews size reduction; those changes were preserved.

## Graph design

Every page emits exactly one server-rendered `application/ld+json` script with `https://schema.org` context and a connected `@graph`. The company is one entity with `Organization` and `LocalBusiness` types and one stable `/#organization` ID, rather than two conflicting businesses. Each graph also has one `WebSite`, one page-specific page entity and relevant breadcrumbs/listings. AboutPage, ContactPage, CollectionPage and FAQPage are subtypes of WebPage.

Each inner page has Home → Division → Product family breadcrumbs, or Home → Page for standalone pages. Parent category heads are suppressed on nested routes so product pages do not inherit a second category graph or canonical URL. Client navigation updates schema correctly. JSON-LD serialization escapes `<` and Unicode line separators to prevent script-breaking content.

Business details come from the visible Contact page, footer, logo and actual social links: RB International Belting & Automation; Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate, Pune 411026, India; +91 87881 95839 and +91 98909 61752; response@rbibelting.in and sales@rbcorp.in; Monday–Saturday 09:30–18:30; the existing Maps link and Instagram profile. Placeholder Facebook, LinkedIn and YouTube `#` links are excluded. No unverified legal company name, coordinates, opening date or personal biography was added.

## Page-by-page schema

All rows also contain the shared Organization + LocalBusiness entity and WebSite. The final column lists additional page-specific types.

| Path | Page-specific schema |
| --- | --- |
| `/` | WebPage |
| `/about` | AboutPage, BreadcrumbList |
| `/power-transmission` | CollectionPage, BreadcrumbList, ItemList |
| `/automation` | CollectionPage, BreadcrumbList, ItemList |
| `/adhesives` | CollectionPage, BreadcrumbList, ItemList |
| `/contact` | ContactPage, FAQPage, BreadcrumbList |
| `/franchise` | WebPage, BreadcrumbList |
| `/power-transmission/v-belts` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/timing-belts` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/conveyor-belts` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/flat-belts` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/pulleys-and-bushes` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/couplings` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/accessories` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/automation/linear-motion` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/automation/robotics` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/automation/motors-and-drives` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/automation/controllers` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/adhesives/threadlockers` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/adhesives/sealants` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/adhesives/structural` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/adhesives/general-purpose` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/adhesives/specialty` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/adhesives/tapes` | CollectionPage, BreadcrumbList, Product, ItemList |
| `/power-transmission/caterpillar-belts` | CollectionPage, BreadcrumbList, Product, ItemList |

## Product and content boundaries

The 18 existing product detail URLs are product-family/range pages, not individual SKU pages. Their page type is CollectionPage, with a Product entity describing the actual named range and an ItemList of the visible product types. Product name, description, available range brands, category, supported types and applications come from `src/lib/site-data.ts`. `additionalProperty` contains the visible range characteristics, not invented dimensions or certifications. Brands describe the available range, not a fabricated manufacturer/SKU combination.

Only V-Belts and Conveyor Belts have approved product photography associated with their ranges. Those two pages include four existing product images each, with absolute URLs verified to return image content. The 16 other ranges omit product images; their general factory/division hero photographs are not falsely described as product photographs. Caterpillar Belts has no confirmed brand data and therefore omits `brand`.

There are no individual purchasable SKU URLs, prices, stock records or product-level ratings/reviews. No offers, price, availability, aggregateRating or Review schema was added. Business reviews are not reused as product ratings. No ProductGroup or fake variant relationships were invented.

Contact contains the five existing visible FAQ questions and exact answers. One page entity carries both ContactPage and FAQPage, avoiding duplicate page entities. No FAQ data was added elsewhere. FAQ markup does not guarantee a Google FAQ rich result; Google limits FAQ rich results to well-known authoritative government/health sites.

Service schema was intentionally omitted: there are no dedicated, currently offered service pages. General selection support and supply benefits do not justify inventing service detail URLs. The planned franchise program remains WebPage, not an active Service or Offer.

## Validation

- `npm run build`: PASS, normal production build using the existing Cloudflare Nitro target.
- Local automated validation: PASS across all 25 SSR routes, on both the development server and built production worker. Checks include JSON parsing, one graph and one canonical per page, connected references and unique entity IDs, matching canonical URLs, breadcrumbs, page-specific types, five Contact FAQs, valid product image responses, exclusion of invented commercial data, and unknown-product HTTP 404 behavior.
- The existing `npm run preview` command has a pre-existing TanStack/Nitro output-path mismatch (`dist/server/server.js` versus `.output/server/index.mjs`). Production HTML was tested by running the built worker's fetch handler through a temporary local HTTP adapter with its existing static assets; project runtime configuration was not changed.
- Browser checks: PASS for hydration without JavaScript errors, client navigation from product to category/About/Contact, FAQ/schema text parity after opening every FAQ, and the existing Automation product popup.
- TypeScript: `npx tsc --noEmit` still reports seven pre-existing errors in category-pages, division-cards, v-belts-showcase and the root error component. No errors were reported in the changed SEO code.
- Google Rich Results Test: attempted code-mode validation of the actual generated homepage, Contact and V-Belts HTML. Google refused all three submissions with **“Something went wrong — Log in and try again.”** This is not a pass or a markup rejection. Signed-in validation and post-deployment URL testing remain required.

**Schema.org Validator:** actual generated HTML was submitted in code mode for 21 pages; every completed result had **0 errors and 0 warnings**. Subsequent submissions for General Purpose & Wood Adhesives, Specialty Chemicals & MRO, Industrial Tapes & Compounds and Caterpillar Belts timed out in the validator interface; those four have passed local/production SSR checks but have no completed external result. Page-level results are recorded in `validation-results.json`.

Schema.org validity is different from Google rich-result eligibility. Google Product snippets require an offer, review or aggregate rating in addition to the product name. Those details are unavailable and were not fabricated. Missing images on some product ranges may also affect eligibility. Generic ItemList and WebPage types do not independently promise a Google rich result.

## Details still needed

1. Confirm and connect the final production domain. Then update `websiteIdentity.url` in site-data.ts, plus the sitemap and robots origins, and re-run checks.
2. Supply approved product photos for the 16 ranges without them, and confirm available brands for Caterpillar Belts.
3. Provide real SKU/model pages, exact product-to-brand mappings, and approved model-level sizes/material/specification data before adding more detailed item markup. Existing range characteristics are already included.
4. Provide genuine Facebook/LinkedIn/YouTube profile URLs if those profiles exist. Current placeholder links are intentionally omitted.
5. Confirm precise business latitude/longitude if geo coordinates are desired. The published street address and Maps link are already included.
6. Supply details and visible pages for any actual standalone services before adding Service markup. Prices, availability and product reviews are not required for this Schema.org implementation and must not be invented to satisfy Google's product enhancements.

## Re-run and deployment

Start the website's SSR server and run:

```sh
node scripts/validate-schema.mjs http://localhost:8080
```

The same command accepts a production or staging URL. It exports each tested HTML page and results to `/tmp/rbi-schema-validation/`. Use the JSON-LD samples `homepage.jsonld`, `contact.jsonld` and `v-belts.jsonld` in the external validators' code input. For the broadest test, submit the full rendered HTML exports. After deployment, test the final public URLs in Google Rich Results Test and Schema.org Validator and inspect them in Search Console. Public URL tests before deployment will test the old live code.

References:
- https://validator.schema.org/
- https://search.google.com/test/rich-results
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://developers.google.com/search/docs/appearance/structured-data/faqpage
- https://schema.org/CollectionPage
