import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import type { Product } from "./types.mjs";
import { findProductById } from "./productData.mts";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
    const listEl = document.querySelector(".product-list");
    if (listEl) listEl.innerHTML = htmlItems.join("");

    // attach event listeners to the remove-cart-item button
    listEl?.querySelectorAll(".remove-cart-item-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        removeFromCartHandler(e);
      });
    });
  }
}

function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">

  <a href="#" class="cart-card__image">
    <img
      src="${item.images.primaryExtraLarge}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.finalPrice}</p>
  <button data-id=${item.id} class="remove-cart-item-btn">X</button>
  
</li>`;

  return newItem;
}

function removeProductFromCart(product: Product) {
  const cart = getLocalStorage("so-cart") || [];
  const newCart = cart.filter((p: Product) => p.id !== product.id);
  setLocalStorage("so-cart", newCart);
}

async function removeFromCartHandler(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    console.log(target.dataset.id)
    const product = await findProductById(target.dataset.id);
    removeProductFromCart(product);
  }
  // re-render cart content when an item is removed
  renderCartContents();
}

renderCartContents();
