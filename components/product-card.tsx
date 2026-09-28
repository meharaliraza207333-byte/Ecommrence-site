"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPKR } from "@/lib/brand";
import { useShop } from "./shop-provider";
import { QuickAdd } from "./quick-add";
import { Icon } from "./icons";

const categoryLabels={ "t-shirts":"CLOTHING",mugs:"HOME & LIVING",accessories:"ACCESSORIES" };
export function ProductCard({product,eager=false}:{product:Product;eager?:boolean}){
 const {wishlist,toggleWish,hydrated}=useShop(), saved=wishlist.includes(product.id);
 return <article className="product-card">
   <div className="product-card-image"><Link href={"/products/"+product.slug} aria-label={"View "+product.name}><Image src={product.image} alt={product.name} fill style={{objectPosition:product.imagePosition}} loading={eager?"eager":"lazy"} sizes="(max-width: 900px) 48vw, 25vw" className="object-cover"/></Link>{product.badge&&<span className="product-badge">{product.badge}</span>}<button disabled={!hydrated} className={"wishlist-button"+(saved?" is-saved":"")} onClick={()=>toggleWish(product.id)} aria-label={(saved?"Remove ":"Save ")+product.name+(saved?" from wishlist":" to wishlist")} aria-pressed={saved}><Icon name="heart" width="16" height="16" fill={saved?"currentColor":"none"}/></button></div>
   <div className="product-card-body"><span className="product-card-category">{categoryLabels[product.category]}</span><Link href={"/products/"+product.slug} className="product-card-title">{product.name}</Link><p className="product-colors">{product.colors.length>1?product.colors.length+" colours available":product.colors[0]}{product.sizes?" · "+product.sizes.length+" sizes":""}</p><div className="product-price-row"><strong>{formatPKR(product.price)}</strong>{product.compareAt&&<del>{formatPKR(product.compareAt)}</del>}</div><QuickAdd product={product}/></div>
 </article>;
}
