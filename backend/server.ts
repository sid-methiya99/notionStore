import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./src/utils/auth";
import { getAllBlocks, notion } from "./parse";
import type { ChildDatabaseBlockObjectResponse } from "@notionhq/client";
import { db } from "./src";
import { storeContentDetails, storeTitleAndId } from "./src/db/schema";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// app.all("/api/auth/*splat", toNodeHandler(auth));
// app.use(express.json());
//
// app.get("/api/me", async (req, res) => {
//   const session = await auth.api.getSession({
//     headers: fromNodeHeaders(req.headers),
//   });
//   return res.json(session);
// });

interface BlockType {
  id: string;
  title: string;
}

app.get("/", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  const parentId = req.body.parentId;
  const fakeId = "2c13554e55e38087b375eb4fc4d6bb49";
  const blocks = await notion.blocks.children.list({
    block_id: parentId,
  });

  let getIdAndTitle: BlockType[] = [];

  for (const block of blocks.results) {
    //@ts-ignore
    if (block?.child_database) {
      getIdAndTitle.push({
        id: block.id,
        //@ts-ignore
        title: block?.child_database.title,
      });
    }
  }

  const [parent] = await db
    .insert(storeContentDetails)
    .values({
      userId: session?.user.id || "",
      parentPageId: parentId,
    })
    .returning();

  const rowsToInsert = getIdAndTitle.map((item) => ({
    storeId: parent.id,
    databaseId: item.id,
    parentTitle: item.title,
  }));

  const data = await db.insert(storeTitleAndId).values(rowsToInsert);
  console.log(data);

  res.json({
    message: "Server running",
    blocks,
  });
});

app.post("/database", async (req, res) => {
  const secondId = "2af3554e-55e3-807d-857c-d0440f31ceed";
  const addData = await notion.pages.create({
    parent: {
      database_id: secondId,
    },
    properties: {
      URL: {
        url: "http://google.com",
      },
    },
  });

  console.log(addData);
  res.json({
    message: "Updated data",
  });
});

app.get("/database", async (req, res) => {
  const secondId = "2af3554e-55e3-8036-aad0-d7d8b8413335";
  const database = await notion.databases.retrieve({
    database_id: secondId,
  });

  const response = await notion.dataSources.query({
    data_source_id: database.data_sources[0].id,
  });

  const getProperties = response.results.map((x) => x.properties);
  const getUrl = getProperties.map((x) => x.URL.url);

  res.json({
    message: "Server running",
  });
});

// app.patch("/", async (req, res) => {
// });
// app.post("/", async (req, res) => {
//   const newHeadingResponse = await notion.blocks.children.append({
//     block_id: pageId,
//     children: [
//       {
//         heading_2: {
//           rich_text: [
//             {
//               text: {
//                 content: "Types of kale", // This is the text that will be displayed in Notion
//               },
//             },
//           ],
//         },
//       },
//     ],
//   });
//
//   res.json({
//     message: "Done updating the page",
//   });
// });
//

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
