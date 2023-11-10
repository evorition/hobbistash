import Item from "../models/item.model.js";

const removeItemsByCollectionId = async (collectionId) => {
    return Item.deleteMany({ collection: collectionId });
};

export { removeItemsByCollectionId };
