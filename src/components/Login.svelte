<script lang="ts">
  import { login } from "../js/auth.svelte";
  import { setLocalStorage, getParam } from "../js/utils.mts";
  import { onMount } from "svelte";
  // what is this?  We give the option to pass a function into our login component that will get called on a successful login. If no function is passed it defaults to one that will redirect the user to another page (like Home).
  let {
    onSuccess = (path: string) => {
      window.location.href = path;
    },
  } = $props<{ onSuccess?: (path: string) => void }>();

  let email = $state("user@example.com");
  let password = $state("");
  let errorMessage = $state("");
  let redirectPath = "/";

  async function loginHandler(event: Event) {
    event.preventDefault();

    try {
      await login(email, password);
      console.log("login success");
      onSuccess(redirectPath);
    } catch (err: any) {
      console.log(err);
      errorMessage = err.message;
    }
  }

  onMount(() => {
    // we added the getParam function to utils in Team 5
    const param = getParam("redirect");
    if (param) {
    // if the redirect param exists use that
    redirectPath = param;
  } else if (document.referrer != window.location.href) {
    // otherwise send back to the referring page if set
    redirectPath = document.referrer;
  }
  });
</script>

<h2>Login</h2>
{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={loginHandler} class="login-form">
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>
  <button type="submit">Login</button>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>
