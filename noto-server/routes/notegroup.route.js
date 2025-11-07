import express from 'express'
const noteGroupRouter = express.Router();

import {
	createNoteGroup,
	getAllNoteGroups,
	getNoteGroup,
	updateNoteGroup,
	deleteNoteGroup,
} from "../controllers/notegroup.controller.js";

noteGroupRouter.post('/', createNoteGroup)
noteGroupRouter.get('/', getAllNoteGroups)
noteGroupRouter.get("/:id", getNoteGroup);
noteGroupRouter.put("/:id", updateNoteGroup);
noteGroupRouter.delete("/:id", deleteNoteGroup);

export default noteGroupRouter;