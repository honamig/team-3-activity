<script lang="ts">
  import type { Product } from "../js/types.mts";
  import DiscountTag from "./DiscountTag.svelte";
  let { product, onViewClick } = $props();
</script>

<li class="product-card">
  <a href={`/products/${product.id}/`}>
    <picture>
      <!-- small image -->
      <source
        media="(max-width: 600px)"
        srcset={product.images.primarySmall}
      />

      <!-- Medium image -->
      <source
        media="(max-width: 1024px)"
        srcset={product.images.primaryMedium}
      />

      <!-- Large image -->
      <img
        src={product.images.primaryLarge}
        alt={product.nameWithoutBrand}
      />
    </picture>

    <h3 class="card__brand">{product.brand.name}</h3>
    <h2 class="card__name">{product.nameWithoutBrand}</h2>
    <p class="product-card__price">${product.finalPrice}
      <DiscountTag product={product}/>
    </p>
    </a
  >
  <button onclick={() => onViewClick(product)} class="quick-view-btn">Quick View</button>
</li>

<style>
  .quick-view-btn {
    font-size: 14px;
    border-radius: 5px;
  }
</style>
