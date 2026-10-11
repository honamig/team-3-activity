import type { Product } from "./types.mts";

const baseUrl = import.meta.env.BASE_URL;

function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../../public/json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id: string) {
  const product = await fetch(`${baseUrl}/products/${id}`);
  return product;
}
