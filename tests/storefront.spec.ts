import { expect, test } from "@playwright/test";
import { addLine,cartTotals,sanitizeCart,setLineQuantity,getCartKey } from "../lib/cart";

test("cart calculations cap combined variant stock and calculate delivery correctly",()=>{
  const first={productId:"p01",color:"Ink",size:"M",quantity:1};
  const cart=addLine([],first);
  expect(cartTotals(cart)).toMatchObject({subtotal:3250,delivery:250,total:3500});
  expect(cartTotals(setLineQuantity(cart,getCartKey(first),2))).toMatchObject({subtotal:6500,delivery:0,total:6500});
  const full=addLine(cart,{...first,color:"Chalk",quantity:999});
  expect(full.reduce((sum,line)=>sum+line.quantity,0)).toBe(12);
  expect(addLine(full,first)).toBe(full);
  expect(sanitizeCart([null,{productId:"bad"},{...first,quantity:-3}])).toEqual([]);
});

test("five dropdowns work with real category destinations",async({page})=>{
  await page.goto("/");
  const mobileMenu=page.getByRole("button",{name:"Open menu",exact:true});
  if(await mobileMenu.isVisible()) await mobileMenu.click();
  const menu=page.getByRole("navigation",{name:"Product departments"});
  await expect(menu.getByRole("button")).toHaveCount(5);
  for(const label of ["Shop All","Clothing","Home & Living","Bags & Accessories","Discover"]){
    const trigger=menu.getByRole("button",{name:label,exact:true});
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded","true");
    await expect(page.locator("#department-panel")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#department-panel")).toHaveCount(0);
  }
  await menu.getByRole("button",{name:"Clothing",exact:true}).click();
  await page.getByRole("link",{name:"Oversized fits",exact:true}).click();
  await expect(page).toHaveURL(/collections\/t-shirts\?q=oversized/);
  await expect(page.locator(".catalog-grid .product-card")).toHaveCount(1);
});

test("search, wishlist, variant selection, persisted cart and totals work",async({page})=>{
  // This end-to-end flow navigates six routes and exercises both shopping dialogs.
  test.setTimeout(90_000);
  const errors:string[]=[];
  page.on("pageerror",error=>errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button",{name:"Save Studio Weight Tee to wishlist",exact:true}).click();
  await page.getByRole("button",{name:"Choose options for Studio Weight Tee",exact:true}).click();
  const options=page.getByRole("dialog");
  await options.getByLabel("Size",{exact:true}).selectOption("M");
  await options.getByRole("button",{name:"Add to cart",exact:true}).click();
  const drawer=page.getByRole("dialog");
  await expect(drawer.getByRole("heading",{name:"Shopping cart (1)"})).toBeVisible();
  await expect(drawer.locator(".summary-total")).toContainText("3,500");
  await drawer.getByRole("button",{name:"Increase Studio Weight Tee",exact:true}).click();
  await expect(drawer.locator(".summary-total")).toContainText("6,500");
  await expect(drawer.locator(".shipping-progress")).toContainText("unlocked free delivery");
  await drawer.getByRole("link",{name:"View full cart",exact:true}).click();
  await expect(page).toHaveURL(/\/cart$/);
  await page.reload();
  await expect(page.getByRole("button",{name:"Open cart, 2 items",exact:true})).toBeVisible();
  await expect(page.locator(".cart-row")).toContainText("Size M");
  await page.goto("/wishlist");
  await expect(page.locator("main .product-card-title").filter({hasText:"Studio Weight Tee"})).toBeVisible();
  await page.getByRole("button",{name:"Open search",exact:true}).click();
  await expect(page.locator("#header-query")).toBeFocused();
  await page.locator("#header-query").fill("mug");
  await page.getByRole("dialog").getByRole("button",{name:"Search products",exact:true}).click();
  await expect(page).toHaveURL(/search\?/);
  await expect(page.getByRole("heading",{level:1})).toContainText('Results for "mug"');
  await expect(page.locator(".catalog-grid .product-card")).toHaveCount(3);
  await page.goto("/checkout");
  await expect(page.getByRole("heading",{name:"Where should we send it?"})).toBeVisible();
  await expect(page.locator("main .summary-total")).toContainText("6,500");
  await page.goto("/cart");
  await page.getByRole("button",{name:"Remove",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Your next favourite is waiting."})).toBeVisible();
  expect(errors).toEqual([]);
});

test("home, shop and product stay within the viewport and images load",async({page},testInfo)=>{
  // This diagnostic loads every slide, captures the whole page and visits two more routes.
  test.setTimeout(90_000);
  const browserErrors:string[]=[];
  page.on("pageerror",error=>browserErrors.push(error.message));
  page.on("console",message=>{if(message.type()==="error")browserErrors.push(message.text());});
  await page.goto("/");
  await page.evaluate(()=>document.fonts.ready);
  await page.locator(".product-card").first().waitFor();
  // Load campaign images as well as product thumbnails throughout the page.
  for (const picture of await page.locator("main img:visible").all()) {
    await picture.evaluate(image=>image.scrollIntoView({behavior:"instant",block:"center"}));
  }
  await page.evaluate(()=>{window.scrollTo({top:0,behavior:"instant"});document.querySelectorAll("[data-slider-track]").forEach(element=>element.scrollTo({left:0,behavior:"instant"}));});
  await expect.poll(()=>page.locator("main img").evaluateAll(images=>images.filter(image=>image.getBoundingClientRect().width>0).every(image=>(image as HTMLImageElement).complete&&(image as HTMLImageElement).naturalWidth>0))).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:"test-results/"+testInfo.project.name+"-home.png",fullPage:true,caret:"initial"});
  await page.screenshot({path:"test-results/"+testInfo.project.name+"-first-screen.png",caret:"initial"});
  await page.locator(".shop-section").first().screenshot({path:"test-results/"+testInfo.project.name+"-products.png",caret:"initial"});
  await page.locator(".store-footer").screenshot({path:"test-results/"+testInfo.project.name+"-footer.png",caret:"initial"});
  const readingSizes = await page.evaluate(() => {
    const size = (selector: string) => parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize);
    return { body: size("body"), navigation: size('nav[aria-label="Product departments"] button'), product: size(".product-card-title"), footer: size(".footer-column"), search: size("#header-query") };
  });
  expect(readingSizes.body).toBeGreaterThanOrEqual(16);
  expect(readingSizes.navigation).toBeGreaterThanOrEqual(14);
  expect(readingSizes.product).toBeGreaterThanOrEqual(15);
  expect(readingSizes.footer).toBeGreaterThanOrEqual(14);
  expect(readingSizes.search).toBeGreaterThanOrEqual(15);
  await page.goto("/shop");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.goto("/products/studio-weight-tee");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:"test-results/"+testInfo.project.name+"-product.png",fullPage:true,caret:"initial"});
  expect(browserErrors).toEqual([]);
});

