import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { config } from "dotenv";
config();

const { text } = await generateText({
  model: google("gemini-2.5-flash-preview-09-2025"),
  prompt:
    "Write a vegetarian lasagna recipe for 4 people.Write all responses in plain text only. Do not use markdown formatting such as *, #, or bullet lists.",
});

console.log(text);
