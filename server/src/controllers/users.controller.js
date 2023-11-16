import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { removeCollectionsWithUserId } from "../services/collection.service.js";
import { removeItemsWithUserId } from "../services/item.service.js";
import { checkUserPermission } from "../services/permissions.service.js";

const getAll = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const getById = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("collections");
    if (!user) {
        return res
            .status(404)
            .json({ message: "Requested user doesn't exist." });
    }
    res.json(user);
};

const update = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const { userId } = req.params;
    const updatedUserData = { ...req.body };
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
        return res.status(404).json({ message: "User not found." });
    }
    await User.findByIdAndUpdate(userId, updatedUserData);
    res.sendStatus(200);
};

const remove = async (req, res) => {
    const user = req.user;
    const { userId } = req.params;
    const userToDelete = await User.findById(userId);
    try {
        checkUserPermission(user, userId);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    if (!userToDelete) {
        return res
            .status(404)
            .json({ message: "Requested user doesn't exist." });
    }
    await removeItemsWithUserId(userId);
    await removeCollectionsWithUserId(userId);
    await User.findByIdAndDelete(userId);
    res.sendStatus(204);
};

export { getAll, getById, update, remove };
