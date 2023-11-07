import mongoose from "mongoose";

const customFieldSchema = mongoose.Schema({
    name: String,
    type: String,
});

const collectionSchema = mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    customFields: [customFieldSchema],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Collection", collectionSchema);
