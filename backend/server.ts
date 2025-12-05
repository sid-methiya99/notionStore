import express from "express";
import { getAllBlocks, notion } from "./parse";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./src/utils/auth";
import cors from "cors";

const app = express();

// Manual CORS middleware
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
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/api/me", async (req, res) => {
  console.log("Control reached here");
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

// app.get("/", async (req, res) => {
//   await getAllBlocks(fakeId);
//   res.json({
//     message: "Server running",
//   });
// });

// app.post("/database", async (req, res) => {
//   const addData = await notion.pages.create({
//     parent: {
//       database_id: fakeId,
//     },
//     properties: {
//       URL: {
//         url: "http://google.com",
//       },
//     },
//   });
//
//   console.log(addData);
//   res.json({
//     message: "Updated data",
//   });
// });

// app.get("/database", async (req, res) => {
//   const database = await notion.databases.retrieve({
//     database_id: secondId,
//   });
//
//   const response = await notion.dataSources.query({
//     data_source_id: database.data_sources[0].id,
//   });
//
//   const getProperties = response.results.map((x) => x.properties);
//   const getUrl = getProperties.map((x) => x.URL.url);
//   console.log(getUrl);
//
//   res.json({
//     message: "Server running",
//   });
// });

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
