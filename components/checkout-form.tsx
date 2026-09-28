"use client";
import Link from "next/link";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { formatPKR } from "@/lib/brand";
import { cartProducts,cartTotals,getCartKey } from "@/lib/cart";
import { useShop } from "./shop-provider";
import { Icon } from "./icons";

export function CheckoutForm(){
 const {cart,hydrated,clearCart}=useShop(),router=useRouter();
 const [error,setError]=useState(""),[saving,setSaving]=useState(false);
 const items=cartProducts(cart),totals=cartTotals(cart);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(saving||!items.length)return;
  setSaving(true);setError("");
  const data=Object.fromEntries(new FormData(event.currentTarget));
  try {
   const response=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,lines:cart})});
   const result=await response.json();
   if(!response.ok)throw new Error(response.status===503?"Online ordering is temporarily unavailable. Please contact us to place your order.":result.error||"We couldn't place your order. Please try again.");
   clearCart();router.push("/order-confirmation?order="+encodeURIComponent(result.orderNumber));
  }catch(error){setError(error instanceof Error?error.message:"We couldn't reach the store. Your cart is saved; please try again.");}finally{setSaving(false);}
 }
 if(!hydrated)return <p className="py-12 text-sm text-slate-500">Loading your order...</p>;
 if(!items.length)return <div className="empty-state"><span className="empty-icon"><Icon name="bag" width="30" height="30"/></span><h3>Let's find your favourites first.</h3><p>Add an item to your cart before checking out.</p><Link className="button button-dark" href="/shop">Explore the shop</Link></div>;
 return <form className="checkout-layout" onSubmit={submit}><div><section className="checkout-panel"><h2>Where should we send it?</h2><div className="checkout-fields"><label>Full name<input className="field" name="name" autoComplete="name" maxLength={120} required/></label><label>Mobile number<input className="field" type="tel" name="phone" placeholder="03XX XXXXXXX" autoComplete="tel" pattern="[+0-9 ()-]{10,20}" required/></label><label className="full-width">Email address<input className="field" name="email" type="email" autoComplete="email" maxLength={200} required/></label><label className="full-width">Delivery address<input className="field" name="address" placeholder="House, street and area" autoComplete="street-address" maxLength={400} required/></label><label>City<input className="field" name="city" autoComplete="address-level2" maxLength={100} required/></label><label>Postal code (optional)<input className="field" name="postal" autoComplete="postal-code" maxLength={10}/></label><label className="full-width">Delivery notes (optional)<textarea className="field" name="notes" placeholder="Anything that will help our courier find you" maxLength={500} rows={3}/></label></div></section><div className="payment-card"><Icon name="shield" width="27" height="27"/><div><strong>Cash on Delivery</strong><p>Pay the courier in PKR when your order reaches your door.</p></div></div>{error&&<p className="form-message mt-4" role="alert">{error} <Link className="underline" href="/contact">Contact us</Link></p>}</div><aside className="order-summary"><h2>Your good finds</h2>{items.map(({line,product})=><div className="checkout-item" key={getCartKey(line)}><span>{product.name} × {line.quantity}<small>{line.color}{line.size?" / "+line.size:""}</small></span><b>{formatPKR(product.price*line.quantity)}</b></div>)}<p className="mt-5"><span>Subtotal</span><b>{formatPKR(totals.subtotal)}</b></p><p><span>Delivery</span><b>{totals.delivery?formatPKR(totals.delivery):"Free"}</b></p><p className="summary-total"><span>Total</span><b>{formatPKR(totals.total)}</b></p><button type="submit" className="button button-accent" disabled={saving}>{saving?"Placing your order...":"Place Cash on Delivery order"}{!saving&&<Icon name="arrow" width="16" height="16"/>}</button><small><Icon name="shield" width="14" height="14"/> Your details stay private</small><p className="mt-4 text-center text-xs">By placing an order, you agree to our <Link className="underline" href="/terms">terms</Link>.</p></aside></form>;
}
