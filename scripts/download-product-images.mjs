// Download the sample catalog's public Unsplash images for reliable local delivery.
import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const source = await readFile(new URL("../lib/products.ts", import.meta.url), "utf8");
const entries = [...source.matchAll(/(?:tee|mug|accessory)\("(p\d+)","[^"]+","[^"]+",\d+,"(photo-[^"]+)"/g)];
const directory = new URL("../public/products/", import.meta.url);
await mkdir(directory, { recursive: true });
const failures = [];
for (let offset = 0; offset < entries.length; offset += 4) {
  await Promise.all(entries.slice(offset, offset + 4).map(async ([, id, photo]) => {
    const target = new URL(id + ".jpg", directory);
    try { await access(target); console.log(id + ": already downloaded"); return; } catch {}
    try {
      const response = await fetch("https://images.unsplash.com/" + photo + "?auto=format&fit=crop&w=900&q=85", { signal: AbortSignal.timeout(45000) });
      if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error("HTTP " + response.status);
      await writeFile(target, new Uint8Array(await response.arrayBuffer()));
      console.log(id + ": downloaded");
    } catch (error) { failures.push(id); console.error(id + ": " + error.message); }
  }));
}
console.log("Assets: " + fileURLToPath(directory));
if (failures.length) { console.error("Failed: " + failures.join(", ")); process.exitCode = 1; }
