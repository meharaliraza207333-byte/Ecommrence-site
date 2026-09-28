import Link from "next/link";
import { brand } from "@/lib/brand";

export function Logo({light=false, onClick}: {light?:boolean; onClick?:()=>void}) {
  return <Link className={"logo-lockup"+(light?" logo-light":"")} href="/" aria-label={brand.name+" home"} onClick={onClick}>
    <svg className="logo-symbol" viewBox="0 0 36 36" fill="none" aria-hidden="true"><rect width="36" height="36" rx="10" fill="currentColor"/><path d="M11 10v16h15v-5H16V10h-5Z" fill="var(--navy)"/><circle cx="25" cy="12" r="3" fill="var(--navy)"/></svg>
    <span className="logo-type">{brand.name.toLowerCase()}<span>.</span></span>
  </Link>;
}
