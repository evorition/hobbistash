import "dotenv/config";

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export { PORT, MONGODB_URL, SALT_ROUNDS };
