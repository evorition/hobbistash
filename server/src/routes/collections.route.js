import { Router } from "express";
import * as collectionsController from "../controllers/collections.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";
import { isUserBlocked } from "../middlewares/user.middleware.js";
import {
    createCollectionSchema,
    updateCollectionSchema,
} from "../middlewares/validators/collectionValidation.middleware.js";

const collectionsRouter = Router();

collectionsRouter.get("/", collectionsController.getAll);
collectionsRouter.post(
    "/",
    [userExtractor, isUserBlocked, createCollectionSchema],
    collectionsController.create
);
collectionsRouter.get("/:collectionId", collectionsController.getById);
collectionsRouter.put(
    "/:collectionId",
    [userExtractor, isUserBlocked, updateCollectionSchema],
    collectionsController.update
);
collectionsRouter.delete(
    "/:collectionId",
    [userExtractor, isUserBlocked],
    collectionsController.remove
);

export default collectionsRouter;
