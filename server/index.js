import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import authRouter from "./src/routes/auth.route.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import { PORT, MONGODB_URL } from "./src/utils/config.utils.js";

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

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
