import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
} from "./config.utils.js";

const signAccessToken = (user) => {
    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    return accessToken;
};

const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        throw new Error("Invalid token.");
    }
};

export { signAccessToken, verifyToken };
