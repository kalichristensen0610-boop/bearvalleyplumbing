import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = join(root, "dist");
const client = join(dist, "client");

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/request-service",
  "/residential-plumbing",
  "/services",
  "/service-areas",
];

const serviceSlugs = [
  "plumbing-repairs",
  "drain-sewer",
  "water-heaters",
  "pipe-leak-repair",
  "remodel-plumbing",
  "water-quality",
  "new-construction",
];

const locationSlugs = [
  "victor-id",
  "driggs-id",
  "idaho-falls-id",
  "rexburg-id",
  "bear-lake-county-id",
  "treasure-valley-id",
];

const routes = [
  ...staticRoutes,
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  ...locationSlugs.map((slug) => `/service-areas/${slug}`),
  ...locationSlugs.flatMap((location) =>
    serviceSlugs.map((service) => `/service-areas/${location}/${service}`),
  ),
];

const workerUrl = pathToFileURL(join(dist, "server", "index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  IMAGES: {
    input() {
      return {
        transform() {
          return {
            output() {
              return Promise.resolve({ response: () => new Response() });
            },
          };
        },
      };
    },
  },
};

const context = { waitUntil() {}, passThroughOnException() {} };

for (const entry of await readdir(client)) {
  await cp(join(client, entry), join(dist, entry), { recursive: true, force: true });
}

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://rosybrown-armadillo-385824.hostingersite.com${route}`, {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  if (!response.ok) throw new Error(`Static export failed for ${route}: ${response.status}`);

  const folder = route === "/" ? dist : join(dist, route.slice(1));
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, "index.html"), await response.text(), "utf8");
}

for (const route of ["/robots.txt", "/sitemap.xml"]) {
  const response = await worker.fetch(
    new Request(`https://rosybrown-armadillo-385824.hostingersite.com${route}`),
    env,
    context,
  );
  if (response.ok) await writeFile(join(dist, route.slice(1)), await response.text(), "utf8");
}

await writeFile(
  join(dist, ".htaccess"),
  "DirectoryIndex index.html\nOptions -Indexes\n",
  "utf8",
);

console.log(`Hostinger static export complete: ${routes.length} pages.`);
