import mongoose from "mongoose";

const customFieldSchema = mongoose.Schema(
    {
        name: String,
        type: String,
    },
    { _id: false }
);

const collectionSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        imageUrl: String,
        topic: {
            type: String,
            enum: [
                "Books",
                "Coins",
                "Postcards",
                "Seashells",
                "Stamps",
                "Vinyl",
                "Watches",
                "Wine",
                "Other",
            ],
        },
        customFields: [customFieldSchema],
        items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

collectionSchema.methods.itemsCount = function () {
    return this.items.length;
};

collectionSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model("Collection", collectionSchema);
