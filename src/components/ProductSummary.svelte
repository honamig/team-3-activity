<script lang="ts">
  import type { Product } from "../js/types.mts";
  import DiscountTag from "./DiscountTag.svelte";
  let { product, onViewClick }: { product: Product; onViewClick: Function } =
    $props();
</script>

<li class="product-card">
  <a href={`/products/${product.id}/`}>
    <img src={product.images.primaryLarge} alt={product.nameWithoutBrand} />
    <h3 class="card__brand">{product.brand.name}</h3>
    <h2 class="card__name">{product.nameWithoutBrand}</h2>
    <p class="product-card__price">
      ${product.finalPrice}
      <DiscountTag {product} />
    </p>
  </a>
  <button onclick={() => onViewClick(product)} class="quick-view-btn"
    >Quick View</button
  >
</li>

<style>
  .quick-view-btn {
    font-size: 14px;
    border-radius: 5px;
  }
</style>
