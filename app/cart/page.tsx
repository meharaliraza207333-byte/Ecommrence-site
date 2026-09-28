import { SiteShell } from "@/components/site-shell";
import { CartView } from "@/components/cart-view";
export const metadata={title:"Your cart | Logo"};
export default function Cart(){return <SiteShell><section className="container collection-page"><div className="collection-intro"><div><p className="eyebrow">GOOD CHOICES, ALL TOGETHER</p><h1>Your shopping cart.</h1><p>One step closer to your next everyday favourite.</p></div></div><CartView/></section></SiteShell>}
