# Full-width homepage banners

Created with the built-in imagegen tool. Both assets are AI-generated editorial campaign photographs, not individual product photographs. A local reference edit could not be read by the image service, so these matching compositions were generated from the briefs below.

- Desktop/tablet: `public/images/everyday-banner-wide-v2.png`
- Mobile: `public/images/everyday-banner-mobile-v2.png`

The original `everyday-editorial-v1.png` is retained. Sources, descriptive alternative text and default crop are configured in `lib/brand.ts` under `brand.hero`. The responsive picture selects a single optimized image through Next.js. Headline and working buttons remain HTML overlays; no text is baked into the assets.

## Desktop final prompt

```text
Use case: photorealistic-natural
Asset type: premium ecommerce campaign hero photograph.
Scene: one continuous sunlit warm ivory plaster-wall studio with a pale oak table.
Subjects: three substantial cotton T-shirts in ivory, charcoal and warm tan on natural wooden hangers on a short wooden clothing rail; a cream ceramic mug, folded charcoal tee, natural canvas tote bag and tan six-panel cap.
Style: photorealistic high-end editorial product photograph, authentic fabric weave and gentle creases, glazed ceramic, natural wood grain and soft window daylight.
Constraints: no text, letters, logos, labels, watermark, UI, borders, inserted graphic panels or buttons; no extra props or people. HTML copy will overlay this photograph.
Composition: a panoramic landscape banner approximately 2.4:1. The LEFT 46% is quiet evenly lit warm ivory plaster wall with subtle natural texture, completely free of products, rail and strong shadows so dark website copy can be overlaid. Group all merchandise naturally within the RIGHT 54%, complete and clearly recognizable with safety margins. Keep the tabletop along the bottom. This must be ONE seamless real studio photograph filling the entire image, not a split layout or collage.
```

## Mobile final prompt

```text
Use case: photorealistic-natural
Asset type: premium ecommerce campaign hero photograph.
Scene: one continuous sunlit warm ivory plaster-wall studio with a pale oak table.
Subjects: three substantial cotton T-shirts in ivory, charcoal and warm tan on natural wooden hangers on a short wooden clothing rail; a cream ceramic mug, folded charcoal tee, natural canvas tote bag and tan six-panel cap.
Style: photorealistic high-end editorial product photograph, authentic fabric weave and gentle creases, glazed ceramic, natural wood grain and soft window daylight.
Constraints: no text, letters, logos, labels, watermark, UI, borders, inserted graphic panels or buttons; no extra props or people. HTML copy will overlay this photograph.
Composition: portrait 2:3 mobile banner. The upper 56% is uninterrupted evenly lit warm ivory plaster wall, with only subtle natural texture, completely free of products, rails and distracting shadows, for overlaying dark HTML copy and buttons. Arrange all the merchandise compactly, with realistic proportions, within the LOWER 44% and central 80% of the image, so the subjects stay visible when cropped slightly. One seamless continuous studio photograph, not a collage or divided layout.
```
