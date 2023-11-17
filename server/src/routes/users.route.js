import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";
import { userExtractor } from "../middlewares/auth.middleware.js";
import { isUserAdmin, isUserBlocked } from "../middlewares/user.middleware.js";
import { updateUserValidationSchema } from "../middlewares/validators/userValidation.middleware.js";

const usersRouter = Router();

usersRouter.get(
    "/",
    [userExtractor, isUserBlocked, isUserAdmin],
    usersController.getAll
);
usersRouter.get("/:userId", usersController.getById);
usersRouter.put(
    "/:userId",
    [userExtractor, isUserBlocked, isUserAdmin, updateUserValidationSchema],
    usersController.update
);
usersRouter.delete(
    "/:userId",
    [userExtractor, isUserBlocked, isUserAdmin],
    usersController.remove
);

export default usersRouter;
