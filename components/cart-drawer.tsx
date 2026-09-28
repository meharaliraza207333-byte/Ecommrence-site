"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { brand, formatPKR } from "@/lib/brand";
import { cartProducts,cartTotals,getCartKey } from "@/lib/cart";
import { useShop } from "./shop-provider";
import { Icon } from "./icons";

export function CartDrawer(){
  const {cart,cartCount,drawerOpen,setDrawerOpen,updateQuantity,removeFromCart}=useShop();
  const dialog=useRef<HTMLDialogElement>(null);
  const items=cartProducts(cart), totals=cartTotals(cart);
  useEffect(()=>{
    const element=dialog.current;
    if(drawerOpen){if(!element?.open)element?.showModal();document.body.style.overflow="hidden";}
    else element?.close();
    return()=>{document.body.style.overflow="";};
  },[drawerOpen]);
  return <dialog ref={dialog} className="cart-drawer" aria-labelledby="drawer-title" onClose={()=>setDrawerOpen(false)} onClick={event=>{if(event.target===event.currentTarget)setDrawerOpen(false)}}>
    <div className="drawer-inner">
      <div className="drawer-heading"><div><span className="eyebrow">YOUR GOOD FINDS</span><h2 id="drawer-title">Shopping cart <span>({cartCount})</span></h2></div><button className="icon-button" autoFocus onClick={()=>setDrawerOpen(false)} aria-label="Close cart"><Icon name="close"/></button></div>
      {!items.length?<div className="empty-state"><span className="empty-icon"><Icon name="cart" width="32" height="32"/></span><h3>A little empty in here.</h3><p>Find something you'll love using every day.</p><Link href="/shop" className="button button-dark" onClick={()=>setDrawerOpen(false)}>Explore the collection <Icon name="arrow" width="16" height="16"/></Link></div>:<>
        <div className="shipping-progress"><p>{totals.freeShippingRemaining?<>You're <strong>{formatPKR(totals.freeShippingRemaining)}</strong> away from free delivery.</>:<><Icon name="check" width="16" height="16"/> You've unlocked free delivery.</>}</p><progress max={brand.freeShippingAt} value={Math.min(totals.subtotal,brand.freeShippingAt)} aria-label="Progress towards free delivery"/></div>
        <div className="drawer-items">{items.map(({line,product})=><article className="drawer-item" key={getCartKey(line)}><Link href={"/products/"+product.slug} onClick={()=>setDrawerOpen(false)}><Image src={product.image} width={76} height={92} alt={product.name}/></Link><div><Link href={"/products/"+product.slug} onClick={()=>setDrawerOpen(false)}>{product.name}</Link><small>{line.color}{line.size?" / "+line.size:""}</small><div className="drawer-item-bottom"><div className="quantity-control"><button onClick={()=>updateQuantity(getCartKey(line),line.quantity-1)} aria-label={"Decrease "+product.name}><Icon name="minus" width="12" height="12"/></button><span>{line.quantity}</span><button disabled={cart.filter(x=>x.productId===product.id).reduce((n,x)=>n+x.quantity,0)>=product.stock} onClick={()=>updateQuantity(getCartKey(line),line.quantity+1)} aria-label={"Increase "+product.name}><Icon name="plus" width="12" height="12"/></button></div><strong>{formatPKR(product.price*line.quantity)}</strong></div></div><button className="item-remove" onClick={()=>removeFromCart(getCartKey(line))} aria-label={"Remove "+product.name}><Icon name="close" width="14" height="14"/></button></article>)}</div>
        <div className="drawer-summary"><p><span>Subtotal</span><b>{formatPKR(totals.subtotal)}</b></p><p><span>Delivery</span><b>{totals.delivery?formatPKR(totals.delivery):"Free"}</b></p><p className="summary-total"><span>Total</span><b>{formatPKR(totals.total)}</b></p><a href="/checkout" onClick={()=>setDrawerOpen(false)} className="button button-accent">Continue to checkout <Icon name="arrow" width="16" height="16"/></a><a href="/cart" className="drawer-view-cart">View full cart</a><small><Icon name="shield" width="13" height="13"/> Cash on Delivery available across Pakistan</small></div>
      </>}
    </div>
  </dialog>;
}
