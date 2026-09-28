import Link from "next/link";
import { SiteShell } from "./site-shell";
export function InfoPage({eyebrow,title,children}:{eyebrow:string;title:string;children:React.ReactNode}){
 return <SiteShell><div className="container info-layout"><nav className="info-sidebar" aria-label="Customer information"><strong>Here to help</strong><Link href="/about">Our story</Link><Link href="/contact">Contact us</Link><Link href="/faqs">FAQs</Link><Link href="/shipping-and-returns">Delivery & returns</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms & conditions</Link></nav><article className="info-article"><p className="eyebrow">{eyebrow}</p><h1 className="display">{title}</h1><div className="info-content">{children}</div></article></div></SiteShell>;
}
