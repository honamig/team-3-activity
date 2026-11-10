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

    // increase quantity when the + button is clicked.
    listEl?.querySelectorAll(".increase-qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = (btn as HTMLButtonElement).dataset.id;

        if (productId) {
          updateQuantity(productId, 1);
        }
      });
    });

    // decrease quantity when the - button is clicked.
    listEl?.querySelectorAll(".decrease-qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = (btn as HTMLButtonElement).dataset.id;

        if (productId) {
          updateQuantity(productId, -1);
        }
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

<div class="cart-card__quantity">
    <button class="decrease-qty-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
    <span>Qty: ${item.quantity ?? 1}</span>
    <button class="increase-qty-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
  </div>


  <p class="cart-card__price">$${item.finalPrice}</p>
  <button data-id=${item.id} class="remove-cart-item-btn">X</button>
  
</li>`;

  return newItem;
}


// increase or decrease the quantity of a product in the cart.
function updateQuantity(productId: string, change: number) {
  const cart: Product[] = getLocalStorage("so-cart") || [];

  const updatedCart = cart.map((item) => {
    if (item.id === productId) {
      const newQuantity = (item.quantity ?? 1) + change;

      return {
        ...item,
        quantity: newQuantity,
      };
    }

    return item;
  })
   .filter((item) => (item.quantity ?? 1) > 0);

  // save the updated quantities.
  setLocalStorage("so-cart", updatedCart);

  // refresh the cart display.
  renderCartContents();
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