test("finished hero, search panel, product tabs and FAQs work",async({page})=>{
  await page.goto("/");
  const hero=page.getByTestId("home-hero");
  await expect(hero.getByRole("heading",{level:1})).toHaveText("Good things, made for every day.");
  await expect(hero.getByRole("link",{name:"Shop the collection",exact:true})).toHaveAttribute("href","/shop?featured=1");
  await expect(hero.getByRole("link",{name:"Explore all",exact:true})).toHaveAttribute("href","/shop");
  await expect(hero.getByRole("button")).toHaveCount(0);
  await expect(hero).not.toContainText("THE LOGO EDIT");
  const searchTrigger=page.getByRole("button",{name:"Open search",exact:true});
  await searchTrigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#header-query")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(searchTrigger).toBeFocused();
  await searchTrigger.click();
  await page.getByRole("button",{name:"Close search",exact:true}).click();
  await expect(searchTrigger).toBeFocused();
  const shelf=page.locator(".shop-section").first();
  await shelf.locator(".shelf-tabs").getByRole("button",{name:"Home & living",exact:true}).click();
  await expect(shelf.locator(".product-card-category")).toHaveText(Array(7).fill("HOME & LIVING"));
  await shelf.getByRole("button",{name:"Next products",exact:true}).click();
  await expect.poll(()=>shelf.locator("[data-slider-track]").evaluate(element=>element.scrollLeft)).toBeGreaterThan(0);
  await shelf.getByRole("button",{name:"Previous products",exact:true}).click();
  await expect.poll(()=>shelf.locator("[data-slider-track]").evaluate(element=>element.scrollLeft)).toBeLessThan(2);
  await page.locator(".faq-list summary").filter({hasText:"Can I pay when my order arrives?"}).click();
  await expect(page.locator(".faq-list details[open]")).toContainText("pay the courier in PKR");
  await page.getByRole("button",{name:"Choose options for Daily Ceramic Mug",exact:true}).last().click();
  const options=page.getByRole("dialog");
  await options.getByLabel("Colour",{exact:true}).selectOption("Charcoal");
  await options.getByRole("button",{name:"Add to cart",exact:true}).click();
  await expect(page.getByRole("dialog").locator(".drawer-item")).toContainText("Charcoal");
  await expect(page.getByRole("dialog").locator(".summary-total")).toContainText("2,200");
});

test("a damaged saved cart does not break the storefront",async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem("brand-cart","not-json");
    localStorage.setItem("brand-wishlist",'{"invalid":true}');
  });
  await page.goto("/cart");
  await expect(page.getByRole("heading",{name:"Your next favourite is waiting."})).toBeVisible();
});
