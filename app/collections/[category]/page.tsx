import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { Catalog } from "@/components/catalog";
import { products } from "@/lib/products";
import { Category } from "@/lib/types";
import { brand } from "@/lib/brand";
const copy:Record<Category,{title:string;intro:string}>={
 "t-shirts":{title:"Clothing",intro:"Easy fits, soft cotton and the pieces you'll keep in rotation."},
 mugs:{title:"Home & living",intro:"Make a little more of your mornings, one favourite cup at a time."},
 accessories:{title:"Bags & accessories",intro:"Useful little things for workdays, weekends and wherever you're headed."},
};
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;return {title:(copy[category as Category]?.title??"Collection")+" | "+brand.name};}
export default async function Collection({params,searchParams}:{params:Promise<{category:string}>;searchParams:Promise<{q?:string}>}){
 const {category}=await params,search=await searchParams;if(!Object.hasOwn(copy,category))notFound();
 const data=copy[category as Category],items=products.filter(product=>product.category===category);
 return <SiteShell><section className="container collection-page"><div className="collection-intro"><div><p className="eyebrow">THE LOGO COLLECTION</p><h1>{data.title}</h1><p>{data.intro}</p></div><span className="collection-count">{items.length} good things to discover</span></div><Catalog key={category+"-"+(search.q??"")} items={items} initial={{query:search.q}} fixedCategory/></section></SiteShell>;
}
