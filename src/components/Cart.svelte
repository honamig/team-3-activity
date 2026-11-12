<script lang="ts">
  import { onMount } from "svelte";
  import type { Product } from "../js/types.mts";
  import { getLocalStorage, setLocalStorage } from "../js/utils.mts";

  let cartItems: Product[] = $state([]);
  let total = $derived(
    cartItems.reduce(
      (sum, item) => sum + item.finalPrice * (item.quantity ?? 1),
      0,
    ),
  );

  onMount(() => {
    cartItems = getLocalStorage("so-cart") ?? [];
  });

  function saveCart() {
    setLocalStorage("so-cart", cartItems);
    window.dispatchEvent(new Event("cart-updated"));
  }

  function updateQuantity(productId: string, change: number) {
    cartItems = cartItems
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity ?? 1) + change }
          : item,
      )
      .filter((item) => (item.quantity ?? 1) > 0);

    saveCart();
  }

  function removeFromCart(productId: string) {
    cartItems = cartItems.filter((item) => item.id !== productId);
    saveCart();
  }
</script>

<ul class="product-list">
  {#each cartItems as item}
    <li class="cart-card divider">
      <a href="/products/{item.id}" class="cart-card__image">
        <img src={item.images.primaryMedium} alt={item.name} />
      </a>
      <a href="/products/{item.id}">
        <h2 class="card__name">{item.name}</h2>
      </a>
      <p class="cart-card__color">{item.colors[0].colorName}</p>

      <div class="cart-card__quantity">
        <button
          type="button"
          class="decrease-qty-btn"
          onclick={() => updateQuantity(item.id, -1)}
          aria-label="Decrease quantity">−</button
        >
        <span>Qty: {item.quantity ?? 1}</span>
        <button
          type="button"
          class="increase-qty-btn"
          onclick={() => updateQuantity(item.id, 1)}
          aria-label="Increase quantity">+</button
        >
      </div>
      <p class="cart-card__price">${item.finalPrice.toFixed(2)}</p>
      <button
        type="button"
        class="remove-cart-item-btn"
        onclick={() => removeFromCart(item.id)}
        aria-label="Remove {item.name} from cart">X</button
      >
    </li>
  {/each}
</ul>

{#if cartItems.length > 0}
  <div class="cart-footer">
    <p class="cart-total">Total: ${total.toFixed(2)}</p>
  </div>
{:else}
  <p>Your cart is empty.</p>
{/if}
