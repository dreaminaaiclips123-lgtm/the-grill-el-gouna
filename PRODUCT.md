# Product

## Register

brand

## Platform

web

## Users

Diners in and visiting El Gouna (Red Sea resort town, Egypt) deciding where to eat tonight: resort guests, expats, and locals browsing on a phone, usually within minutes of the meal. They arrive from Instagram (@thegrillgouna), Google/TripAdvisor search, or a shared link. They need to believe, in seconds, that this is a proper kitchen worth the drive, not another resort-strip grill. Secondary user: someone calling or WhatsApping to reserve a table or order delivery.

## Product Purpose

A restaurant site for The Grill El Gouna, an Egyptian / Oriental & Mediterranean charcoal-grill kitchen operating in El Gouna since 1999. It exists to make the food and the kitchen's credibility (25+ years, real charcoal grilling, a real menu with real prices) legible fast, and to convert a visitor into a phone call, WhatsApp message, or reservation. Success is a visitor reading the menu, believing the place is worth the price, and calling.

## Positioning

Not a resort buffet grill and not a Western steakhouse: a long-standing, serious Egyptian charcoal kitchen that happens to sit in a resort town. The site should read as expensive and considered, the way the food is, without borrowing steakhouse-leather or generic "Mediterranean cafe" cliches.

## Conversion & proof

- Primary CTA: Call to reserve (`tel:+201221785555`). Secondary: WhatsApp / delivery (`tel:+201221783333`), Instagram.
- The line a visitor remembers: "Charcoal-grilled Egyptian cooking, in El Gouna, since 1999."
- Belief ladder: this kitchen has real history (est. 1999), the menu is specific and priced honestly (not vague "market price"), the food is fire-grilled and worth the trip.
- Proof on hand: the actual priced menu (extracted in full from the client's real menu card), real hours (13:00-23:45 daily), real phone numbers, real social following (5.9k on Instagram).

## Brand Personality

Warm, unhurried, a little smoky. Old-guard hospitality rather than trendy resort dining: charcoal, fire, brass, night air. Confident enough to not over-explain itself. Heritage without nostalgia-kitsch (no papyrus-and-hieroglyph cliches).

## Anti-references

- Generic "Mediterranean restaurant" template: turquoise, olive-branch icon, stock hummus photo.
- Western steakhouse cliches: dark leather, mahogany, whiskey-bar mood boards. Not this brand.
- Literal Egyptian tourist-kitsch: papyrus texture, hieroglyphics, pyramid silhouettes, camel icons.
- AI-slop landing pages: purple gradients, glassmorphism everywhere, generic serif-italic editorial affectation, warm-cream-and-brass "artisan" palette used by default rather than earned.
- Div-based fake food photography or icon-only "menu cards" standing in for real dishes.

## Design Principles

1. Charcoal, not cliché: the site's own palette is dark and smoky (the actual grill), with one warm ember accent, rather than the expected cream-parchment tourist-menu look.
2. The menu is the proof: real dishes, real EGP prices, organized so 60+ items read as curated, not dumped.
3. One signature device: a quiet ember/smoke drift in the hero, nowhere else on the page.
4. Built to survive with zero client photography: AI-generated food and ambience imagery carries the visual weight until real photos exist; typography and texture do the rest.

## Accessibility & Inclusion

WCAG AA contrast throughout on the dark charcoal ground (bone text and ember accent both verified against the background). Full keyboard navigation, visible focus states, descriptive alt text on every generated image, and prefers-reduced-motion collapses the ember field and all scroll reveals to simple fades.

---

## Content facts (real, sourced from client)

- **Name:** The Grill El Gouna
- **Established:** 1999
- **Cuisine:** Egyptian / Oriental & Mediterranean, charcoal grill
- **Location:** Downtown El Gouna, Red Sea, Egypt
- **Hours:** Daily, 13:00-23:45
- **Phone (reservations):** +20 122 178 5555
- **Phone (delivery/alt):** +20 122 178 3333
- **Instagram:** @thegrillgouna (5.9k followers)
- **Facebook:** The Grill El Gouna
- **Listed on:** TripAdvisor
- **Menu:** Full priced menu extracted from client PDF (`Oct-The Grill Menu - A3.pdf`) - Signature Soups, Cold Mezza, Hot Mezza, Seasonal Salads, The Grill Experience (charcoal specialties), Signature Mains, Grilled Wraps, Kids Menu, Wine, Beers/Spirits/Mixes, Desserts, Coffee, Soft Drinks, Fresh Juice. All EGP, +14% tax noted on the card.
- **Photography:** none supplied by client; client explicitly declined use of Instagram photos. All imagery must be generated.

## Design direction (locked)

- **Palette (OKLCH, "Committed" strategy):** background a near-black warm charcoal (smoke, not pure black); ink a warm bone/off-white; one accent, ember/terracotta-orange (the fire), used consistently for CTAs, price emphasis, and hover states. No second competing hue; a muted brass/gold is only ever a shade of the same ember ramp, never a separate accent.
- **Typography:** Bodoni Moda (display serif, high-contrast, fine-dining register) for headlines and the wordmark; Plus Jakarta Sans for body and UI text, via `next/font/google`.
- **Signature interaction, v1 (rejected):** a canvas ember-particle overlay behind the hero read as a cheap animated-firelights effect on top of a real fire photo; removed per client feedback. Do not re-add a floating-particle effect.
- **Signature interaction, v2 (current):** the booking flow itself is the interaction. The hero shows the photo, headline, and a single "Dine with us" card; clicking it steps through an animated `BookingWizard` (party size -> date/time -> contact details -> confirmation) with directional slide/fade transitions between steps (motion `AnimatePresence`), not a single open form. A second, lighter motion touch: the Ambience section's photo has a subtle scroll-tied parallax (scale + drift via `useScroll`/`useTransform`), and a very low-opacity fixed grain texture sits over the whole page for tactile depth. All motion respects `prefers-reduced-motion`.
- **Booking placement:** the request-a-table flow must be the first thing visible on the page (hero, not buried near the footer) per client instruction. Do not move it back down without asking.
- **Signature interaction, v3 (current, opening moment):** `ScrollIgnite` is a pinned 250vh section at the very top of the page, above the hero. A generated video (`public/videos/ignite.mp4`, Higgsfield `seedance_2_5`, 9:16, ~8s, charcoal igniting into full flame) has its `currentTime` bound directly to scroll progress via `useScroll`/`useMotionValueEvent`, not autoplay: scrolling down scrubs the video forward, scrolling up reverses it, exactly like Apple's scroll-scrubbed product pages. The "The Grill" wordmark fades out over the first 18% of scroll and a small "Scroll" cue fades out over the first 6%. Once the section's scroll range is exhausted it unpins into the normal Hero below. `prefers-reduced-motion` gets a static poster frame instead, no scrubbing.
- **Sections:** ScrollIgnite (pinned scroll-scrubbed ignition video) -> Hero (name, est. 1999, one-line positioning, `BookingWizard`) -> Heritage strip (short real story, full-width editorial statement) -> Signature Dishes (Grill Experience highlights: Fillet Mignon, Lamb Chops, Tarb, Charcoal Rotisserie Chicken, Grill's Tableya - generated photography, horizontal scroll-snap, not a 3-card row) -> Full Menu (categorized, tabs by section, real prices, not one long list) -> Ambience (full-bleed generated night/charcoal-smoke scene with parallax, ties to El Gouna setting) -> Visit strip (hours + location, two-item detail strip, no duplicate form) -> Footer (Tabler icon socials, hours, AI-photography disclosure).
