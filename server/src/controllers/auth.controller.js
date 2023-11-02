import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/config.utils.js";
import User from "../models/user.model.js";

const signup = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.sendStatus(201);
};

const signin = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    const user = User.findOne({ email });
    const isPasswordCorrect = User.isPasswordValid(password);
    if (!(user && isPasswordCorrect)) {
        return res.status(422).json({ message: "Invalid email or password." });
    } else if (user.blocked) {
        return res.status(403).json({ message: "User is blocked." });
    }
    const userSerialized = user.toJSON();
    const accessToken = jwt.sign(
        { id: userSerialized.id },
        ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken, ...userSerialized });
};

export default { signup, signin };
