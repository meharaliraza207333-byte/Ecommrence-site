import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ShopProvider } from "@/components/shop-provider";
import { brand } from "@/lib/brand";
export const metadata: Metadata = {
 title: brand.name+" | Good finds. Everyday.",
 description:"Shop premium T-shirts, ceramic mugs, bags, caps and everyday accessories at "+brand.name+". Delivered across Pakistan with Cash on Delivery.",
};
export const viewport: Viewport = { themeColor:"#20221f" };
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" data-scroll-behavior="smooth"><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><ShopProvider>{children}</ShopProvider></body></html>;
}
