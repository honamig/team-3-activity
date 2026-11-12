<script lang="ts">
  import RecommendedProductCard from "./RecommendedProductCard.svelte";
  const {products} = $props()

</script>

<div>
  <h4>Recommended Products</h4>
  {#if (products)}
  <div class="recommended-list">
    {#each products as product}
      <RecommendedProductCard {product}/>
  {/each}
  </div>
  {:else}
    <p>No recommended products</p>
  {/if}
</div>

<style>
  .recommended-list {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
</style>
