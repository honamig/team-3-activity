import type { Alert } from "./types.mts";

const baseUrl = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getAlerts() {
  console.log("getting alerts");
  return await fetch(`/json/alerts.json`)
    .then(convertToJson)
    .then((data) => data);
}
