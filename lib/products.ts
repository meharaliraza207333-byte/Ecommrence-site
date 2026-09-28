import { Product } from "./types";
const image = (id:string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
const tee = (id:string,slug:string,name:string,price:number,img:string,colors:string[],sizes:string[]=["S","M","L","XL"],stock=12,description="A considered essential in soft, substantial cotton."):Product => ({id,slug,name,category:"t-shirts",price,image:image(img),images:[image(img)],colors,sizes,stock,description});
const mug = (id:string,slug:string,name:string,price:number,img:string,colors:string[],stock=12):Product => ({id,slug,name,category:"mugs",price,image:image(img),images:[image(img)],colors,stock,description:"A tactile ceramic piece made for a slower daily ritual."});
const accessory = (id:string,slug:string,name:string,price:number,img:string,colors:string[],stock=12):Product => ({id,slug,name,category:"accessories",price,image:image(img),images:[image(img)],colors,stock,description:"A useful, enduring addition to the everyday."});
const sampleProducts:Product[] = [
 {...tee("p01","studio-weight-tee","Studio Weight Tee",3250,"photo-1521572163474-6864f9cf17ab",["Ink","Chalk","Olive"],undefined,12,"A substantial, everyday tee cut from soft 240gsm cotton jersey."),images:[image("photo-1521572163474-6864f9cf17ab"),image("photo-1503341504253-dff4815485f1")],badge:"New",featured:true},
 {...tee("p02","essential-crew-tee","Essential Crew Tee",2850,"photo-1503342217505-b0a15ec3261c",["Stone","Black"],undefined,18,"Clean lines, a relaxed shoulder and a dependable weight."),featured:true},
 tee("p03","field-pocket-tee","Field Pocket Tee",3450,"photo-1627225924765-552d49cf47ad",["Clay","Ink"],["S","M","L"],8,"A small chest pocket and garment-dyed finish add character."),
 {...tee("p04","linework-graphic-tee","Linework Graphic Tee",3650,"photo-1554568218-0f1715e72254",["Natural"],undefined,25,"Original linework printed in a tactile, water-based ink."),badge:"Best seller",featured:true},
 tee("p05","weekend-oversized-tee","Weekend Oversized Tee",3750,"photo-1576566588028-4147f3842f27",["Bone","Espresso"],["S/M","L/XL"],10,"An easy oversized silhouette for unhurried days."),
 tee("p06","quiet-logo-tee","Quiet Logo Tee",3150,"photo-1622445275463-afa2ab738c34",["White","Navy"],undefined,0,"Minimal front mark, maximum versatility."),
 mug("p07","daily-ceramic-mug","Daily Ceramic Mug",1950,"photo-1514228742587-6b1558fcca3d",["Cream","Charcoal"],30), mug("p08","maker-mug","Maker Mug",2250,"photo-1544787219-7f47ccb76574",["Sand","Ink"],14), mug("p09","weekend-cup","Weekend Cup",1850,"photo-1509042239860-f550ce710b93",["Oat"],16), mug("p10","two-tone-tumbler","Two Tone Tumbler",2450,"photo-1511081692775-05d0f180a065",["Clay / Cream"],9),
 {...mug("p11","morning-mug-set","Morning Mug Set",3950,"photo-1514432324607-a09d9b4aefdd",["Mixed Neutrals"],6),badge:"Set of 2",featured:true}, mug("p12","espresso-cup","Espresso Cup",1450,"photo-1533777324565-a040eb52facd",["White","Black"],20),
 {...accessory("p13","market-tote","Market Tote",1950,"photo-1553062407-98eeb64c6a62",["Natural","Ink"],22),images:[image("photo-1553062407-98eeb64c6a62"),image("photo-1597484662317-9bdc4e3c6f77")],featured:true}, accessory("p14","six-panel-cap","Six Panel Cap",2750,"photo-1588850561407-ed78c282e89b",["Stone","Navy"],17), accessory("p15","canvas-utility-pouch","Canvas Utility Pouch",1650,"photo-1544816155-12df9643f363",["Natural"],11), accessory("p16","brass-keyring","Brass Keyring",1150,"photo-1523779917675-b6ed3a42a561",["Brass"],40),
 {...accessory("p17","everyday-socks","Everyday Socks",950,"photo-1582966772680-860e372bb558",["Ecru","Charcoal"],30),sizes:["S/M","L/XL"]}, accessory("p18","studio-notebook","Studio Notebook",1250,"photo-1531346878377-a5be20888e57",["Kraft"],12), tee("p19","heavyweight-long-sleeve","Heavyweight Long Sleeve",4200,"photo-1503341504253-dff4815485f1",["Black","Natural"],undefined,15,"The familiar tee, upgraded with a full sleeve and sturdy cuff."), tee("p20","artist-edition-tee","Artist Edition Tee",3950,"photo-1485230895905-ec40ba36b9bc",["White"],["S","M","L"],5,"A limited-run collaboration, screen printed by hand."),
 mug("p21","travel-tumbler","Travel Tumbler",3250,"photo-1541167760496-1628856ab772",["Graphite"],13), accessory("p22","canvas-logo-cap","Canvas Logo Cap",2650,"photo-1521369909029-2afed882baee",["Olive"],19), accessory("p23","digital-gift-card","Digital Gift Card",5000,"photo-1513159446162-54eb8bdaa79b",["Digital"],999), accessory("p24","studio-apron","Studio Apron",4850,"photo-1503602642458-232111445657",["Natural"],7)
];
export const products: Product[] = sampleProducts.map(product => ({
 ...product,
 imagePosition: product.id === "p07" ? "20% center" : "center",
 image: product.id === "p13" ? "/products/market-tote-v2.jpg" : "/products/" + product.id + ".jpg",
 ...(product.id === "p13" ? { colors: ["Natural / Violet"] } : {}),
 images: [product.id === "p13" ? "/products/market-tote-v2.jpg" : "/products/" + product.id + ".jpg"],
}));
export const getProduct = (slug:string) => products.find(p => p.slug === slug);
