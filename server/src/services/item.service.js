import Item from "../models/item.model.js";

const populateItem = async (itemId) => {
    return await Item.findById(itemId).populate([
        { path: "user", select: "username" },
        { path: "collection", select: "name" },
    ]);
};

const removeItemsByCollectionId = async (collectionId) => {
    await Item.deleteMany({ collection: collectionId });
};

const removeItemsWithUserId = async (userId) => {
    await Item.deleteMany({ user: userId });
};

export { removeItemsByCollectionId, populateItem, removeItemsWithUserId };
