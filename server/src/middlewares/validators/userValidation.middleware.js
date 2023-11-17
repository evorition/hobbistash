import { checkSchema } from "express-validator";

const updateUserValidationSchema = checkSchema({
    blocked: {
        isBoolean: true,
        optional: true,
    },
    isAdmin: {
        isBoolean: true,
        optional: true,
    },
});

export { updateUserValidationSchema };
