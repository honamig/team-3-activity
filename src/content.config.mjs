import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders"; // Not available with legacy API

// we can also create collections that load from markdown files in a directory...this is an example of how to do that.
// const posts = defineCollection({
//   loader: glob({ pattern: "**/*.md", base: "./src/content/blog" })
// });

// load our product info from the tents.json file
const products = defineCollection({
  loader: async () => {
    const baseUrl = import.meta.env.PUBLIC_SERVER_URL?.trim();
    if (!baseUrl) {
      throw new Error(
        "PUBLIC_SERVER_URL must be set when building the product collection.",
      );
    }

    const url = new URL(
      "products?limit=200&offset=0",
      `${baseUrl.replace(/\/+$/, "")}/`,
    );
    const response = await fetch(url);
    const body = await response.text();
    const responseUrl = new URL(response.url);
    const responseDetails = [
      `requested URL ${url}`,
      `requested host ${url.host}`,
      `requested path ${url.pathname}`,
      `response host ${responseUrl.host}`,
      `response path ${responseUrl.pathname}`,
      `redirected ${response.redirected}`,
      `deploy context ${process.env.CONTEXT ?? "local"}`,
      `HTTP ${response.status} ${response.statusText}`,
      `content-type ${response.headers.get("content-type") ?? "unknown"}`,
      `server ${response.headers.get("server") ?? "unknown"}`,
      `Render request ID ${response.headers.get("rndr-id") ?? "none"}`,
      `Cloudflare request ID ${response.headers.get("cf-ray") ?? "none"}`,
    ].join(", ");

    if (!response.ok) {
      throw new Error(
        `Product collection request failed (${responseDetails}). Response: ${body.slice(0, 200)}`,
      );
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch (cause) {
      throw new Error(
        `Product collection expected JSON (${responseDetails}). Response: ${body.slice(0, 200)}`,
        { cause },
      );
    }

    if (!Array.isArray(data?.results)) {
      throw new Error(`Product collection expected a results array from ${url}.`);
    }
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.results;
  },
});

export const collections = { products };
