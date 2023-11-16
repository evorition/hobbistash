import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import { PORT, MONGODB_URL } from "./src/utils/config.utils.js";
import authRouter from "./src/routes/auth.route.js";
import collectionsRouter from "./src/routes/collections.route.js";
import itemsRouter from "./src/routes/items.route.js";
import usersRouter from "./src/routes/users.route.js";

const app = express();

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error(`error during connection to MongoDB ${error.message}`);
    });

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.sendStatus(200);
});
app.use("/api/auth", authRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
