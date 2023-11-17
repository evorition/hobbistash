import { Router } from "express";
import * as itemsController from "../controllers/items.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";
import { isUserBlocked } from "../middlewares/user.middleware.js";
import {
    createItemSchema,
    updateItemSchema,
} from "../middlewares/validators/itemValidation.middleware.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAll);
itemsRouter.get("/:itemId", itemsController.getById);
itemsRouter.post(
    "/",
    [userExtractor, isUserBlocked, createItemSchema],
    itemsController.create
);
itemsRouter.post(
    "/:itemId/like",
    [userExtractor, isUserBlocked],
    itemsController.like
);
itemsRouter.put(
    "/:itemId",
    [userExtractor, isUserBlocked, updateItemSchema],
    itemsController.update
);
itemsRouter.delete(
    "/:itemId",
    [userExtractor, isUserBlocked],
    itemsController.remove
);

export default itemsRouter;
