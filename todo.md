# Heartland Animal Shelter — Project TODO

## Core Infrastructure
- [x] Project initialized (React + Tailwind + tRPC + MySQL)
- [x] Database schema: products, variants, orders, order_items, news_posts, users
- [x] Database migration pushed
- [x] Global CSS with brand colors (red #C8102E, teal #0D9488, warm off-white)
- [x] Google Fonts: Playfair Display + DM Sans
- [ ] Switch to modern font system: Inter/Plus Jakarta Sans for headings, DM Sans for body
- [ ] Generate logo concepts with modern typography
- [x] Navigation component (horizontal bar with Donate button)
- [x] Footer component

## Pages (Initial Build)
- [x] Home page (hero slider, CTAs, featured pets, stats, foster band, news, stories, donate CTA)
- [x] Adopt page
- [x] Get Involved page
- [x] Donate page
- [x] About page
- [x] Resources page

## Backend Routes (tRPC)
- [ ] Shop router: list products, get product with variants, create order
- [ ] News router: list published posts, get post by slug
- [ ] Admin router: CRUD for products, variants, orders, news posts
- [ ] Admin auto-translate news post to Spanish via AI

## Shop
- [ ] Shop page with product grid and category filter
- [ ] Product detail / variant selection modal
- [ ] Cart (local state)
- [ ] Stripe checkout integration
- [ ] Order confirmation page
- [ ] Seed initial shop products from current site

## News / Blog
- [ ] News listing page with category filter
- [ ] News detail page (by slug)
- [ ] Homepage: auto-pull 3 most recent published posts

## New Feature Sections
- [ ] Foster program: prominent homepage section + dedicated Foster page
- [ ] Homepage Calendar / Events section (elevated from hidden page)
- [ ] Pet Resources page: surrender prevention, lost pets, post-adoption support (with off-site links)
- [ ] Your Impact page: how donations are spent (with infographic-style stats from annual report)

## Admin Panel
- [ ] Admin dashboard layout (protected, admin role only)
- [ ] News posts management: list, create, edit, delete, publish/unpublish
- [ ] AI auto-translate news post to Spanish
- [ ] Shop products management: list, create, edit, deactivate
- [ ] Product variants management: add/edit/delete sizes/colors with stock
- [ ] Orders management: list, view details, update status

## Integrations
- [ ] Shelterluv embed on Adopt page (dogs: shelter ID 5335, cats: saved_query=12174)
- [ ] DonorPerfect forms on Donate page: General, Dr. Do More Fund, Arlo Fund, Kennel Sponsor, Memorial/Honor, Membership
- [ ] Newsletter signup link (DonorPerfect weblink)
- [ ] Double the Donation: dedicated /matching-gifts page (unlisted from nav)
- [ ] Double the Donation: embed plugin on Donate page in Corporate Matching section
- [ ] Instagram feed section on homepage via Elfsight embed placeholder

## Bilingual (EN/ES)
- [ ] Language context provider (EN/ES toggle persisted in localStorage)
- [ ] Language toggle button in navigation
- [ ] Spanish translations for all static page content
- [ ] Admin Panel: AI auto-translate news posts to Spanish
- [ ] Google Translate widget fallback for dynamic content

## Media / Photos
- [ ] Upload Heartland photos from zip to CDN
- [ ] Replace placeholder pet card images with real Heartland photos
- [ ] Replace hero images with real Heartland photos

## Testing & Polish
- [ ] Vitest unit tests for backend routes
- [ ] Responsive design check (mobile, tablet, desktop)
- [ ] Final visual polish pass

## New Requests (Feb 20)
- [ ] Shelterluv live pet finder widget on Adopt page (dogs + cats tabs)
- [ ] Google Maps embed on About/Contact page (Glenview + Wheeling locations)
- [ ] Stripe payment processing for shop checkout
- [x] Double the Donation plugin activated with real API key (hEjsp4KFXOCUNtzS)
- [x] EmbedSocial Instagram feed on homepage and News page
- [x] Admin Dashboard page built (products, news, orders tabs)
- [x] Matching Gifts dedicated page (/matching-gifts)
- [x] Corporate Matching section on Donate page with Double the Donation widget

## Additional Features (Feb 20 - Round 2)
- [ ] Upgrade Adopt page: replace static pet cards with Shelterluv live widget (already has iframes, verify working)
- [ ] Volunteer sign-up form on Get Involved page with email notification to staff
- [ ] Foster application form (dedicated page or modal) with email notification to foster coordinator
- [ ] Event Calendar page: visual monthly/list calendar view pulling from news_posts DB (category=Event)
- [ ] Google Maps embed on About page with both shelter locations (Wheeling + Glenview)
- [ ] Stripe payment processing for shop checkout
- [ ] Scrape foster application form from current heartlandanimalshelter.org/foster and replicate all fields
- [ ] Scrape dog adoption application form from current site and replicate all fields
- [ ] Scrape cat adoption application form from current site and replicate all fields
- [ ] Make logo bigger on homepage navigation
- [ ] Replace hero slider photos with user-uploaded dog and cat photos (one dog, one cat in slider)
- [ ] Remove red tag bar above headline in hero slider, reduce text on slides
- [ ] Move "Meet Our Animals" section to directly below the three-column CTA bar on homepage
- [ ] Build Board of Directors page (/board) with member names and titles from current site
- [ ] Add Board link to About section in navigation
- [ ] Replace homepage hero slide 1 photo with pitbull showing love / person showing affection to pitbull
- [ ] Pull adoption photos from Heartland Facebook page and add to Success Stories section on homepage
- [ ] Replace dark/black sections on homepage with light, warm, fun backgrounds
- [ ] Remove blue gradients from homepage sections — keep only orange/amber as complementary color
- [ ] Move Upcoming Events section higher on homepage (after Meet Our Animals)
- [ ] Add real events from current Heartland website to homepage events section
- [ ] Remove all gradient backgrounds from homepage, use flat warm colors instead
- [ ] Restyle homepage sections: red and teal as main section colors, orange only as accent (not full-section backgrounds)
- [ ] Add Charity Navigator and Candid (GuideStar) logos/links to footer matching current site
- [ ] Change footer background from black to deep teal (matching current site)
- [ ] Move "Meet Our Animals" section to directly below the Search Adoptable Pets bar (section 3 → section 4)
- [ ] Remove Quick Action Bar (Adopt/Foster/Donate/Volunteer) below the hero slider
- [ ] Reduce size of stat numbers in "How YOU Helped" section on homepage
- [ ] Add subtle fun animations: entrance fades, hover lifts on cards, floating paw prints, CTA pulse
- [ ] Replace all instances of "pet" with "animal" across all pages (except where it's part of a proper name like "PetSmart")
- [ ] Integrate "Find Your Match" search bar and "Meet Our Animals" cards into one unified section with live filtering
- [ ] Redesign hero as split-screen: photo on one side, text on the other (no dark overlay)
- [ ] Make sticky nav thin and mostly opaque (not too transparent) with frosted glass blur
- [ ] Fix logo size in navigation — make it bigger/more prominent
- [ ] Add "Featured Spotlight" section below hero for campaigns, events, and promotions (admin-manageable)
- [ ] Add photos to spotlight strip cards on homepage
- [ ] Increase logo size in navigation bar
- [ ] Make all Meet Our Animals cards the same size (uniform grid, no masonry varying heights)
- [ ] Update "Open Your Home, Save a Life" section to cover both volunteering AND fostering (two-column or tabbed layout)
- [x] Remove "Foster" filter/badge from Meet Our Animals filter bar on homepage
- [ ] Add LinkedIn and TikTok social links to footer and social sections
