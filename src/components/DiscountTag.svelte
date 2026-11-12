<script lang="ts">

  let {product} = $props()

  function getDiscount(product) {
    const original = product.suggestedRetailPrice;
    const final = product.finalPrice;

    if (!original || original <= final) return null;
    return Math.round(((original - final) / original) * 100);
  }

  const discount = getDiscount(product);
</script>

{#if discount}
  <span class="product-card__discount">-{discount}%</span>
{/if}

<style>
  .product-card__discount {
    background-color: red;
    color: white;
    padding: 5px 8px;
    border-radius: 10px;
    margin-left: 10px;
  }
</style>