# Logo storefront

The storefront uses a white search-first header, five department dropdowns, charcoal text, warm neutral surfaces and restrained bronze accents. The brand name, contacts and delivery prices are in lib/brand.ts; department names and destinations are in lib/navigation.ts.

The reading scale starts at 16px for body text. Desktop navigation is 15px, product names are 17px, and prices are 18px. Mobile layouts reflow instead of reducing important text: product names stay at least 15px, navigation at least 14px, and search/form inputs 16px. The home page includes a larger campaign hero, shopping benefits, photographic category cards, a four-product recommendation shelf, a coffee campaign, affordable finds, collection features, brand story and expandable FAQs.

## Shopping interactions

- Header search supports a selected department and query.
- Each of the five navigation options opens a real dropdown. Escape closes it and returns focus to the trigger. Mobile uses the same five department controls.
- Product cards offer colour/size selection through Quick add.
- The cart drawer and cart page share persistent state, respect product stock across variants and calculate delivery from the configured threshold.
- Wishlist items persist between refreshes. Invalid stored data is discarded without breaking the page.
- Checkout clears the in-memory cart only after a successful server response. Network failures leave the cart intact.

The customer-facing sample catalog still comes from lib/products.ts. Supabase credentials and the schema must be configured before live account and COD order services can work; this UI refresh does not claim a hosted database is already connected.

## Checks

Run npm.cmd run build, then npm.cmd start. In another terminal, run npx.cmd playwright test.

The Playwright configuration uses the installed Google Chrome browser. It covers desktop/mobile navigation, query destinations, variant selection, wishlist, cart persistence, stock limits, delivery totals, images, viewport overflow and minimum reading sizes. Screenshots are written to the ignored test-results directory. The Market Tote has a versioned image filename so the previous optimized backpack image cannot remain cached.

## Sample photography

Sample photographs are downloaded locally into public/products from Unsplash so rendering does not depend on a remote image request. Replace them with the client's approved product photographs before launch.

The Market Tote photograph is by Caesar Akbar: https://unsplash.com/photos/white-canvas-tote-bag-with-purple-handles-and-yellow-base-HKOKxYK1FmY (free Unsplash license). The remaining original Unsplash source identifiers are preserved in lib/products.ts.
