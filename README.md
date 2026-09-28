# [CLIENT BRAND NAME] storefront

Premium multi-page Next.js storefront for Pakistan with a Cash on Delivery checkout and a Supabase-secured admin workspace.

## Local setup

```powershell
cd "D:\Eccomrence site\atelier-store"
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`. Update brand, contact details, social links, currency delivery settings and announcement text in `lib/brand.ts`.

## Supabase setup

1. Create a Supabase project, then run `supabase/schema.sql` in its SQL Editor.
2. Copy the Project URL, anon key, and **server-only** service-role key to `.env.local` using `.env.example`. Never expose the service-role key to browser code or commit it.
3. In Authentication settings, configure the site URL and allowed redirect URLs for local and production domains.
4. Register the client owner, then run the final `update profiles set role='admin' ...` statement from the schema using their auth user UUID.
5. The owner can now use `/admin` to upload product images, add products and update order statuses. Storage is public-read, but only `admin` profiles can write.

Never add a Supabase service-role key to `NEXT_PUBLIC_*` or any browser code.

## Campaign images

Three clearly described temporary Unsplash campaign images are currently used in `app/page.tsx`, because no attached image files were present. Replace the hero, mugs campaign, and merchandise campaign sources with the client’s supplied images in `public/campaigns/` (or their approved CDN URLs). Product imagery is independently sourced and varied.

## Testing checklist

- Run `npm.cmd run build` before deploy.
- Verify mobile navigation, all collection routes, filters, sorting, search, empty states and image loading.
- Add variants to cart, refresh, adjust quantities, remove lines and verify PKR totals/free-shipping threshold.
- Place a COD order; verify validation and the confirmation route.
- Verify customer login/register, then verify non-admin access to `/admin` redirects.
- Verify admin product upload/addition and order status updates after Supabase setup.
