import express from "express";
import { getAllBlocks, notion } from "./parse";
import { all } from "axios";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const fakeId = "af3554e55e3800dabee000cf380f84d";
  await getAllBlocks(fakeId);
  res.json({
    message: "Server running",
  });
});

app.post("/database", async (req, res) => {
  const fakeId = "2af3554e55e3807d857cd0440f31ceed";

  const addData = await notion.pages.create({
    parent: {
      database_id: fakeId,
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
  const fakeId = "2af3554e55e3807d857cd0440f31ceed";
  const secondId = "2af3554e55e38036aad0d7d8b8413335";
  const database = await notion.databases.retrieve({
    database_id: secondId,
  });

  const response = await notion.dataSources.query({
    data_source_id: database.data_sources[0].id,
  });

  const getProperties = response.results.map((x) => x.properties);
  const getUrl = getProperties.map((x) => x.URL.url);
  console.log(getUrl);

  res.json({
    message: "Server running",
  });
});

// app.patch("/", async (req, res) => {
//   const notSure = "2af3554e55e3800dabee000cf380f84d";
// });
// app.post("/", async (req, res) => {
//   const pageId = "28b3554e55e380f89c2cf22b03f35daf";
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
