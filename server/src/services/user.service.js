import User from "../models/user.model.js";

const removeCollectionFromUser = async (userId, collectionId) => {
    return User.findByIdAndUpdate(userId, {
        $pull: { collection: collectionId },
    });
};

export { removeCollectionFromUser };
