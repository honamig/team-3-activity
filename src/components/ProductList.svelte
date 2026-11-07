
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

  // store the sorting option selected by the customer.
  let sortBy = $state("name-asc");

  // Sort a copy of the products without changing the original array.
  // Svelte updates this list when the products or sorting option changes.
  let sortedProducts = $derived(
    [...filteredProducts].sort((a, b) => {
      // Sort names from A to Z.
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      // Sort names from Z to A.
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      // Sort prices from lowest to highest.
      if (sortBy === "price-asc") {
        return a.finalPrice - b.finalPrice;
      }

      // Sort prices from highest to lowest.
      if (sortBy === "price-desc") {
        return b.finalPrice - a.finalPrice;
      }

      return 0;
    })
  );

  // Load products from the selected category.
  async function init() {
    category = getParam("category") || "";
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


<!-- Let customers choose how the products are sorted. -->
<div class="sort-container">
  <label for="sort-products">Sort by:</label>

  <select id="sort-products" bind:value={sortBy}>
    <option value="name-asc">Name: A to Z</option>
    <option value="name-desc">Name: Z to A</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
  </select>
</div>

<!-- Display the matching and sorted products. -->
{#if sortedProducts.length > 0}
  <ul class="product-list">
    {#each sortedProducts as product (product.id)}
      <ProductSummary {product} />
    {/each}
  </ul>
{:else}
  <p>No products found.</p>
{/if}
