import Link from "next/link";
import { brand } from "@/lib/brand";
import { Logo } from "./logo";
import { Icon, IconName } from "./icons";

const services:{icon:IconName;title:string;copy:string}[]=[
  {icon:"truck",title:"Delivered to your door",copy:"Free shipping on PKR 5,000+"},
  {icon:"return",title:"A little peace of mind",copy:"14-day returns on unused items"},
  {icon:"shield",title:"Shop with confidence",copy:"Cash on Delivery available"},
  {icon:"headphones",title:"Real people, ready to help",copy:"We're just a message away"},
];
export function Footer(){return <>
  <section className="service-strip"><div className="container">{services.map(service=><div key={service.title}><Icon name={service.icon} width="26" height="26"/><span><strong>{service.title}</strong><small>{service.copy}</small></span></div>)}</div></section>
  <footer className="store-footer">
    <div className="container footer-main">
      <div className="footer-about"><Logo light/><p>Good finds for your wardrobe, your home, and everything in between. A little upgrade to the everyday.</p><span className="footer-country"><Icon name="pin" width="14" height="14"/> Pakistan · Prices in PKR</span></div>
      <div className="footer-column"><h3>Make yourself at home</h3><Link href="/shop">Shop all products</Link><Link href="/collections/t-shirts">Clothing</Link><Link href="/collections/mugs">Home & living</Link><Link href="/collections/accessories">Bags & accessories</Link><Link href="/about">The Logo story</Link></div>
      <div className="footer-column"><h3>We're here for you</h3><Link href="/account">Your account</Link><Link href="/cart">Your shopping cart</Link><Link href="/shipping-and-returns">Delivery & returns</Link><Link href="/faqs">Frequently asked questions</Link><Link href="/contact">Contact us</Link></div>
      <div className="footer-column footer-connect"><h3>Let's stay in touch</h3><p>Questions, ideas, or just saying hello?<br/>We'd love to hear from you.</p><Link href="/contact" className="footer-contact-button">Talk to us <Icon name="arrow" width="16" height="16"/></Link><div className="footer-socials"><a href={brand.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={brand.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span><div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms & conditions</Link><a href="#top">Back to top ↑</a></div><span className="cod-label">CASH ON DELIVERY</span></div>
  </footer>
</>}
