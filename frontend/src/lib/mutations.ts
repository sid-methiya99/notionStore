import { authClient } from "./auth-client";

interface Data {
  pageId: string;
}
export async function sendPageId({ pageId }: Data) {
  const res = await fetch("http://localhost:3000/addId", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parentId: pageId }),
  });
  return res.json();
}
