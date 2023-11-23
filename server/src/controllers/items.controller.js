import { validationResult } from "express-validator";
import { checkUserPermission } from "../services/permissions.service.js";
import {
    removeItemFromCollection,
    addItemIdToCollection,
} from "../services/collection.service.js";
import { populateItem } from "../services/item.service.js";
import Item from "../models/item.model.js";

const getAll = async (req, res) => {
    const { limit } = req.query;
    let itemsQuery = Item.find().sort({ createdAt: -1 });
    if (limit) {
        itemsQuery = itemsQuery.limit(parseInt(limit, 10));
    }
    const items = await itemsQuery.populate([
        { path: "user", select: "username" },
        { path: "collection", select: "name" },
    ]);
    res.json(items);
};

const getById = async (req, res) => {
    const { itemId } = req.params;
    const item = await populateItem(itemId);
    if (!item) {
        return res
            .status(404)
            .json({ message: "Requested item doesn't exist." });
    }
    res.json(item);
};

const create = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const user = req.user;
    const newItemData = { ...req.body };
    try {
        checkUserPermission(user, newItemData.user);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    const newItem = await new Item(newItemData).save();
    await addItemIdToCollection(newItem.collection, newItem._id);
    const populatedItem = await populateItem(newItem._id);
    res.status(201).json(populatedItem);
};

const like = async (req, res) => {
    const userId = req.user._id;
    const { itemId } = req.params;
    const itemToLike = await Item.findById(itemId);
    if (itemToLike.likes.includes(userId)) {
        itemToLike.likes = itemToLike.likes.filter(
            (user) => user.toString() !== userId.toString()
        );
        await itemToLike.save();
        return res.status(200).json({ message: "Item unliked." });
    }
    itemToLike.likes = itemToLike.likes.concat(userId);
    await itemToLike.save();
    res.status(200).json({ message: "Item liked." });
};

const update = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ message: result.array()[0].msg });
    }
    const { itemId } = req.params;
    const updatedItemData = { ...req.body };
    const itemToUpdate = await Item.findById(itemId);
    try {
        checkUserPermission(user, updatedItemData.user);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    if (!itemToUpdate) {
        return res.status(404).json({ message: "Item not found." });
    }
    await Item.updateOne({ _id: itemId }, updatedItemData);
    res.json(updatedItem);
};

const remove = async (req, res) => {
    const user = req.user;
    const { itemId } = req.params;
    const itemToDelete = await Item.findById(itemId);
    try {
        checkUserPermission(user, itemToDelete.user.toString());
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    if (!itemToDelete) {
        return res
            .status(404)
            .json({ message: "Requested item doesn't exist." });
    }
    await removeItemFromCollection(itemToDelete.collection, itemId);
    await Item.findByIdAndDelete(itemId);
    res.sendStatus(204);
};

export { getAll, getById, create, like, update, remove };
