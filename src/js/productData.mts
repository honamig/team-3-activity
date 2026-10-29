import type { Product } from "./types.mts";

const baseUrl = import.meta.env.BASE_URL;

function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProducts(category = "tents") {
  const response = await fetch(baseURL + `products?category=${category}`)
  const products = await convertToJson(response)
  console.log(products)
  return products
}



export async function findProductById(id:string) {
  const response = await fetch(baseURL + `products/${id}`)
  const product = await convertToJson(response)
  console.log(product)
  return product
}
