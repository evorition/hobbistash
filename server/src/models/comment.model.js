import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default commentSchema;
