<script lang="ts">
  import { onMount } from "svelte";
  import type { UserStore, USState } from "../js/types.mts";
  import { USStates } from "../js/types.mts";
  import { getLocalStorage } from "../js/utils.mts";

  let user;
  let nameList = $state([""]);
  let [firstName, lastName] = $derived(nameList);
  let street = $state("");
  let street2 = $state("");
  let city = $state("");
  let usState = $state();
  let postalCode = $state("");
  let country = $state("");
  let cardNumber = $state("");
  let expiration = $state("");
  let securityCode = $state("");
  let cardDigits = $derived(cardNumber.replace(/\D/g, ""));
  let [expirtaionMonth, expirationYear] = $derived(expiration.split("/"));

  function formatCardNumber(digits: string): string {
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiration(digits: string): string {
    if (digits.length <= 2) return digits;

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function formatDigits(digits: string): string {
    return digits.replace(/[a-z]/gi, "");
  }

  function handleDigitInput(
    input: HTMLInputElement,
    maxDigits: number,
    format: (digits: string) => string,
  ) {
    const original = input.value;
    const cursor = input.selectionStart ?? original.length;

    const digitsBeforeCursor = original
      .slice(0, cursor)
      .replace(/\D/g, "").length;

    const digits = original.replace(/\D/g, "").slice(0, maxDigits);

    const formatted = format(digits);

    if (original === formatted) return;

    input.value = formatted;

    let newCursor = 0;
    let digitsSeen = 0;

    while (newCursor < formatted.length && digitsSeen < digitsBeforeCursor) {
      // Count actual digits, ignoring spaces, slashes, etc.
      if (/\d/.test(formatted.charAt(newCursor))) {
        digitsSeen++;
      }

      newCursor++;
    }

    input.setSelectionRange(newCursor, newCursor);
  }

  onMount(() => {
    const userStore = getLocalStorage("so-user") as UserStore;
    if (!userStore.user) {
      window.location.href = "/login";
      throw new Error("User is not logged in");
    }
    user = userStore.user;
    if (user.name) {
      nameList = user.name.split(" ");
    }
  });

  console.log($inspect(usState));
</script>

{#snippet checkoutForm()}
  <form class="majority" name="checkout">
    <fieldset name="personalInfo">
      <h2>Personal Information</h2>
      <section class="dual-container">
        <div class="input-container">
          <input
            type="text"
            name="firstName"
            bind:value={firstName}
            placeholder=" "
            required
          />
          <label for="firstName">First Name</label>
        </div>
        <div class="input-container">
          <input
            type="text"
            name="lastName"
            bind:value={lastName}
            placeholder=" "
            required
          />
          <label for="lastName">Last Name</label>
        </div>
      </section>
    </fieldset>
    <fieldset name="Shipping Address">
      <h2>Shipping Address</h2>
      <section class="dual-container">
        <div class="input-container">
          <input
            type="text"
            name="street"
            bind:value={street}
            placeholder=" "
            required
          />
          <label for="street">Street Address</label>
        </div>
        <div class="input-container">
          <input
            type="text"
            name="street2"
            bind:value={street2}
            placeholder=" "
            required
          />
          <label for="street2">Street Address 2</label>
        </div>
      </section>
      <section class="tri-container">
        <div class="input-container">
          <input type="text" name="city" bind:value={city} placeholder=" " />
          <label for="city">City</label>
        </div>
        <div class="input-container">
          <select
            style:width="100%"
            style:margin-bottom="1em"
            name="usState"
            bind:value={usState}
            placeholder=""
            required
          >
            {#each USStates as usStateString}
              <option>
                {usStateString}
              </option>
            {/each}
          </select>
          <label for="usState">State</label>
        </div>
        <div class="input-container">
          <input
            type="text"
            autocomplete="postal-code"
            inputmode="numeric"
            name="postalCode"
            bind:value={postalCode}
            oninput={(event) =>
              handleDigitInput(event.currentTarget, 6, formatDigits)}
            required
          />
          <label for="postalCode">Postal Code</label>
        </div>
      </section>
      <div class="input-container full-width">
        <input
          type="text"
          name="country"
          bind:value={country}
          placeholder=" "
          required
        />
        <label for="country">Country</label>
      </div>
    </fieldset>
    <fieldset name="paymentInfo">
      <h2>Payment Information</h2>
      <div class="input-container">
        <input
          class="full-width"
          name="cardNumber"
          type="text"
          bind:value={cardNumber}
          inputmode="numeric"
          oninput={(event) =>
            handleDigitInput(event.currentTarget, 16, formatCardNumber)}
          maxlength="19"
          minlength="19"
          placeholder=" "
          required
        />
        <label for="cardNumber">Credit Card Number</label>
      </div>
      <section class="dual-container">
        <div class="input-container">
          <input
            name="expiration"
            type="text"
            bind:value={expiration}
            inputmode="numeric"
            oninput={(event) =>
              handleDigitInput(event.currentTarget, 4, formatExpiration)}
            minlength="5"
            maxlength="5"
            placeholder=" "
            required
          />
          <label for="expiration">Card Expiration</label>
        </div>
        <div class="input-container">
          <input
            name="securityCode"
            type="text"
            bind:value={securityCode}
            inputmode="numeric"
            oninput={(event) =>
              handleDigitInput(event.currentTarget, 3, formatDigits)}
            minlength="3"
            maxlength="3"
            placeholder=" "
            required
          />
          <label for="securityCode">CVC</label>
        </div>
      </section>
    </fieldset>
  </form>
{/snippet}

<div class="checkout-container">
  {@render checkoutForm()}
  <div class="checkout-summary">
    <div class="product"></div>
    <div class="cost-detail">
      <p>Subtotal:</p>
      <p style:justify-content="end">$</p>
    </div>
    <p class="cost-detail">Taxes: $</p>
    <p class="cost-detail">Shipping: $</p>
    <hr class="divider" />
    <p class="cost-detail">Total: $</p>
  </div>
</div>

<style>
  .checkout-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 2fr));
    gap: 1rem;
  }

  .majority {
    grid-column: span 2;
  }

  .checkout-summary {
    background-color: #ffffff;
    border: 1px solid #718074;
    border-radius: 0.65rem;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .cost-detail {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0.125rem;
  }

  .divider {
    border: 0;
    border-top: 1px solid;
    width: auto;
    margin-right: 0.25rem;
    margin-left: 0.25rem;
  }

  fieldset {
    background-color: #ffffff;
    border: 1px solid #718074;
    border-radius: 0.65rem;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .dual-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .tri-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .input-container {
    position: relative;
  }

  .input-container input,
  .input-container select {
    box-sizing: border-box;
    width: 100%;
    min-height: 3.75rem;
    padding: 1.5rem 0.875rem 0.5rem;
    font: inherit;
    color: #17221a;
    background-color: #ffffff;
    border: 1px solid #718074;
    border-radius: 0.65rem;
    margin-bottom: 1em;
  }

  .input-container label {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #526154;
    line-height: 1;
    pointer-events: none;
    transition:
      top 150ms ease,
      transform 150ms ease,
      font-size 150ms ease;
  }

  .input-container input:focus + label,
  .input-container input:not(:placeholder-shown) + label,
  .input-container select:focus + label,
  .input-container select:not(:placeholder-shown) + label {
    top: 0.5rem;
    transform: translateY(0);
    font-size: 0.75rem;
  }
</style>
