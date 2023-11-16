import { verifyToken } from "../utils/jwt.utils.js";
import User from "../models/user.model.js";

const extractToken = (req) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("No token provided.");
    }
    const token = authorization.replace("Bearer ", "");
    return token;
};

const userExtractor = async (req, res, next) => {
    try {
        const token = extractToken(req);
        const decodedToken = verifyToken(token);
        if (!decodedToken.id) {
            throw new Error("Invalid token: Missing user ID.");
        }
        const user = await User.findById(decodedToken.id);
        if (!user) {
            throw new Error("Invalid token: User not found.");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export { userExtractor };
