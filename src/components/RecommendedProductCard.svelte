<script lang="ts">
  import type { Product } from "../js/types.mts";
  let { product} = $props();
</script>

<div class="rec-product-card">
  <a href={`/products/${product.id}/`}>
    <img src={product.images.primaryLarge} alt={product.nameWithoutBrand} />
    <p class="card__brand">{product.brand.name}</p>
    <h3 class="card__name">{product.nameWithoutBrand}</h3>
    <p class="product-card__price">${product.finalPrice}
    </p>
    </a
  >
  </div>

<style>
  .rec-product-card {
    max-width: 280px;
    padding: 10px;

    p {
      font-size: 12px;
    }

    h3 {
      font-size: 13px;
    }

    img {
      height: 150px;
      object-fit: contain;
    }
  }
</style>
