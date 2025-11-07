import NoteGroup from "../models/notegroup.model.js";

async function getAllNoteGroups(req, res) {
	try {
		const noteGroups = await NoteGroup.find();
		res.status(200).json({ success: true, data: noteGroups });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

async function createNoteGroup(req, res) {
	const { name } = req.body;
	if (!name)
		return res
			.status(400)
			.json({ success: false, message: "Invalid input field, missing name" });

	try {
		const noteGroup = new NoteGroup({ name });
		await noteGroup.save();
		res.status(201).json({ success: true, data: noteGroup });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

async function getNoteGroup(req, res) {
	const { id } = req.params;
	try {
		const noteGroup = await NoteGroup.findById({ _id: id });
		res.status(200).json({ success: true, data: noteGroup });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

async function updateNoteGroup(req, res) {
	const { id } = req.params;
	try {
		const noteGroup = await NoteGroup.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		res.status(200).json({ success: true, data: noteGroup });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

async function deleteNoteGroup(req, res) {
	const { id } = req.params;
	try {
		const group = await NoteGroup.findOneAndDelete({ _id: id });
		if (!group) {
			return res
				.status(404)
				.json({ success: false, message: "NoteGroup not found" });
		}
		return res
			.status(200)
			.json({ success: true, message: "NoteGroup deleted successfully" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

export {
	createNoteGroup,
	getAllNoteGroups,
	getNoteGroup,
	updateNoteGroup,
	deleteNoteGroup,
};
