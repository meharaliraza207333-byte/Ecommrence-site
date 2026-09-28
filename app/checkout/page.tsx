import { SiteShell } from "@/components/site-shell";
import { CheckoutForm } from "@/components/checkout-form";
export const metadata={title:"Checkout | Logo"};
export default function Checkout(){return <SiteShell><section className="container collection-page"><div className="collection-intro"><div><p className="eyebrow">THE LAST LITTLE STEP</p><h1>Make them yours.</h1><p>Enter your delivery details and pay when your order arrives.</p></div></div><CheckoutForm/></section></SiteShell>}
