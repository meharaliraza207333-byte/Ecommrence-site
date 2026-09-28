import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { HomeHero } from "@/components/home-hero";
import { ProductShelf } from "@/components/product-shelf";
import { ProductCard } from "@/components/product-card";
import { ManualSlider } from "@/components/manual-slider";
import { Icon } from "@/components/icons";
import { products } from "@/lib/products";

const categories = [
  { name: "T-shirts", note: "Find your perfect fit", image: "p04", href: "/collections/t-shirts" },
  { name: "Mugs & cups", note: "Make mornings better", image: "p07", href: "/collections/mugs" },
  { name: "Bags & totes", note: "Take the day with you", image: "p15", href: "/collections/accessories?q=tote" },
  { name: "Caps", note: "Finish your look", image: "p14", href: "/collections/accessories?q=cap" },
  { name: "Accessories", note: "It's all in the details", image: "p18", href: "/collections/accessories" },
];

export default function Home() {
  return <SiteShell>
    <HomeHero />
    <div className="container">
      <div className="home-assurances" aria-label="Shopping benefits"><span><Icon name="truck" />Delivery across Pakistan</span><span><Icon name="shield" />Cash on Delivery</span><span><Icon name="return" />14-day returns</span><Link href="/contact"><Icon name="headphones" />A real person, ready to help<Icon name="arrow" width="16" height="16" /></Link></div>
      <section className="category-section" aria-labelledby="categories-title">
        <div className="section-heading"><div><span className="eyebrow">FIND YOUR EVERYDAY</span><h2 id="categories-title">A little something for you.</h2></div><Link href="/shop" className="text-link">Explore all categories<Icon name="arrow" width="18" height="18" /></Link></div>
        <ManualSlider label="Categories" variant="categories">{categories.map(category => <Link className="category-tile" href={category.href} key={category.name}><span className="category-thumbnail"><Image src={"/products/" + category.image + ".jpg"} alt={category.name} fill style={{objectPosition:category.image==="p07"?"20% center":"center"}} sizes="(max-width: 600px) 42vw, (max-width: 1000px) 28vw, 20vw" className="object-cover" /></span><span className="category-label"><span><strong>{category.name}</strong><small>{category.note}</small></span><Icon name="arrow" width="20" height="20" /></span></Link>)}</ManualSlider>
      </section>
      <ProductShelf />
      <section className="ritual-banner" aria-labelledby="ritual-title"><div className="ritual-image"><Image src="/products/p09.jpg" alt="Freshly brewed coffee in ceramic cups on a cafe table" fill sizes="(max-width: 700px) 100vw, 50vw" className="object-cover" /></div><div className="ritual-content"><span className="eyebrow">THE SLOW MORNING CLUB</span><h2 id="ritual-title">Less rush.<br />More ritual.</h2><p>A quiet moment. A warm cup. Make a little room for the things that make your day.</p><Link href="/collections/mugs" className="button button-light">Find your favourite mug<Icon name="arrow" width="18" height="18" /></Link><span className="campaign-footnote">MUGS & CUPS / STARTING AT PKR 1,450</span></div></section>
      <section className="shop-section" aria-labelledby="small-finds-title"><div className="section-heading"><div><span className="eyebrow">SMALL PRICE. EVERYDAY PLEASURE.</span><h2 id="small-finds-title">Good finds under PKR 2,000.</h2><p>A little treat for yourself. A thoughtful gift for someone else.</p></div><Link className="text-link" href="/shop?max=2000">Shop the edit<Icon name="arrow" width="18" height="18" /></Link></div><ManualSlider label="Affordable products">{products.filter(product => product.price <= 2000 && product.id !== "p12").map(product => <ProductCard key={product.id} product={product} />)}</ManualSlider></section>
      <section className="promo-grid" aria-label="Explore more collections"><Link className="promo-card" href="/collections/t-shirts"><div className="promo-image"><Image src="/products/p02.jpg" alt="Relaxed T-shirt styling for the everyday wardrobe" fill sizes="(max-width: 700px) 100vw, 50vw" className="object-cover" /></div><div className="promo-copy"><span className="eyebrow">YOUR DAILY ROTATION</span><h2>Wear it your way.</h2><span className="text-link">Explore clothing<Icon name="arrow" width="18" height="18" /></span></div></Link><Link className="promo-card" href="/collections/accessories"><div className="promo-image"><Image src="/products/p14.jpg" alt="White everyday cap with a curved brim" fill sizes="(max-width: 700px) 100vw, 50vw" className="object-cover" /></div><div className="promo-copy"><span className="eyebrow">THE FINISHING TOUCH</span><h2>Small details. Big difference.</h2><span className="text-link">Explore accessories<Icon name="arrow" width="18" height="18" /></span></div></Link></section>
      <section className="brand-note"><span className="eyebrow">THIS IS LOGO</span><h2>Good things.<br />For your kind of everyday.</h2><div><p>We believe the things you reach for every day deserve a little more thought. A comfortable fit. A satisfying weight. A detail that makes you smile.</p><p>That&apos;s what we look for. That&apos;s what you&apos;ll find here.</p><Link href="/about" className="text-link">Get to know us<Icon name="arrow" width="18" height="18" /></Link></div></section>
      <section className="home-faq" aria-labelledby="home-faq-title"><div><span className="eyebrow">HERE TO MAKE IT EASY</span><h2 id="home-faq-title">A few good<br />things to know.</h2><p>Need a hand finding the right piece? We&apos;re happy to help.</p><Link href="/contact" className="text-link">Talk to us<Icon name="arrow" width="18" height="18" /></Link></div><div className="faq-list"><details><summary>Where do you deliver?</summary><p>We deliver across Pakistan. Standard delivery is PKR 250, with free delivery on orders of PKR 5,000 or more. Visit our <Link href="/shipping-and-returns">shipping page</Link> for more details.</p></details><details><summary>Can I pay when my order arrives?</summary><p>Yes. Choose Cash on Delivery at checkout and pay the courier in PKR when your parcel arrives.</p></details><details><summary>What if something isn&apos;t quite right?</summary><p>Unused items in their original condition can be returned within 14 days. <Link href="/contact">Contact our team</Link> to arrange a return, and review the full <Link href="/shipping-and-returns">returns policy</Link> before sending an item back.</p></details><details><summary>How do I choose my size?</summary><p>Open the size and fit guide on your chosen T-shirt&apos;s page. If you&apos;re between sizes, <Link href="/contact">ask us for garment measurements</Link> before placing your order.</p></details></div></section>
    </div>
  </SiteShell>;
}
