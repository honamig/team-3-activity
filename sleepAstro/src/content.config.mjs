import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";

const products = defineCollection({
  loader: file("public/json/tents.json"),
});

export const collections = { products };
