interface Data {
  pageId: string;
}
export async function sendPageId({ pageId }: Data) {
  const res = await fetch("http://localhost:3000/notion/add-parent-id", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parentId: pageId }),
  });
  return res.json();
}

export async function getTitleAndId(parentPageId: string) {
  const res = await fetch(
    `http://localhost:3000/notion/get-title?${parentPageId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.json();
}

interface returnTitleAndId {
  message: string;
  parentPageId?: string | null;
  returnTitleAndId: string[] | null;
}

export async function getParentPageIdOfUser(): Promise<returnTitleAndId> {
  const res = await fetch(`http://localhost:3000/notion/user-parent-id`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: returnTitleAndId = await res.json();
  return data;
}
