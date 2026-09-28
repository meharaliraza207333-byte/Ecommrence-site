export type Category = "t-shirts" | "mugs" | "accessories";
export type Product = { id:string; slug:string; name:string; category:Category; price:number; compareAt?:number; image:string; imagePosition?:string; images:string[]; colors:string[]; sizes?:string[]; badge?:string; description:string; stock:number; featured?:boolean; };
export type CartLine = { productId:string; quantity:number; color:string; size?:string };
