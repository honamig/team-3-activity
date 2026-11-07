<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../js/productData.mts";
  import type { Product } from "../js/types.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import { getParam } from "../js/utils.mjs";

  let category = $state("");
  let products: Product[] = $state([]);
  
// store what the user types in the search box
let searchTerm = $state("");

// filter products based on what the user searches
let filteredProducts = $derived(
  products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  async function init() {
    category = getParam("category") || ""
    const data = await getProducts(category);
    products = data.results;
  }

  onMount(init);
</script>

<h2>Top products: {category}</h2>

<!-- search box for products -->
<div class="product-search">
  <input
  type="search"
  placeholder="Search products..."
  bind:value={searchTerm}
  />
</div>

<!-- show matching products or a message if nothing is found -->
{#if filteredProducts.length > 0}
  <ul class="product-list">
    {#each filteredProducts as product}
      <ProductSummary {product} />
    {/each}
  </ul>
{:else}
  <p>No products found.</p>
{/if}