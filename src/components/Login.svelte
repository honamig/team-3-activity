<script lang="ts">
  import { onMount } from "svelte";
  import { login } from "../js/auth.svelte.ts";
  import { getParam } from "../js/utils.mts";

  let email = $state("");
  let password = $state("");
  let emailInput: any = $state();
  let passwordInput: any = $state();
  let emailValidationError = $state(false);
  let passwordValidationError = $state(false);
  let authFailed = $state(false);
  let redirectPath = "/";

  async function loginHandler(event: any) {
    event.preventDefault();
    emailValidationError = false;
    passwordValidationError = false;
    const emailIsValid = emailInput.checkValidity();
    const passwordIsValid = passwordInput.checkValidity();
    if (emailIsValid && passwordIsValid) {
      console.log("logging in");
    } else {
      if (!emailIsValid) {
        emailValidationError = true;
      }
      if (!passwordIsValid) {
        passwordValidationError = true;
      }
    }
    const { success } = await login(email, password);
    if (!success) {
      authFailed = true;
    } else {
      window.location.href = redirectPath;
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
    // otherwise redirectPath will stay "/" (send home)
  });
</script>

<div class="form-container">
  <p
    class="error-message"
    style="margin-top: 1em; font-size: 20px"
    hidden={!authFailed}
  >
    Email or Password is incorrect
  </p>
  <form id="loginForm" novalidate onsubmit={loginHandler}>
    <label>
      Email
      <input
        type="email"
        id="email"
        name="email"
        bind:this={emailInput}
        bind:value={email}
        required
        placeholder="example@email.com"
      />
      <p class="error-message" hidden={!emailValidationError}>
        Email input must be valid email
      </p>
    </label>
    <label>
      Password
      <input
        type="password"
        id="password"
        name="password"
        bind:this={passwordInput}
        bind:value={password}
        required
      />
      <p class="error-message" hidden={!passwordValidationError}>
        Password input must be at least 6 characters long
      </p>
    </label>
    <button disabled={!email || !password} type="submit">Log in</button>
  </form>
  <div></div>
</div>

<style>
  form {
    display: grid;
    padding: 2em;
    align-content: center;
    align-self: center;
  }

  .form-container {
    display: grid;
    margin: 1em;
    padding: 3em;
    border-color: black;
    border-radius: 15px;
    border-width: 2px;
    justify-content: center;
    text-align: center;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin: 0;
  }

  label {
    padding-bottom: 0.5em;
    justify-self: end;
  }

  button {
    border-radius: 2em;
  }
</style>
