"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./product-card";
import { ManualSlider } from "./manual-slider";
import { Icon } from "./icons";
import { useShop } from "./shop-provider";

const tabs = [{ label: "For you", value: "all" }, { label: "Clothing", value: "t-shirts" }, { label: "Home & living", value: "mugs" }, { label: "Accessories", value: "accessories" }];
const recommended = ["p01", "p07", "p14", "p04"];

export function ProductShelf() {
  const { hydrated } = useShop();
  const [tab, setTab] = useState("all");
  const items = tab === "all" ? [...products].sort((a, b) => (recommended.includes(a.id) ? recommended.indexOf(a.id) : recommended.length) - (recommended.includes(b.id) ? recommended.indexOf(b.id) : recommended.length)) : products.filter(product => product.category === tab);
  return <section className="shop-section" aria-labelledby="favourites-title">
    <div className="section-heading"><div><span className="eyebrow">WORTH MAKING ROOM FOR</span><h2 id="favourites-title">Your next favourites.</h2><p>Good pieces. Great company. Pick your everyday.</p></div><Link href="/shop" className="text-link">Shop all products<Icon name="arrow" width="18" height="18" /></Link></div>
    <div className="shelf-toolbar"><div className="shelf-tabs" aria-label="Filter recommendations">
      {tabs.map(item => <button disabled={!hydrated} key={item.value} onClick={() => setTab(item.value)}
        aria-pressed={tab === item.value} className={tab === item.value ? "is-active" : ""}>{item.label}</button>)}
    </div></div>
    <ManualSlider key={tab} label="Recommended products" controlsLabel="products">
      {items.map(product => <ProductCard product={product} key={product.id} />)}
    </ManualSlider>
  </section>;
}
