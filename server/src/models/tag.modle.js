import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

export default mongoose.model("Tag", tagSchema);
