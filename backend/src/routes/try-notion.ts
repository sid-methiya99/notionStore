import { Client, iteratePaginatedAPI } from "@notionhq/client";

import dotenv from "dotenv";
dotenv.config();

export const notion = new Client({
  auth: process.env.NOTION_TOKEN2,
});

const pageId = "2c13554e55e38087b375eb4fc4d6bb49";

const dbId = "2af3554e55e38036aad0d7d8b8413335";
// const blocks = await notion.blocks.children.list({
//   block_id: pageId,
// });

const database = await notion.databases.retrieve({
  database_id: dbId,
});

const response = await notion.dataSources.query({
  data_source_id: database.data_sources[0].id,
});

const filteredResponse = response.results.map((x) => x.properties);
// console.log("Response: ", filteredResponse);
const desx = filteredResponse.map((x) => Object.keys(x));
console.log("Keys: ", desx[0]);
// const plain_text = desx.map((x) => x[0].plain_text);
//
// console.log(desx);
// console.log(plain_text);

// console.log(database);
// console.log(blocks.results);
