import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../utils/config.utils.js";

const userSchema = mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
        blocked: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        collections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Collection",
            },
        ],
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    next();
});

userSchema.methods.isPasswordValid = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.password;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model("User", userSchema);
