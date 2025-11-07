import express from "express";
const app = express();
import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.json());

import connectDB from "./config/db.js";
import noteGroupRouter from "./routes/notegroup.route.js";
import noteRouter from "./routes/note.route.js";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", ".env") });

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/notegroups", noteGroupRouter);
app.use("/api/notes", noteRouter);

async function createServer() {
	await connectDB();
	app.listen(PORT, () => console.log("Server is running on port 5000"));
}

createServer();
