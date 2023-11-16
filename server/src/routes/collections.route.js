import { Router } from "express";
import * as collectionsController from "../controllers/collections.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";
import { isUserBlocked } from "../middlewares/user.middleware.js";

const collectionsRouter = Router();

collectionsRouter.get("/", collectionsController.getAll);
collectionsRouter.post(
    "/",
    [userExtractor, isUserBlocked],
    collectionsController.create
);
collectionsRouter.get("/:collectionId", collectionsController.getById);
collectionsRouter.put(
    "/:collectionId",
    [userExtractor, isUserBlocked],
    collectionsController.update
);
collectionsRouter.delete(
    "/:collectionId",
    [userExtractor, isUserBlocked],
    collectionsController.remove
);

export default collectionsRouter;
