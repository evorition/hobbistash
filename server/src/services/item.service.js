import Item from "../models/item.model.js";

const removeItemsByCollectionId = async (collectionId) => {
    await Item.deleteMany({ collection: collectionId });
};

export { removeItemsByCollectionId };
