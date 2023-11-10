import { validationResult } from "express-validator";
import Collection from "../models/collection.model.js";
import { checkUserPermission } from "../services/permissions.service.js";
import { removeItemsByCollectionId } from "../services/item.service.js";
import { removeCollectionFromUser } from "../services/user.service.js";

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
    const { id } = req.params;
    const collection = await Collection.findById(id).populate([
        {
            path: "user",
            select: "username",
        },
        {
            path: "items",
            select: "name customFields",
        },
    ]);
    res.json(collection);
};

const create = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const user = req.user;
    const newCollectionData = { ...req.body };
    try {
        checkUserPermission(user, newCollectionData.user);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    let newCollection = await new Collection(newCollectionData).save();
    user.collections.push(newCollection._id);
    await user.save();
    newCollection = await Collection.findById(newCollection._id).populate(
        "user",
        { username: 1 }
    );
    return res.status(201).json(newCollection);
};

const update = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const updatedCollectionData = { ...req.body };
    try {
        checkUserPermission(user, id);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    const updatedCollection = await Collection.findByIdAndUpdate(
        id,
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
    const { id } = req.params;
    const collectionToDelete = await Collection.findById(id);
    if (!collectionToDelete) {
        return res.status(404).json({ message: "Collection not found." });
    }
    try {
        checkUserPermission(user, collectionToDelete.user.toString());
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    await removeItemsByCollectionId(id);
    await removeCollectionFromUser(collectionToDelete.user, id);
    await collectionToDelete.remove();
    res.sendStatus(204);
};

export { getAll, getById, create, remove, update };
