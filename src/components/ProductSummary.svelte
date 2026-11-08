<script lang="ts">
  import type { Product } from "../js/types.mts";
  let { product, onViewClick } = $props();
  
  console.log(product)
</script>

<li class="product-card">
  <a href={`/products/${product.id}/`}>
    <img src={product.images.primaryLarge} alt={product.nameWithoutBrand} />
    <h3 class="card__brand">{product.brand.name}</h3>
    <h2 class="card__name">{product.nameWithoutBrand}</h2>
    <p class="product-card__price">${product.finalPrice}</p></a
  >
  <button onclick={() => onViewClick(product)} class="quick-view-btn">Quick View</button>
</li>

<style>
  .quick-view-btn {
    font-size: 14px;
    border-radius: 5px;
  }
</style>
