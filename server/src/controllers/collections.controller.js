import { validationResult } from "express-validator";
import Collection from "../models/collection.model.js";
import { checkUserPermission } from "../services/permissions.service.js";
import { removeItemsByCollectionId } from "../services/item.service.js";
import {
    removeCollectionFromUser,
    addCollectionToUser,
} from "../services/user.service.js";

const getAll = async (req, res) => {
    const { limit } = req.query;
    let collectionsQuery = Collection.find().sort({ itemsCount: -1 });
    if (limit) {
        collectionsQuery = collectionsQuery.limit(parseInt(limit, 10));
    }
    const collections = await collectionsQuery.populate("user", {
        username: 1,
    });
    res.json(collections);
};

const getById = async (req, res) => {
    const { collectionId } = req.params;
    const collection = await Collection.findById(collectionId).populate([
        {
            path: "user",
            select: "username",
        },
        {
            path: "items",
            select: "name customFields",
        },
    ]);
    if (!collection) {
        return res
            .status(404)
            .json({ message: "Request collection doesn't exist." });
    }
    res.json(collection);
};

const create = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const user = req.user;
    const newCollectionData = { ...req.body };
    const newCollectionUserId = newCollectionData.user;
    try {
        checkUserPermission(user, newCollectionUserId);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    const newCollection = await new Collection(newCollectionData).save();
    addCollectionToUser(newCollectionUserId, newCollection._id);
    const populatedCollection = await Collection.findById(
        newCollection._id
    ).populate("user", { username: 1 });
    res.status(201).json(populatedCollection);
};

const update = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const user = req.user;
    const { collectionId } = req.params;
    const updatedCollectionData = { ...req.body };
    const collectionToUpdate = await Collection.findById(collectionId);
    try {
        checkUserPermission(user, updatedCollectionData.user);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    if (!collectionToUpdate) {
        return res.status(404).json({ message: "Collection not found." });
    }
    const updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        updatedCollectionData,
        { new: true }
    ).populate([
        {
            path: "user",
            select: "username",
        },
        {
            path: "items",
            select: "name customFields",
        },
    ]);
    res.json(updatedCollection);
};

const remove = async (req, res) => {
    const user = req.user;
    const { collectionId } = req.params;
    const collectionToDelete = await Collection.findById(collectionId);
    const collectionUserId = collectionToDelete.user.toString();
    try {
        checkUserPermission(user, collectionUserId);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    if (!collectionToDelete) {
        return res.status(404).json({ message: "Collection not found." });
    }
    await removeItemsByCollectionId(collectionId);
    await removeCollectionFromUser(collectionUserId, collectionId);
    await Collection.findByIdAndDelete(collectionId);
    res.sendStatus(204);
};

export { getAll, getById, create, remove, update };
