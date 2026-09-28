import { brand } from "./brand";
import { products } from "./products";
import { CartLine } from "./types";

export const getCartKey = (line: CartLine) => [line.productId, line.color, line.size ?? ""].join("::");
export const cartProducts = (cart: CartLine[]) => cart.flatMap(line => {
  const product = products.find(p => p.id === line.productId);
  return product ? [{line, product}] : [];
});
export function addLine(cart: CartLine[], line: CartLine): CartLine[] {
  const product = products.find(p => p.id === line.productId);
  if (!product || !product.colors.includes(line.color) || (product.sizes && !product.sizes.includes(line.size ?? "")) || !Number.isInteger(line.quantity) || line.quantity < 1) return cart;
  const reserved = cart.filter(x => x.productId === line.productId).reduce((n, x) => n + x.quantity, 0);
  const quantity = Math.min(line.quantity, product.stock - reserved);
  if (quantity < 1) return cart;
  const existing = cart.find(x => getCartKey(x) === getCartKey(line));
  return existing
    ? cart.map(x => getCartKey(x) === getCartKey(line) ? {...x, quantity: x.quantity + quantity} : x)
    : [...cart, {...line, quantity}];
}
export function sanitizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  return value.reduce<CartLine[]>((cart, line) => {
    if (!line || typeof line !== "object" || typeof line.productId !== "string" || typeof line.color !== "string") return cart;
    return addLine(cart, line as CartLine);
  }, []);
}
export function setLineQuantity(cart: CartLine[], key: string, quantity: number): CartLine[] {
  if (!Number.isInteger(quantity) || quantity < 0) return cart;
  const line = cart.find(x => getCartKey(x) === key);
  if (!line) return cart;
  if (!quantity) return cart.filter(x => getCartKey(x) !== key);
  const product = products.find(p => p.id === line.productId);
  if (!product) return cart;
  const others = cart.filter(x => x.productId === line.productId && getCartKey(x) !== key).reduce((n, x) => n + x.quantity, 0);
  return cart.map(x => getCartKey(x) === key ? {...x, quantity: Math.min(quantity, product.stock - others)} : x).filter(x => x.quantity > 0);
}
export function cartTotals(cart: CartLine[]) {
  const subtotal = cartProducts(cart).reduce((sum, {product, line}) => sum + product.price * line.quantity, 0);
  const delivery = subtotal > 0 && subtotal < brand.freeShippingAt ? brand.shippingFee : 0;
  return {subtotal, delivery, total: subtotal + delivery, freeShippingRemaining: Math.max(0, brand.freeShippingAt - subtotal)};
}
