import { SiteShell } from "@/components/site-shell";
import { Catalog } from "@/components/catalog";
import { products } from "@/lib/products";
import { brand } from "@/lib/brand";
export const metadata={title:"Find your favourite | "+brand.name};
export default async function Search({searchParams}:{searchParams:Promise<{q?:string;department?:string}>}){
 const {q="",department=""}=await searchParams;
 const category=["t-shirts","mugs","accessories"].includes(department)?department:"";
 return <SiteShell><section className="container collection-page"><div className="collection-intro"><div><p className="eyebrow">A WORLD OF GOOD FINDS</p><h1>{q?'Results for "'+q+'"':"What are you looking for?"}</h1><p>Search by product, colour or the little thing you have in mind.</p></div></div><Catalog key={q+"-"+category} items={products} initial={{query:q,department:category}}/></section></SiteShell>;
}
