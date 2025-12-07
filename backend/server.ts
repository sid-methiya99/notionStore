import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./src/utils/auth";
import { getAllBlocks, notion } from "./parse";
import { db } from "./src";
import { storeContentDetails, storeTitleAndId } from "./src/db/schema";
import { config } from "dotenv";
import cors from "cors";

config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.post("/addId", async (req, res) => {
  const parentId = req.body.parentId;

  const blocks = await notion.blocks.children.list({
    block_id: parentId,
  });

  if (!blocks) {
    res.status(400).json({
      message: "Incorrect parentId",
    });
    return;
  }

  let userId = "";
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    userId = session?.user.id!;
  } catch (error) {
    console.error(error);
  }

  if (!userId) {
    throw new Error("UserID missing");
  }

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

  try {
    const [parent] = await db
      .insert(storeContentDetails)
      .values({
        userId: userId,
        parentPageId: parentId,
      })
      .returning();

    const rowsToInsert = getIdAndTitle.map((item) => ({
      storeId: parent.id,
      databaseId: item.id,
      parentTitle: item.title,
    }));

    const data = await db.insert(storeTitleAndId).values(rowsToInsert);
    res.status(200).json({
      message: "Fetched all databases",
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/desc", async (req, res) => {
  const url = req.body.url;
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
Based only on the content of this page, write a clear, neutral description of what it is about in around 100 words. Summarize the main topic, key points, and purpose of the page, and mention who it is useful for. Do not include your own opinions, and do not add information that is not present on the page. Output only a single paragraph of about 100 words.`,
        },
      ],
    }),
  });

  const searchData = await searchResponse.json();

  res.json({
    message: "Success",
    searchData,
  });
});

interface BlockType {
  id: string;
  title: string;
}

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
