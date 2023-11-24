import Collection from "../models/collection.model.js";

const removeItemFromCollection = async (collectionId, itemId) => {
    await Collection.updateOne(
        { _id: collectionId },
        { $pull: { items: itemId }, $inc: { itemsCount: -1 } }
    );
};

const addItemIdToCollection = async (collectionId, itemId) => {
    await Collection.updateOne(
        { _id: collectionId },
        { $push: { items: itemId }, $inc: { itemsCount: 1 } }
    );
};

const removeCollectionsWithUserId = async (userId) => {
    await Collection.deleteMany({ user: userId });
};

export {
    removeItemFromCollection,
    addItemIdToCollection,
    removeCollectionsWithUserId,
};
