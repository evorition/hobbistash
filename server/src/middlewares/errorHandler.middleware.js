const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (error.name === "MongoServerError" && error.code === 11000) {
        return res
            .status(409)
            .json({ message: "This email address is already in use." });
    }
    next(error);
};

export default errorHandler;
