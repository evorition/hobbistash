import { Router } from "express";
import * as itemsController from "../controllers/items.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";

const itemsRouter = Router();

itemsRouter.get("/:itemId", itemsController.getById);
itemsRouter.post("/", userExtractor, itemsController.create);
itemsRouter.post("/:itemId/like", userExtractor, itemsController.like);
itemsRouter.put("/:itemId", userExtractor, itemsController.update);
itemsRouter.delete("/:itemId", userExtractor, itemsController.remove);

export default itemsRouter;
