"use client";
import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { CartLine } from "@/lib/types";
import { products } from "@/lib/products";
import { addLine, getCartKey, sanitizeCart, setLineQuantity } from "@/lib/cart";

type State = {cart: CartLine[]; wishlist: string[]; hydrated: boolean};
type ShopContext = State & {
  cartCount: number; drawerOpen: boolean; setDrawerOpen: (open:boolean)=>void;
  addToCart: (line:CartLine)=>boolean; updateQuantity:(key:string,quantity:number)=>void;
  removeFromCart:(key:string)=>void; toggleWish:(id:string)=>void; clearCart:()=>void;
};
const Context = createContext<ShopContext | null>(null);
const serverState: State = {cart:[],wishlist:[],hydrated:false};
let state: State = serverState;
const listeners = new Set<()=>void>();
function readStorage(key:string): unknown {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function loadState() {
  const wishes = readStorage("brand-wishlist");
  state = {cart:sanitizeCart(readStorage("brand-cart")),wishlist:Array.isArray(wishes)?[...new Set(wishes.filter((id):id is string=>typeof id==="string"&&products.some(p=>p.id===id)))]:[],hydrated:true};
}
function getSnapshot() { if (!state.hydrated) loadState(); return state; }
function subscribe(listener:()=>void) {
  listeners.add(listener);
  const sync = (event:StorageEvent) => {
    if (event.key === null || event.key === "brand-cart" || event.key === "brand-wishlist") { loadState(); listeners.forEach(notify=>notify()); }
  };
  window.addEventListener("storage", sync);
  return () => {listeners.delete(listener);window.removeEventListener("storage",sync)};
}
function commit(next:State) {
  state = next;
  try {localStorage.setItem("brand-cart",JSON.stringify(state.cart));localStorage.setItem("brand-wishlist",JSON.stringify(state.wishlist));} catch { /* Shopping still works if this browser blocks persistence. */ }
  listeners.forEach(notify=>notify());
}
export function ShopProvider({children}:{children:React.ReactNode}) {
  const snapshot = useSyncExternalStore(subscribe,getSnapshot,()=>serverState);
  const [drawerOpen,setDrawerOpen] = useState(false);
  const value: ShopContext = {...snapshot,drawerOpen,setDrawerOpen,
    cartCount:snapshot.cart.reduce((n,line)=>n+line.quantity,0),
    addToCart(line) {const cart=addLine(state.cart,line);if(cart===state.cart)return false;commit({...state,cart});setDrawerOpen(true);return true;},
    updateQuantity(key,quantity) {commit({...state,cart:setLineQuantity(state.cart,key,quantity)});},
    removeFromCart(key) {commit({...state,cart:state.cart.filter(line=>getCartKey(line)!==key)});},
    toggleWish(id) {if(!products.some(p=>p.id===id))return;commit({...state,wishlist:state.wishlist.includes(id)?state.wishlist.filter(x=>x!==id):[...state.wishlist,id]});},
    clearCart() {commit({...state,cart:[]});setDrawerOpen(false);},
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useShop(){const value=useContext(Context);if(!value)throw new Error("ShopProvider is required");return value;}
export {cartProducts,getCartKey} from "@/lib/cart";
