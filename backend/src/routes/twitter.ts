import { Client } from "twitter-api-sdk";
import { config } from "dotenv";
config();

// const client = new Client(
//   "AAAAAAAAAAAAAAAAAAAAAJKv3AEAAAAA%2BzftSH5jASd02mNJjnU3%2B3%2Bzv7M%3DXntBupiXyKZYPVGYf65cH05UNakpTQ6y41sio6wvVJNOQ9V4LA",
// );

// For articles and X post use scira only
async function main() {
  const url = "https://x.com/chatgpt21/status/1998075317840191590";
  const searchResponse = await fetch("https://api.scira.ai/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.SCIRA_AI_KEY!,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `Open and read the webpage at: ${url}
Based only on the content of this tweet, write a clear, neutral description of what it is about in around 100 words. Summarize the main topic, key points, and purpose of the page, and mention who it is useful for. Do not include your own opinions, and do not add information that is not present on the page. Output only a single paragraph of about 100 words.`,
        },
      ],
    }),
  });

  const searchData = await searchResponse.json();
  console.log(searchData);
}

main();
