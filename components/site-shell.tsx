import { Header } from "./header";
import { Footer } from "./footer";
import { CartDrawer } from "./cart-drawer";
export function SiteShell({children}:{children:React.ReactNode}) {
  return <><Header/><main id="main-content">{children}</main><Footer/><CartDrawer/></>;
}
