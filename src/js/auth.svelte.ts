import type { User } from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";
const baseUrl = import.meta.env.PUBLIC_SERVER_URL;

interface UserStore {
  isLoggedIn: boolean;
  user?: {
    name: string;
    email: string;
    _id: string;
  };
  token: string;
}

export const userStore = $state({
  isLoggedIn: false,
  user: {},
  token: "",
}) as UserStore;

function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch(baseUrl + `users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      userStore.isLoggedIn = true;
      userStore.user = data.user;
      userStore.token = data.token;
      setLocalStorage("user", userStore);
    } else {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export function logout() {
  setLocalStorage("user", null);
  userStore.isLoggedIn = false;
  userStore.user = undefined;
  userStore.token = "";
}

export function checkAuth() {
  const data = getLocalStorage("user");
  if (data) {
    userStore.user = data.user;
    userStore.token = data.token;
    userStore.isLoggedIn = true;
  } else {
    userStore.isLoggedIn = false;
    userStore.user = undefined;
    userStore.token = "";
  }

  return data ? true : false
}
