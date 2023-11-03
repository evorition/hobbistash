import "dotenv/config";

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

export {
    PORT,
    MONGODB_URL,
    SALT_ROUNDS,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
};
