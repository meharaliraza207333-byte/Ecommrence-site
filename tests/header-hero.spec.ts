import { expect, test } from "@playwright/test";

test("header and hero reflow cleanly at narrow and intermediate widths", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  test.skip(testInfo.project.name !== "desktop", "Check resize boundaries once using the desktop browser.");
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open search", exact: true })).toBeEnabled();
  for (const width of [320, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 1000 });
    const geometry = await page.getByTestId("home-hero").evaluate(hero => {
      const bounds = hero.getBoundingClientRect();
      const copy = hero.querySelector("[data-hero-copy]")!;
      const heading = copy.querySelector("h1")!.getBoundingClientRect();
      const photograph = hero.querySelector("img")!.getBoundingClientRect();
      return { left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom,
        headingLeft: heading.left, headingBottom: heading.bottom, imageLeft: photograph.left,
        imageRight: photograph.right, imageTop: photograph.top, imageBottom: photograph.bottom,
        copyBackground: getComputedStyle(copy).backgroundColor };
    });
    expect(geometry.left).toBe(0);
    expect(geometry.right).toBe(width);
    expect(geometry.imageLeft).toBe(geometry.left);
    expect(geometry.imageRight).toBe(geometry.right);
    expect(geometry.imageTop).toBe(geometry.top);
    expect(geometry.imageBottom).toBe(geometry.bottom);
    expect(geometry.headingLeft).toBeGreaterThan(geometry.left);
    expect(geometry.headingBottom).toBeLessThan(geometry.bottom);
    expect(geometry.copyBackground).toBe("rgba(0, 0, 0, 0)");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const actions = page.getByRole("navigation", { name: "Your shopping" });
    await expect(actions.getByRole("button", { name: "Open search", exact: true })).toBeVisible();
    await expect(actions.getByRole("link", { name: "Your account", exact: true })).toBeVisible();
    await expect(actions.getByRole("link", { name: "Wishlist, 0 saved items", exact: true })).toBeVisible();
    await expect(actions.getByRole("button", { name: "Open cart, 0 items", exact: true })).toBeVisible();
    const primary = page.getByTestId("home-hero").getByRole("link", { name: "Shop the collection", exact: true });
    const before = await primary.boundingBox();
    await primary.hover();
    expect(await primary.boundingBox()).toEqual(before);
  }
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "tablet", width: 820, height: 1180 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.evaluate(() => { window.scrollTo({ top: 0, behavior: "instant" }); return document.fonts.ready.then(() => undefined); });
    await expect.poll(() => page.getByTestId("home-hero").locator("img").evaluate(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
    await expect.poll(() => page.getByTestId("home-hero").locator("img").evaluate(image => (image as HTMLImageElement).currentSrc)).toContain(viewport.width < 768 ? "everyday-banner-mobile-v2" : "everyday-banner-wide-v2");
    const alignment = await page.getByTestId("home-hero").evaluate(hero => ({ heroTop: hero.getBoundingClientRect().top, headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom }));
    expect(alignment.heroTop).toBe(alignment.headerBottom);
    await page.screenshot({ path: "test-results/redesign/" + viewport.name + ".png", style: "nextjs-portal { visibility: hidden; }" });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  const clothing = page.getByRole("navigation", { name: "Product departments" }).getByRole("button", { name: "Clothing", exact: true });
  await clothing.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#department-panel").getByRole("link", { name: "All T-shirts", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(clothing).toBeFocused();
});
