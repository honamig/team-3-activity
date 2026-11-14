// read the shopping cart from localStorage and update the badge.
export function updateCartCount(): void {
  const badge = document.getElementById("cart-count");

  // stop if the badge does not exist on the page.
  if (!badge) return;

  let count = 0;

  try {
    // get the saved cart. Use an empty array if nothing is saved.
    const cart = JSON.parse(localStorage.getItem("so-cart") || "[]");

    // Each product in the cart array counts as one item.
    if (Array.isArray(cart)) {
      count = cart.length;
    }
  } catch {
    // if the saved cart data is invalid, show an empty cart.
    count = 0;
  }

  // show the current number of items.
  badge.textContent = String(count);

  // hide the badge when the cart is empty.
  badge.hidden = count === 0;
}

// Animate the cart icon when a product is added.
export function animateCart(): void {
  const cartLink = document.querySelector(".cart a");

  if (!cartLink) return;

  // Remove the animation class.
  cartLink.classList.remove("cart-animate");

  // Restart the animation.
  cartLink.getBoundingClientRect();
  cartLink.classList.add("cart-animate");
}
