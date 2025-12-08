import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import { config } from "dotenv";
import cors from "cors";
import { notionRouter } from "./routes/notion";

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

app.use("/notion", notionRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
