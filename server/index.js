import cors from "cors";
import express from "express";
import { PORT } from "./src/utils/config.utils.js";

const app = express();

app.use(cors());

app.get("/", (_, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
