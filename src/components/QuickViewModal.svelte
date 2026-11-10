<script lang="ts">
  import { onMount } from "svelte";

  let { product, isOpen, onCloseView } = $props();
</script>

<div class={`quick-view-backdrop ${isOpen ? "" : "hide"}`}>
  <div class="quick-view">
    <div class="btn-container">
      <button onclick={onCloseView} class="close-view-btn">X</button>
    </div>
    <div class="product-details">
      <h3>{product?.name}</h3>
      <p>Brand: {product?.brand.name}</p>
      <p>Final Price: ${product?.finalPrice}</p>
      <p>{product?.isNew ? "New" : "Old"}</p>
      <p>{product?.isClearance ? "Clearance" : ""}</p>
      
    </div>
  </div>
</div>

<style>
  .quick-view-backdrop.hide {
    display: none;
  }

  .quick-view-backdrop {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .quick-view {
    max-width: 520px;
    width: 90%;
    height: 80%;
    border-radius: 10px;
    box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.08);

    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  .close-view-btn {
    align-self: flex-end;
    font-size: 14px;
    background-color: transparent;
    color: black;
    margin: 1px;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  
  .product-details {
    flex: 1;
    padding: 10px;
  }
</style>
