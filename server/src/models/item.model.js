import mongoose from "mongoose";

const customFieldSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        value: mongoose.Schema.Types.Mixed,
    },
    { _id: false }
);

const itemSchema = mongoose.Schema(
    {
        name: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        tags: [String],
        comments: [
            {
                author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                text: String,
            },
        ],
        customFields: [customFieldSchema],
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

itemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model("Item", itemSchema);
