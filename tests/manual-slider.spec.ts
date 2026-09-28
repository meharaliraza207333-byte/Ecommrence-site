import { expect, test } from "@playwright/test";

test("campaign image and manual category/product sliders work in both directions", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const banner = page.getByTestId("home-hero").locator("img");
  await expect(banner).toHaveAttribute("src", /everyday-banner-wide-v2/);
  await expect.poll(() => banner.evaluate(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
  for (const slider of [
    { name: "Categories slider", controls: "categories" },
    { name: "Recommended products slider", controls: "products" },
    { name: "Affordable products slider", controls: "affordable products" },
  ]) {
    const region = page.getByRole("region", { name: slider.name, exact: true });
    const track = region.locator("[data-slider-track]");
    const previous = region.getByRole("button", { name: "Previous " + slider.controls, exact: true });
    const next = region.getByRole("button", { name: "Next " + slider.controls, exact: true });
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    await next.click();
    await expect.poll(() => track.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    await expect(previous).toBeEnabled();
    await previous.click();
    await expect.poll(() => track.evaluate(element => element.scrollLeft)).toBeLessThan(2);
    await expect(previous).toBeDisabled();
    await track.focus();
    await page.keyboard.press("End");
    await expect(next).toBeDisabled();
    await expect(previous).toBeEnabled();
    await page.keyboard.press("Home");
    await expect(previous).toBeDisabled();
    await page.keyboard.press("ArrowRight");
    await expect.poll(() => track.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    await page.keyboard.press("ArrowLeft");
    await expect.poll(() => track.evaluate(element => element.scrollLeft)).toBeLessThan(2);
  }
  const shelf = page.locator(".shop-section").first();
  await shelf.getByRole("button", { name: "Next products", exact: true }).click();
  await shelf.getByRole("button", { name: "Clothing", exact: true }).click();
  await expect(shelf.locator(".product-card-category")).toHaveText(Array(8).fill("CLOTHING"));
  await expect.poll(() => shelf.locator("[data-slider-track]").evaluate(element => element.scrollLeft)).toBeLessThan(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("heading", { name: "A little something for you.", exact: true }).evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.screenshot({ path: "test-results/sliders/" + testInfo.project.name + "-categories.png", style: "nextjs-portal { visibility: hidden; }" });
  await shelf.getByRole("heading").evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.screenshot({ path: "test-results/sliders/" + testInfo.project.name + "-products.png", style: "nextjs-portal { visibility: hidden; }" });
});
