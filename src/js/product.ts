import type { Product } from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";
import { findProductById } from "./productData.mts";


function addProductToCart(product: Product) {
  const cart = getLocalStorage("so-cart") || [];

  // check if the product is already in the cart.
  const existingItem = cart.find(
    (item: Product) => item.id === product.id
  );

  if (existingItem) {
    // increase the quantity instead of adding a duplicate.
    existingItem.quantity = (existingItem.quantity ?? 1) + 1;
  } else {
    // add a new product with quantity 1.
    cart.push({ ...product, quantity: 1 });
  }

  setLocalStorage("so-cart", cart);

  // update the cart number immediately.
  window.dispatchEvent(new Event("cart-updated"));
}

// add to cart button event handler
async function addToCartHandler(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    addProductToCart(product);
  }
}




// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);


