import type { SVGProps } from "react";

export type IconName = "search" | "cart" | "heart" | "user" | "chevron" | "arrow" | "close" | "check" | "truck" | "return" | "shield" | "pin" | "menu" | "plus" | "minus" | "bag" | "headphones";
const paths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
  cart: <><path d="M2 3h3l2.3 12h11.4l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
  heart: <path d="M20.4 4.6a5.4 5.4 0 0 0-7.6 0L12 5.4l-.8-.8a5.4 5.4 0 0 0-7.6 7.6L12 21l8.4-8.8a5.4 5.4 0 0 0 0-7.6Z"/>,
  user: <><circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2"/></>,
  chevron: <path d="m6 9 6 6 6-6"/>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  truck: <><path d="M1 5h13v12H1Zm13 4h4l4 4v4h-8"/><circle cx="5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  return: <><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/><path d="M12 7v5l3 2"/></>,
  shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/></>,
  pin: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  minus: <path d="M5 12h14"/>,
  bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
  headphones: <><path d="M3 14v-2a9 9 0 0 1 18 0v2M3 12h4v8H3zm14 0h4v8h-4Z"/><path d="M21 20c0 2-4 2-6 2"/></>,
};
export function Icon({name, ...props}: SVGProps<SVGSVGElement> & {name: IconName}) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
