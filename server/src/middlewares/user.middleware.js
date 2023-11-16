const isUserBlocked = (req, res, next) => {
    if (req.user.blocked) {
        return res.status(403).json({ message: "User is blocked." });
    }
    next();
};

const isUserAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Permission denied." });
    }
};

export { isUserBlocked, isUserAdmin };
