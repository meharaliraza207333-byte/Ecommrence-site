"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef,useState } from "react";
import { Product } from "@/lib/types";
import { formatPKR } from "@/lib/brand";
import { useShop } from "./shop-provider";
import { ProductCard } from "./product-card";
import { Icon } from "./icons";

export function ProductDetail({product,related}:{product:Product;related:Product[]}){
 const [color,setColor]=useState(product.colors[0]),[size,setSize]=useState(product.sizes?.[0]),[qty,setQty]=useState(1),[message,setMessage]=useState("");
 const sizeGuide=useRef<HTMLDetailsElement>(null);
 const {addToCart,wishlist,toggleWish,cart}=useShop();
 const remaining=product.stock-cart.filter(line=>line.productId===product.id).reduce((n,line)=>n+line.quantity,0);
 const saved=wishlist.includes(product.id);
 function add(){setMessage("");if(!addToCart({productId:product.id,quantity:qty,color,size}))setMessage("All available stock for this product is already in your cart.");}
 return <>
 <div className="container product-page"><p className="product-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><Link href={"/collections/"+product.category}>{product.category.replace("-"," ")}</Link><span>/</span><b>{product.name}</b></p><div className="product-layout">
  <div className="product-main-image"><Image src={product.image} alt={product.name} fill style={{objectPosition:product.imagePosition}} loading="eager" sizes="(max-width: 600px) 100vw, 50vw"/></div>
  <div className="product-info"><div className="product-heading"><div><p className="eyebrow">{product.category.replace("-"," ")} / {product.badge||"THE EVERYDAY COLLECTION"}</p><h1>{product.name}</h1></div><button className="product-save" aria-label={saved?"Remove from wishlist":"Save to wishlist"} aria-pressed={saved} onClick={()=>toggleWish(product.id)}><Icon name="heart" fill={saved?"currentColor":"none"}/></button></div><p className="product-price">{formatPKR(product.price)}<span>Cash on Delivery available</span></p><p className="product-description">{product.description}</p>
   <div className="product-option"><p className="eyebrow">Colour <span>{color}</span></p><div className="product-color-list">{product.colors.map(option=><button key={option} className={color===option?"option-selected":""} aria-pressed={color===option} onClick={()=>setColor(option)}>{option}</button>)}</div></div>
   {product.sizes&&<div className="product-option"><div className="product-option-heading"><p className="eyebrow">Size <span>{size}</span></p><button onClick={()=>{if(sizeGuide.current){sizeGuide.current.open=true;sizeGuide.current.scrollIntoView({behavior:"smooth",block:"center"});}}}>Size & fit guide</button></div><div className="product-size-list">{product.sizes.map(option=><button key={option} aria-pressed={size===option} className={size===option?"size-selected":""} onClick={()=>setSize(option)}>{option}</button>)}</div></div>}
   <div className="product-purchase"><div className="quantity-control"><button disabled={qty<=1} onClick={()=>setQty(Math.max(1,qty-1))} aria-label="Decrease quantity"><Icon name="minus" width="14" height="14"/></button><span>{qty}</span><button disabled={qty>=remaining} onClick={()=>setQty(Math.min(remaining,qty+1))} aria-label="Increase quantity"><Icon name="plus" width="14" height="14"/></button></div><button className="button button-accent" disabled={!product.stock||remaining<1} onClick={add}>{!product.stock?"Currently sold out":remaining<1?"All available items in your cart":"Add to cart"}<Icon name="cart" width="17" height="17"/></button></div>
   <p className={"product-stock"+(!product.stock?" is-sold":"")}><Icon name={product.stock?"check":"close"} width="13" height="13"/>{product.stock?"In stock · Usually dispatched in 1–2 working days":"Out of stock. Explore similar favourites below."}</p>{message&&<p className="form-message" role="status">{message}</p>}
   <div className="product-perks"><div><Icon name="truck" width="23" height="23"/><p>Pakistan-wide delivery<small>Free on orders of PKR 5,000+</small></p></div><div><Icon name="return" width="23" height="23"/><p>14-day returns<small>On unused items, in original condition</small></p></div></div>
   <details className="product-accordion"><summary>Delivery & returns</summary><p>Standard delivery is PKR 250, or free when your order reaches PKR 5,000. Pay by Cash on Delivery. Read our <Link className="underline" href="/shipping-and-returns">delivery and returns policy</Link> for details.</p></details>
   <details className="product-accordion"><summary>Care for your favourite</summary><p>{product.category==="t-shirts"?"Wash inside out on a cool cycle with similar colours. Air dry and avoid ironing directly over printed artwork.":product.category==="mugs"?"Wash gently after use. Follow the care label for dishwasher and microwave suitability.":"Keep dry and clean with a soft cloth. Follow the care label included with your item."}</p></details>
   {product.sizes&&<details ref={sizeGuide} id="size-guide" className="product-accordion"><summary>Size & fit guide</summary><p>For a regular fit, choose your usual size. Prefer a more relaxed shape? Consider sizing up. Contact us for garment measurements before ordering if you're between sizes.</p><Link className="text-link mt-3" href="/contact">Ask us about sizing <Icon name="arrow" width="14" height="14"/></Link></details>}
  </div>
 </div></div>
 <section className="container related-products"><div className="section-heading"><div><p className="eyebrow">GOOD COMPANY FOR YOUR GOOD FIND</p><h2>You might like these too.</h2></div><Link href="/shop" className="text-link">Explore all <Icon name="arrow" width="15" height="15"/></Link></div><div className="product-grid">{related.map(item=><ProductCard product={item} key={item.id}/>)}</div></section>
 </>;
}
