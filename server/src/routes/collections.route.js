import { Router } from "express";
import * as collectionsController from "../controllers/collections.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";

const collectionsRouter = Router();

collectionsRouter.get("/", collectionsController.getAll);
collectionsRouter.post("/", userExtractor, collectionsController.create);
collectionsRouter.get("/:collectionId", collectionsController.getById);
collectionsRouter.put(
    "/:collectionId",
    userExtractor,
    collectionsController.update
);
collectionsRouter.delete(
    "/:collectionId",
    userExtractor,
    collectionsController.remove
);

export default collectionsRouter;
