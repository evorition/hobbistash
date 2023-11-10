import { verifyToken } from "../utils/jwt.utils.js";
import User from "../models/user.model.js";

const userExtractor = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided." });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decodedToken = verifyToken(token);
        if (!decodedToken.id) {
            throw new Error("Invalid token.");
        }
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export { userExtractor };
