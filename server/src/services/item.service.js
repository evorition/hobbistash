import Item from "../models/item.model.js";

const populateItem = async (itemId) => {
    return await Item.findById(itemId).populate([
        { path: "username", select: "username" },
        { path: "collection", select: "name" },
    ]);
};

const removeItemsByCollectionId = async (collectionId) => {
    await Item.deleteMany({ collection: collectionId });
};

export { removeItemsByCollectionId, populateItem };
