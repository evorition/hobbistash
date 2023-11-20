import { validationResult } from "express-validator";
import { signAccessToken } from "../utils/jwt.utils.js";
import User from "../models/user.model.js";

const signup = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.sendStatus(201);
};

const signin = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }, { collections: 0 });
    const isPasswordCorrect =
        user === null ? false : await user.isPasswordValid(password);
    if (!(user && isPasswordCorrect)) {
        return res.status(422).json({ message: "Invalid email or password." });
    } else if (user.blocked) {
        return res.status(403).json({ message: "User is blocked." });
    }
    const userSerialized = user.toJSON();
    const accessToken = signAccessToken(userSerialized);
    res.json({ accessToken, ...userSerialized });
};

export default { signup, signin };
