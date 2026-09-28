import { InfoPage } from "@/components/info-page";
import { brand } from "@/lib/brand";
import { Icon } from "@/components/icons";
export default function Contact(){return <InfoPage eyebrow="LET'S TALK" title="How can we help?"><p>Questions about a product, your order or finding the right size? Send our team a note. Include your order number if you're getting in touch about a purchase.</p><div className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="display">Contact the team</h2><p className="mt-3">{brand.email}<br/>{brand.phone}</p><a className="button button-dark mt-5" href={"mailto:"+brand.email+"?subject=Store%20enquiry"}>Send us an email <Icon name="arrow" width="15" height="15"/></a></div></InfoPage>}
