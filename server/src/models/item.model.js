import mongoose from "mongoose";

const itemFieldSchema = mongoose.Schema({
    name: String,
    type: String,
    value: mongoose.Schema.Types.Mixed,
});

const itemSchema = mongoose.Schema({
    name: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
    customFields: [itemFieldSchema],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Item", itemSchema);
