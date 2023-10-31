import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../utils/config.utils";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: "Username is required.",
        },
        email: {
            type: String,
            unique: true,
            required: "Email is required.",
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

userSchema.pre("save", async (next) => {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    next();
});

userSchema.methods.isPasswordValid = async (password) => {
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

const userModel = mongoose.model("User", userSchema);

export default userModel;
