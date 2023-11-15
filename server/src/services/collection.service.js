import Collection from "../models/collection.model.js";

const removeItemFromCollection = async (collectionId, itemId) => {
    await Collection.updateOne(
        { _id: collectionId },
        { $pull: { items: itemId } }
    );
};

const addItemIdToCollection = async (collectionId, itemId) => {
    await Collection.updateOne(
        { _id: collectionId },
        { $push: { items: itemId } }
    );
};

export { removeItemFromCollection, addItemIdToCollection };
