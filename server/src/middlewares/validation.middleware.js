import { checkSchema } from "express-validator";

const commonAuthSchema = {
    email: {
        isEmail: {
            errorMessage: "Invalid email address.",
        },
    },
    password: {
        trim: true,
        isLength: {
            options: { min: 6 },
            errorMessage: "Password should be at least 6 characters long.",
        },
    },
};

const signupValidationSchema = checkSchema({
    username: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "Username is required.",
        },
    },
    ...commonAuthSchema,
});

const signinValidationSchema = checkSchema(commonAuthSchema);

export { signupValidationSchema, signinValidationSchema };
