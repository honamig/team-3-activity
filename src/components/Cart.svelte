<script lang="ts">
  import { onMount } from "svelte";
  import type { Product } from "../js/types.mts";
  import { getLocalStorage, setLocalStorage } from "../js/utils.mts";

  let cartItems: Product[] = $state([]);

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
      <li class="cart-card">
        <a href="/products/{item.id}" class="cart-card__image">
          <img src={item.images.primaryMedium} alt={item.name} />
        </a>
        <a href="/products/{item.id}" class="cart-card__name" title={item.name}>
          <h2 class="card__name">{item.name}</h2>
        </a>
        <p class="cart-card__color">Color: {item.colors[0].colorName}</p>

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

<style>
  .product-list {
    container-type: inline-size;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cart-card {
    position: relative;
    display: grid;
    grid-template-columns: clamp(3rem, 20cqi, 5rem) minmax(0, 1fr);
    grid-template-rows: 2.5rem 1.2rem 2rem 1.25rem;
    gap: 0.375rem;
    min-width: 0;
    padding: 0.75rem;
    border-top: 1px solid transparent;
    font-size: 1rem;
  }

  .cart-card + .cart-card {
    border-top: 1px solid var(--light-grey);
  }

  .cart-card__image {
    grid-column: 1;
    grid-row: 1 / -1;
    height: clamp(3rem, 20cqi, 5rem);
    align-self: start;
  }

  .cart-card__image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .cart-card__name {
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
    margin-right: 2rem;
    align-self: start;
  }

  .cart-card .card__name {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    overflow-wrap: anywhere;
    font-size: 0.95rem;
    line-height: 1.25;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .cart-card p {
    margin: 0;
  }

  .cart-card__color {
    grid-column: 2;
    grid-row: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .cart-card__quantity {
    grid-column: 2;
    grid-row: 3;
    justify-self: end;
    gap: 0.375rem;
    white-space: nowrap;
    font-size: 0.9rem;
  }

  .cart-card__price {
    grid-column: 2;
    grid-row: 4;
    text-align: right;
    font-weight: bold;
  }

  .remove-cart-item-btn {
    position: absolute;
    top: 0.375rem;
    right: 0.375rem;
    grid-column: auto;
    grid-row: auto;
    width: 2rem;
    height: 2rem;
    padding: 0;
    line-height: 1;
  }

  @container (min-width: 34rem) {
    .cart-card {
      grid-template-columns: 4.5rem minmax(0, 1fr) 8.5rem;
      grid-template-rows: 2.5rem 1.25rem;
      column-gap: 0.75rem;
      padding-right: 3rem;
    }

    .cart-card__image {
      height: 4.5rem;
    }

    .cart-card__name {
      margin-right: 0;
    }

    .cart-card__quantity {
      grid-column: 3;
      grid-row: 1;
      align-self: end;
    }

    .cart-card__price {
      grid-column: 3;
      grid-row: 2;
    }
  }
</style>
