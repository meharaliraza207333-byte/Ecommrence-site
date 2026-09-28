// Editable client identity and contact placeholders live here.
export const brand = {
  name: "Logo", tagline: "Good finds. Everyday.", currency: "PKR", country: "Pakistan",
  // Editorial campaign asset, kept separate from individual catalog photographs.
  hero: {
    image: "/images/everyday-banner-wide-v2.png",
    mobileImage: "/images/everyday-banner-mobile-v2.png",
    alt: "Ivory, charcoal and tan T-shirts on a wooden rail beside a canvas tote, ceramic mug and cap",
    position: "center center",
  },
  email: "hello@yourbrand.pk", // Replace with the client's email.
  phone: "+92 300 0000000", // Replace with the client's phone.
  address: "Your studio address, Karachi, Pakistan",
  instagram: "https://instagram.com/yourbrand",
  facebook: "https://facebook.com/yourbrand", tiktok: "https://tiktok.com/@yourbrand",
  shippingFee: 250, freeShippingAt: 5000,
  announcement: "A little more to love. Free delivery on orders of PKR 5,000+",
} as const;
export const formatPKR = (value: number) => new Intl.NumberFormat("en-PK", {
  style: "currency", currency: "PKR", maximumFractionDigits: 0,
}).format(value);
