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

- **Palette (OKLCH), current — matched to the real brand:** background stays a near-black warm charcoal (smoke, not pure black), but the accent is no longer an invented ember-orange. The client's real Instagram logo (@thegrillgouna profile picture) was sampled directly: cream `oklch(96.7% 0.022 80.7)`, gold `oklch(66.5% 0.092 84.4)`, ink `oklch(20.4% 0.004 106.7)`. The site's single accent is now that exact gold; all `--color-*` hues were nudged from 42 toward 75-84 to sit in the same family as the real gold instead of clashing with it. The dark background is a deliberate reading of the logo's own black, not a deviation from the brand.
- **Brand mark:** `public/images/logo-mark.jpg` is the client's actual Instagram profile picture (cream circle, gold ring, black flame, "THE GRILL / EGYPTIAN CUISINE"), used directly in `Nav`, `Footer`, and `IntroLogo` in place of the generic Tabler flame icon. `app/icon.svg` (favicon) was redrawn as a simplified vector using the same three sampled colors so it stays crisp at 16px. Do not go back to a generic/invented flame mark for the brand identity itself; the Tabler flame icon is still fine for unrelated uses (e.g. the "spicy" menu badge).
- **Typography:** Bodoni Moda (display serif, high-contrast, fine-dining register) for headlines and the wordmark; Plus Jakarta Sans for body and UI text, via `next/font/google`.
- **Signature interaction, v1 (rejected):** a canvas ember-particle overlay behind the hero read as a cheap animated-firelights effect on top of a real fire photo; removed per client feedback. Do not re-add a floating-particle effect.
- **Signature interaction, v2 (current):** the booking flow itself is the interaction. The hero shows the photo, headline, and a single "Dine with us" card; clicking it steps through an animated `BookingWizard` (party size -> date/time -> contact details -> confirmation) with directional slide/fade transitions between steps (motion `AnimatePresence`), not a single open form. A second, lighter motion touch: the Ambience section's photo has a subtle scroll-tied parallax (scale + drift via `useScroll`/`useTransform`), and a very low-opacity fixed grain texture sits over the whole page for tactile depth. All motion respects `prefers-reduced-motion`.
- **Booking placement:** the request-a-table flow must be the first thing visible on the page (hero, not buried near the footer) per client instruction. Do not move it back down without asking.
- **Opening moment, rejected attempts:** (a) `ScrollIgnite`, a pinned scroll-scrubbed ignition video as the very first thing on the page; client found the scroll-scrub itself bad there and it didn't reliably play through, removed. (b) `IntroVideo`, a full-screen unskippable autoplay AI video (Higgsfield `seedance_2_5`) as the opening; client rejected the AI-video-as-intro approach entirely mid-build ("stop this ai video thing"). Do not reintroduce an AI-generated video as the opening/intro again without being asked.
- **Opening moment, current:** `IntroLogo` — a simple flame mark + "The Grill" wordmark on `bg-bg`, brief hold (~1.6s), cross-fades into the homepage beneath (already mounted, not delayed). Body scroll locked while visible. `prefers-reduced-motion` shortens the hold and skips the entrance animation. This is intentionally minimal; do not add video/imagery back into this specific component without explicit client sign-off.
- **Mid-page scroll-scrub, current and approved:** `SearScrub`, placed between Signature Dishes and the Menu section (roughly the page's midpoint). A client-selected Higgsfield video (`public/videos/sear.mp4`, `minimax_h3`, keyframed with a charcoal-ember start frame and the Hero's `ember-fire.jpg` as the end frame, 16:9, 8s) is scroll-scrubbed exactly like the rejected opening attempt: `video.currentTime` bound to `scrollYProgress` via a pinned 220vh section, forward on scroll down, reverse on scroll up, video always paused (never `.play()`-ed) so there is no native play-button state possible. The client explicitly wants scroll-scrub here, just not as the site's opening move. `prefers-reduced-motion` shows a static poster frame instead.
- **Hero background photo (`public/images/ember-fire.jpg`) flagged by client as reading fake/AI-generic:** it is a decorative garden fire-pit bowl, not an actual charcoal grill with a grate, so for a restaurant called "The Grill" it doesn't depict real grilling equipment. Regeneration was in progress (candidates generated via `nano_banana_pro`, prompt aimed at a documentary-style professional charcoal grill with a visible grate, not a staged product render) when the client redirected to other work. This is still outstanding: revisit and replace `ember-fire.jpg` (used in Hero, and as the `SearScrub`/reduced-motion poster) with a shot that actually reads as grill equipment, not a fire bowl.
- **Sections:** Hero (name, est. 1999, one-line positioning, `BookingWizard`) -> Heritage strip (asymmetric layout, oversized ghost "1999" numeral, grill-grate texture) -> Signature Dishes (Grill Experience highlights: Fillet Mignon, Lamb Chops, Tarb, Charcoal Rotisserie Chicken, Grill's Tableya - generated photography, horizontal scroll-snap, not a 3-card row) -> SearScrub (mid-page scroll-scrubbed sear/charcoal video) -> Full Menu (categorized tabs, items as real cards with grain texture, not a plain list) -> Ambience (full-bleed generated night/charcoal-smoke scene with parallax, ties to El Gouna setting) -> Contact ("Come find us": hours/location plus direct Call and WhatsApp buttons, grate texture) -> Footer (real logo mark, Tabler icon socials, hours, AI-photography disclosure).

## Redesign pass (full visual overhaul, current)

Client asked to "redo the entire design... make it more textured, make it more user friendly... something a website award would get." Ran this as a redesign-overhaul (content/IA preserved, visual language rebuilt) via the `redesign-existing-projects` skill's audit-then-fix method, not a rewrite:

- **Texture system, new:** two reusable utilities in `globals.css` — `.texture-grate` (a repeating-linear-gradient evoking grill-grate bars, an on-brand motif rather than generic noise) and `.texture-grain` (the existing fine noise, now also used per-surface at very low opacity + `mix-blend-overlay`, not just once page-wide). Grate texture marks Heritage, the Menu category-tab strip, and Contact. Grain texture marks the Menu item cards, the `BookingWizard` card, and the footer. **Implementation rule:** never put `.texture-grain`/`.texture-grate` directly on a text-bearing element's own class list — text fades with it. Always a separate `absolute inset-0` decorative child with its own `opacity-[0.03-0.05] mix-blend-overlay`, content siblings after it in DOM order so they paint on top.
- **Layout variety:** Heritage and Menu were the flattest sections (plain centered text, a bare `<ul>` of rows) and got the most work — Heritage is now asymmetric with a giant low-opacity "1999" numeral; Menu items are real bordered/textured cards with hover lift, not text rows. Contact was rebuilt from a bare two-column info block into its own textured moment with direct Call/WhatsApp CTAs (previously the only call/WhatsApp path was buried in step 4 of `BookingWizard`).
- **Mobile nav, new:** `Nav` was desktop-only before (links `hidden md:flex`, no way to reach Dishes/Menu/Visit on mobile except scrolling). Added a hamburger + slide-down panel for `< md`.
- **Floating quick-contact, new:** `FloatingContact.tsx`, a WhatsApp button fixed bottom-right, appears after scrolling past ~60% of the viewport height. WhatsApp specifically (not a generic chat bubble) because it's the business's real, already-used confirmation channel. Different intent from the booking flow (quick message vs. reserve-a-table), so not a duplicate CTA.
- **Bug found and fixed during this pass:** `IntroLogo`'s unmount relied on Motion's `onAnimationComplete` callback, which did not reliably fire (root cause unconfirmed — possibly a StrictMode double-invoke interaction), leaving `document.body.style.overflow = "hidden"` stuck forever and the entire site permanently unscrollable after the intro. Fixed by making the unmount a deterministic `setTimeout` independent of animation callbacks, with the overflow reset happening directly in that timer rather than relying solely on the mount effect's cleanup. If a future intro/splash component needs a scroll lock, use this timer pattern, not `onAnimationComplete`.
- **Mobile scroll-lock bug, fixed after client reported glitching on phone (site worked fine on desktop):** two separate issues in `IntroLogo`. (1) Plain `document.body.style.overflow = "hidden"` does not reliably block scroll/touchmove on iOS Safari and can visibly jump/flicker when toggled back off; switched to the standard iOS-safe lock (`position: fixed` + saved `top: -scrollY`, restored via `window.scrollTo` on unlock). (2) While fixing that, introduced a *second*, sneakier bug: added an `unlockedRef` guard meant to prevent double-unlocking, but React's dev-only StrictMode double-invokes effects on mount (setup -> cleanup -> setup again), and since `unlockedRef` is a ref (persists across that double-invoke) while the `unlock` closure is recreated fresh each time, the guard's first (StrictMode-only) trip permanently disabled the *real* later unlock call. Net effect: body stayed `position: fixed` forever after the intro, invisible in dev screenshots (which only reproduced when actually checking `document.body.style` after the fact, not from visual inspection). Fixed by deleting the guard entirely — resetting these specific inline styles and re-scrolling to the same position is naturally idempotent, so nothing needed guarding in the first place. **Lesson: don't add a "run once" ref guard around effect logic that is already safe to run more than once** — it's much easier to introduce a StrictMode-interaction bug than to actually need the guard.
- **Mobile glitch, round 2:** the position:fixed lock fix above did not resolve it. Client's exact description: "it fades in so quick, then suddenly appears again for a milli second and disappears again" (iPhone Safari) — a re-flash right after the fade-out, not a stuck/frozen page. That symptom (content briefly reappearing at its *initial* animated state right as it's leaving) is the signature of a `motion/react` component getting a fresh mount on the client after SSR — most plausible cause: `IntroLogo` rendered its full overlay markup during SSR (server has no `matchMedia`, so a "reduced motion" style hook can only resolve after hydration), and something in that server/client handshake caused Motion's internal state to restart once on iOS Safari specifically (WebKit's slower hydration timing makes this class of bug far more visible there than on desktop Chrome, which matches "works fine on my computer"). Rather than keep chasing the exact single root cause blind, rewrote `IntroLogo` to remove the entire risk surface at once: (a) it now renders `null` on the server and on the first client render unconditionally (`ready` state flips true only after mount, inside a `requestAnimationFrame`, itself inside `useEffect` so there is zero server-rendered intro markup to ever hydrate/mismatch), and (b) dropped the `motion/react` dependency for this component entirely in favor of a plain CSS `transition-opacity`/`transition-all` fade (Tailwind `motion-reduce:` variants handle reduced-motion, read once via `matchMedia` inside the mount effect rather than a reactive hook). If this specific class of "flash on mobile only" bug resurfaces elsewhere, suspect SSR/hydration timing interacting with `motion/react` before suspecting the animation logic itself.
- **Known environment artifact, reconfirmed:** the browser preview pane's screenshots reliably go solid black after any scroll (smooth-scroll or programmatic), even though the page itself is correct — confirmed repeatedly via `window.scrollY`, computed styles, and `read_page` structure while screenshots showed black. This is a compositor capture bug in the preview tool, not a site bug. Verify scrolled state via DOM/computed-style checks, not screenshots; only trust screenshots at scroll position 0.
