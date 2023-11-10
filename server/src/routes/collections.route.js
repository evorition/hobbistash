import { Router } from "express";
import * as collectionsController from "../controllers/collections.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";

const collectionsRouter = Router();

collectionsRouter.get("/", collectionsController.getAll);
collectionsRouter.post("/", userExtractor, collectionsController.create);
collectionsRouter.get("/:id", collectionsController.getById);
collectionsRouter.put("/:id", userExtractor, collectionsController.update);
collectionsRouter.delete("/:id", userExtractor, collectionsController.remove);

export default collectionsRouter;
