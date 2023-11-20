import { checkSchema } from "express-validator";

const commonAuthSchema = {
    email: {
        isEmail: {
            errorMessage: "Invalid email address format.",
        },
    },
    password: {
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: "Password should not be empty",
        },
    },
};

const signupValidationSchema = checkSchema({
    username: {
        trim: true,
        notEmpty: {
            errorMessage: "Username is required.",
        },
    },
    ...commonAuthSchema,
});

const signinValidationSchema = checkSchema(commonAuthSchema);

export { signupValidationSchema, signinValidationSchema };
