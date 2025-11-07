import mongoose from "mongoose";
import Note from "./note.model.js";

const noteGroupSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
	},
	{ timestamps: true }
);

noteGroupSchema.pre("findOneAndDelete", async function (next) {
	const groupId = this.getQuery()["_id"];
	await Note.deleteMany({ noteGroup: groupId });
	next();
});

const NoteGroup = mongoose.model("Notegroup", noteGroupSchema);
export default NoteGroup;
