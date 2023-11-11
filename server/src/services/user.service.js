import User from "../models/user.model.js";

const removeCollectionFromUser = async (userId, collectionId) => {
    await User.updateOne(
        { _id: userId },
        { $pull: { collections: collectionId } }
    );
};

const addCollectionToUser = async (userId, collectionId) => {
    await User.updateOne(
        { _id: userId },
        { $push: { collections: collectionId } }
    );
};

export { removeCollectionFromUser, addCollectionToUser };
