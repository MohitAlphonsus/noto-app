import mongoose from "mongoose";
import Note from "../models/note.model.js";
import NoteGroup from "../models/notegroup.model.js";

async function getNotesByGroup(req, res) {
	const { groupId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(groupId))
		return res.status(400).json({ success: false, message: "Invalid groupID" });

	try {
		const group = await NoteGroup.findById(groupId).populate({
			path: "notes",
			options: { sort: { updatedAt: -1 } },
		});
		return res.status(200).json({ success: true, data: group.notes });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
}

async function createNote(req, res) {
	const { groupId } = req.params;
	const { title, content } = req.body;
	if (!title || !content) {
		return res.status(400).json({
			success: false,
			message: "Invalid input field, missing title or content",
		});
	}

	if (!mongoose.Types.ObjectId.isValid(groupId)) {
		return res.status(400).json({ success: false, message: "Invalid groupID" });
	}

	try {
		const noteGroup = await NoteGroup.findById(groupId);
		if (!noteGroup) {
			return res
				.status(404)
				.json({ success: false, message: "NoteGroup not found" });
		}
		const newNote = new Note({ title, content, noteGroup: groupId });
		await newNote.save();

		noteGroup.notes.push(newNote);
		await noteGroup.save();
		return res.status(201).json({ success: true, data: newNote });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
}

async function getNote(req, res) {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid note id" });
	}
	try {
		const note = await Note.findById({ _id: id }).populate("noteGroup", "name");
		if (!note) {
			return res
				.status(404)
				.json({ success: false, message: "Note not found" });
		}

		return res.status(200).json({ success: true, data: note });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
}

async function updateNote(req, res) {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ success: false, message: "Invalid note id" });

	try {
		const note = await Note.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		if (!note) {
			return res
				.status(404)
				.json({ success: false, message: "Note not found" });
		}

		return res.status(200).json({ success: true, data: note });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
}

async function deleteNote(req, res) {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid note id" });
	}
	try {
		const note = await Note.findByIdAndDelete(id);
		if (!note) {
			return res
				.status(404)
				.json({ success: false, message: "Note not found" });
		}

		await NoteGroup.findByIdAndUpdate(note.noteGroup, {
			$pull: { notes: note._id },
		});
		return res
			.status(200)
			.json({ success: true, message: "Note deleted successfully" });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
}

export { getNotesByGroup, createNote, getNote, updateNote, deleteNote };
