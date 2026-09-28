"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { Icon } from "./icons";

export type CatalogOptions = {query?:string;department?:string;maxPrice?:number;sort?:string;featuredOnly?:boolean};
export function Catalog({items,initial={},fixedCategory=false}:{items:Product[];initial?:CatalogOptions;fixedCategory?:boolean}){
 const [query,setQuery]=useState(initial.query??""),[department,setDepartment]=useState(initial.department??""),[maxPrice,setMaxPrice]=useState(initial.maxPrice??100000),[sort,setSort]=useState(initial.sort??"featured"),[inStock,setInStock]=useState(false),[featuredOnly,setFeaturedOnly]=useState(initial.featuredOnly??false);
 const matches=items.filter(product=>(!department||product.category===department)&&product.price<=maxPrice&&(!inStock||product.stock>0)&&(!featuredOnly||product.featured)&&[product.name,product.description,...product.colors].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
 const sorted=[...matches].sort((a,b)=>sort==="price-asc"?a.price-b.price:sort==="price-desc"?b.price-a.price:sort==="name"?a.name.localeCompare(b.name):sort==="newest"?b.id.localeCompare(a.id):Number(!!b.featured)-Number(!!a.featured));
 function reset(){setQuery("");setDepartment(initial.department??"");setMaxPrice(100000);setInStock(false);setFeaturedOnly(false);setSort("featured");}
 return <>
  {!fixedCategory&&<div className="catalog-departments" aria-label="Filter by department">{[{name:"All products",value:""},{name:"Clothing",value:"t-shirts"},{name:"Home & living",value:"mugs"},{name:"Accessories",value:"accessories"}].map(item=><button key={item.value} aria-pressed={department===item.value} onClick={()=>setDepartment(item.value)}>{item.name}</button>)}</div>}
  <div className="catalog-search"><label className="sr-only" htmlFor="catalog-query">Filter products</label><input id="catalog-query" className="field" placeholder="Find a product in this collection..." value={query} onChange={event=>setQuery(event.target.value)}/>{(query||inStock||featuredOnly||maxPrice<100000)&&<button className="text-link" onClick={reset}>Clear filters <Icon name="close" width="13" height="13"/></button>}</div>
  <div className="catalog-toolbar"><p><strong>{sorted.length}</strong> {sorted.length===1?"product":"products"}{query?' matching "'+query+'"':""}</p><div className="catalog-filters"><label>Budget<select value={maxPrice} onChange={event=>setMaxPrice(Number(event.target.value))}><option value={100000}>Any price</option><option value={2000}>Under PKR 2,000</option><option value={3500}>Under PKR 3,500</option><option value={5000}>Under PKR 5,000</option></select></label><label><input type="checkbox" checked={inStock} onChange={event=>setInStock(event.target.checked)}/> In stock</label><label>Sort by<select value={sort} onChange={event=>setSort(event.target.value)}><option value="featured">Recommended</option><option value="newest">Newest first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Product name</option></select></label></div></div>
  {sorted.length?<div className="catalog-grid">{sorted.map((product,index)=><ProductCard key={product.id} product={product} eager={index<4}/>)}</div>:<div className="empty-state"><span className="empty-icon"><Icon name="search" width="30" height="30"/></span><h3>No matches just yet.</h3><p>Try another search or clear a filter to find your next favourite.</p><button className="button button-dark" onClick={reset}>Clear filters</button></div>}
 </>;
}
