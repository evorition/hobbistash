const checkUserPermission = (user, id) => {
    if (user.isAdmin && user._id.toString() !== id) {
        throw new Error("Permission denied.");
    }
};

export { checkUserPermission };
