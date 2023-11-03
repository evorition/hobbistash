import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
} from "./config.utils.js";

const signAcessToken = (user) => {
    const payload = { sub: user.id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    return accessToken;
};

export { signAcessToken };
