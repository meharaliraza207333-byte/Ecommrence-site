"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/brand";
import { navigation } from "@/lib/navigation";
import { useShop } from "./shop-provider";
import { Logo } from "./logo";
import { Icon } from "./icons";
import styles from "./header.module.css";

export function Header() {
  const { cartCount, wishlist, setDrawerOpen, hydrated } = useShop();
  const [active, setActive] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const searchDialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const closeNavigation = () => { setActive(null); setMenuOpen(false); };

  useEffect(() => {
    searchDialog.current?.close();
    // Navigation can also change through links outside the header.
    const timeout = window.setTimeout(() => { setActive(null); setMenuOpen(false); }, 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (active === null && !menuOpen) return;
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setActive(null); setMenuOpen(false); }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (active !== null) { triggers.current[active]?.focus(); setActive(null); }
      else { setMenuOpen(false); menuTrigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [active, menuOpen]);

  function openSearch() {
    closeNavigation();
    searchDialog.current?.showModal();
    searchDialog.current?.querySelector<HTMLInputElement>("input")?.focus();
  }

  return <>
    <div className={styles.announcement}>
      <span>Free delivery on orders over PKR {brand.freeShippingAt.toLocaleString("en-PK")}</span>
      <span className={styles.announcementDivider} aria-hidden="true">·</span>
      <span className={styles.codNote}>Cash on Delivery across Pakistan</span>
    </div>
    <header ref={header} className={styles.header} onBlur={event => {
      if (event.relatedTarget && !header.current?.contains(event.relatedTarget as Node)) closeNavigation();
    }}>
      <div className={styles.row}>
        <button ref={menuTrigger} className={styles.mobileToggle} disabled={!hydrated}
          aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
          aria-controls="department-navigation" onClick={() => { setMenuOpen(!menuOpen); setActive(null); }}>
          <Icon name={menuOpen ? "close" : "menu"} width="22" height="22" />
        </button>
        <div className={styles.brand}><Logo onClick={closeNavigation} /></div>
        <nav id="department-navigation" className={styles.departments} data-open={menuOpen}
          aria-label="Product departments">
          {navigation.map((item, index) => <div className={styles.group} key={item.label}>
            <button disabled={!hydrated} ref={node => { triggers.current[index] = node; }}
              className={styles.departmentTrigger} aria-expanded={active === index}
              aria-controls={active === index ? "department-panel" : undefined}
              onClick={() => setActive(active === index ? null : index)}
              onKeyDown={event => {
                if (event.key === "ArrowDown") {
                  event.preventDefault(); setActive(index);
                  requestAnimationFrame(() => header.current?.querySelector<HTMLAnchorElement>("#department-panel a")?.focus());
                }
              }}>{item.label}<Icon name="chevron" width="12" height="12" /></button>
            {active === index && <div id="department-panel" className={styles.panel}>
              <div className={styles.panelInner}>
                <div className={styles.intro}><h2>{item.label}</h2><p>{item.description}</p></div>
                <div className={styles.links}>{item.links.map(link =>
                  <Link key={link.href} href={link.href} onClick={closeNavigation}>
                    {link.label}<Icon name="arrow" width="16" height="16" />
                  </Link>)}</div>
                <Link className={styles.feature} href={item.featured.href} onClick={closeNavigation}>
                  <Image src={item.featured.image} alt="" width={130} height={148} sizes="130px" />
                  <span><strong>{item.featured.title}</strong><span>{item.featured.copy}</span></span>
                </Link>
                <button className={styles.panelClose} aria-label="Close categories" onClick={() => {
                  setActive(null); triggers.current[index]?.focus();
                }}><Icon name="close" width="20" height="20" /></button>
              </div>
            </div>}
          </div>)}
        </nav>
        <nav className={styles.actions} aria-label="Your shopping">
          <button ref={searchTrigger} disabled={!hydrated} onClick={openSearch} aria-label="Open search"
            aria-haspopup="dialog"><Icon name="search" width="22" height="22" /></button>
          <Link href="/account" aria-label="Your account" onClick={closeNavigation}><Icon name="user" width="22" height="22" /></Link>
          <Link href="/wishlist" aria-label={"Wishlist, " + wishlist.length + " saved items"} onClick={closeNavigation}>
            <Icon name="heart" width="22" height="22" />{wishlist.length > 0 && <span className={styles.count}>{wishlist.length}</span>}
          </Link>
          <button disabled={!hydrated} onClick={() => { closeNavigation(); setDrawerOpen(true); }}
            aria-label={"Open cart, " + cartCount + " items"}>
            <Icon name="bag" width="22" height="22" /><span className={styles.count}>{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
    <dialog ref={searchDialog} className={styles.searchDialog} aria-labelledby="search-title"
      onClose={() => searchTrigger.current?.focus()}
      onClick={event => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
        }
      }}>
      <div className={styles.searchHeading}><h2 id="search-title">Find your everyday favourites</h2>
        <button className={styles.panelClose} aria-label="Close search" onClick={() => searchDialog.current?.close()}><Icon name="close" /></button>
      </div>
      <form className={styles.searchForm} action="/search" role="search">
        <div className={styles.searchFields}>
          <label className="sr-only" htmlFor="search-department">Search department</label>
          <select id="search-department" name="department" defaultValue="">
            <option value="">All categories</option><option value="t-shirts">Clothing</option>
            <option value="mugs">Home & Living</option><option value="accessories">Bags & Accessories</option>
          </select>
          <label className="sr-only" htmlFor="header-query">Search products</label>
          <input id="header-query" name="q" type="search" placeholder="T-shirts, mugs, totes…" autoComplete="off" maxLength={120} />
          <button type="submit" aria-label="Search products"><Icon name="search" width="22" height="22" /></button>
        </div>
        <p className={styles.searchHint}>Search by product name or choose a category.</p>
      </form>
      <div className={styles.suggestions}><span>Explore collections</span>
        <Link href="/collections/t-shirts" onClick={() => searchDialog.current?.close()}>T-shirts</Link>
        <Link href="/collections/mugs" onClick={() => searchDialog.current?.close()}>Mugs & cups</Link>
        <Link href="/collections/accessories" onClick={() => searchDialog.current?.close()}>Bags & accessories</Link>
      </div>
    </dialog>
  </>;
}
