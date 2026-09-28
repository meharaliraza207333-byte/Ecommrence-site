import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { brand } from "@/lib/brand";
import styles from "./home-hero.module.css";

export function HomeHero() {
  const { props: mobile } = getImageProps({ src: brand.hero.mobileImage, alt: brand.hero.alt, fill: true, sizes: "100vw" });
  return <section className={styles.hero} aria-labelledby="home-hero-title" data-testid="home-hero">
    <div className={styles.content} data-hero-copy>
      <h1 id="home-hero-title">Good things, made for every day.</h1>
      <p>Clothing, home essentials and accessories. Thoughtfully chosen for your everyday.</p>
      <div className={styles.buttons}>
        <Link className={styles.primary} href="/shop?featured=1">Shop the collection</Link>
        <Link className={styles.secondary} href="/shop">Explore all</Link>
      </div>
    </div>
    <picture className={styles.photography} data-hero-image style={{ "--hero-position": brand.hero.position } as CSSProperties}>
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes="100vw" />
      <Image src={brand.hero.image} alt={brand.hero.alt} fill
        loading="eager" fetchPriority="high"
        sizes="100vw" />
    </picture>
  </section>;
}
