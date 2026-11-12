import type { UserStore } from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";

const baseUrl = import.meta.env.PUBLIC_SERVER_URL;

interface TokenObject {
  user: {
    _id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const userStore = $state({
  isLoggedIn: false,
  user: {},
  token: "",
}) as UserStore;

export async function login(email: string, password: string) {
  console.log("logging in");
  const response = await fetch(baseUrl + `users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const tokenObject: TokenObject = await response.json();
    console.log(tokenObject);
    const user = tokenObject.user;
    Object.assign(userStore, {
      isLoggedIn: true,
      user,
      token: tokenObject.token,
    });
    setLocalStorage("so-user", userStore);
    return { success: true };
  } else {
    return { success: false };
  }
}

export async function logout(): Promise<void> {
  Object.assign(userStore, {
    isLoggedIn: false,
    user: undefined,
    token: "",
  });
  setLocalStorage("so-user", null);
}

export async function checkAuth() {
  const userData = getLocalStorage("so-user") as UserStore;
  if (!userData) {
    Object.assign(userStore, {
      isLoggedIn: false,
      user: undefined,
      token: "",
    });
    return false;
  } else {
    Object.assign(userStore, {
      isLoggedIn: true,
      user: userData.user,
      token: userData.token,
    });
    return true;
  }
}
