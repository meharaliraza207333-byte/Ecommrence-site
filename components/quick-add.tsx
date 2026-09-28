"use client";
import Image from "next/image";
import { FormEvent, useId, useRef, useState } from "react";
import { Product } from "@/lib/types";
import { formatPKR } from "@/lib/brand";
import { useShop } from "./shop-provider";
import { Icon } from "./icons";

export function QuickAdd({product}:{product:Product}){
  const controlId=useId();
  const modal=useRef<HTMLDialogElement>(null);
  const [error,setError]=useState("");
  const {addToCart,hydrated}=useShop();
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const added=addToCart({productId:product.id,color:String(data.get("color")),size:product.sizes?String(data.get("size")):undefined,quantity:1});
    if(added)modal.current?.close();else setError("All available stock for this item is already in your cart.");
  }
  return <><button className="quick-add" disabled={!product.stock||!hydrated} onClick={()=>{setError("");modal.current?.showModal();}} aria-label={"Choose options for "+product.name}>{product.stock?"Quick add":"Sold out"}<Icon name="plus" width="14" height="14"/></button>
    <dialog ref={modal} className="quick-modal" aria-labelledby={"quick-title-"+controlId} onClick={event=>{if(event.target===event.currentTarget)modal.current?.close();}}><button className="icon-button modal-close" onClick={()=>modal.current?.close()} aria-label="Close product options"><Icon name="close"/></button><div className="quick-modal-product"><Image src={product.image} width={140} height={170} alt={product.name}/><div><span className="eyebrow">MAKE IT YOURS</span><h2 id={"quick-title-"+controlId}>{product.name}</h2><b>{formatPKR(product.price)}</b></div></div><form onSubmit={submit}><label htmlFor={"quick-color-"+controlId}>Colour</label><select id={"quick-color-"+controlId} className="field" name="color" defaultValue={product.colors[0]}>{product.colors.map(color=><option key={color}>{color}</option>)}</select>{product.sizes&&<><label htmlFor={"quick-size-"+controlId}>Size</label><select id={"quick-size-"+controlId} className="field" name="size" defaultValue={product.sizes[0]}>{product.sizes.map(size=><option key={size}>{size}</option>)}</select></>}{error&&<p className="form-message" role="alert">{error}</p>}<button type="submit" className="button button-accent">Add to cart <Icon name="cart" width="17" height="17"/></button></form></dialog>
  </>;
}
