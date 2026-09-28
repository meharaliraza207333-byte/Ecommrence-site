import { SiteShell } from "@/components/site-shell";
import { Catalog } from "@/components/catalog";
import { products } from "@/lib/products";
import { brand } from "@/lib/brand";
export const metadata={title:"Shop all products | "+brand.name};
export default async function Shop({searchParams}:{searchParams:Promise<{q?:string;max?:string;sort?:string;featured?:string}>}){
 const params=await searchParams;
 return <SiteShell><section className="container collection-page"><div className="collection-intro"><div><p className="eyebrow">YOUR NEXT GOOD FIND STARTS HERE</p><h1>Shop the everyday.</h1><p>Good fits, favourite cups and useful little things. All in one place.</p></div><span className="collection-count">{products.length} thoughtfully chosen pieces</span></div><Catalog key={JSON.stringify(params)} items={products} initial={{query:params.q,maxPrice:params.max&&Number.isFinite(Number(params.max))?Number(params.max):undefined,sort:params.sort,featuredOnly:params.featured==="1"}}/></section></SiteShell>;
}
