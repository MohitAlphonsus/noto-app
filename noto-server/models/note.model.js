import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title : {type : String, required : true},
    content : {type : String, required : true},
    noteGroup : {type : mongoose.Schema.Types.ObjectId, ref : "Notegroup", required : true}
}, {timestamps : true})

const Note = mongoose.model('Note', noteSchema)
export default Note