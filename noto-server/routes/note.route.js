import express from "express";
const noteRouter = express.Router();

import {
	getNotesByGroup,
	createNote,
	getNote,
	updateNote,
	deleteNote,
} from "../controllers/note.controller.js";

noteRouter.get("/group/:groupId", getNotesByGroup);
noteRouter.post("/group/:groupId", createNote);
noteRouter.get("/:id", getNote);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
