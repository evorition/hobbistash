import { checkSchema } from "express-validator";

const customFieldTypes = ["number", "string", "text", "date", "boolean"];

const commonItemSchema = {
    name: {
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: "name field is required.",
        },
    },
    tags: {
        isArray: {
            errorMessage: "tags should be an array.",
        },
        optional: true,
        custom: {
            options: (value) => value.every((tag) => typeof tag === "string"),
            errorMessage: "tag value should be string.",
        },
    },
    customFields: {
        isArray: {
            errorMessage: "customFeilds should be an array.",
        },
        optional: true,
        custom: {
            options: (value) =>
                value.every(
                    (field) =>
                        typeof field === "object" &&
                        Object.keys(field).length === 3 &&
                        "name" in field &&
                        "type" in field &&
                        "value" in field
                ),
            errorMessage:
                "cutsom fields should contain 'name', 'type' and 'value' fields",
        },
    },
    "customFields.*.name": {
        isString: true,
        trim: true,
        notEmpty: true,
        isLength: { min: 1, max: 50 },
    },
    "customFields.*.type": {
        isIn: {
            options: [customFieldTypes],
            errorMessage: `customFeild type should be one of the following ${customFieldTypes.join(
                ", "
            )}`,
        },
    },
    "customFields.*.value": {
        custom: {
            options: (value, { req }) => {
                const type = req.body.customFields.find(
                    (field) => field.value === value
                ).type;
                switch (type) {
                    case "number":
                        return typeof parseInt(value, 10) === "number";
                    case "string":
                        return typeof value === "string";
                    case "text":
                        return typeof value === "string";
                    case "date":
                        return !isNaN(Date.parse(value));
                    case "boolean":
                        return typeof value === "boolean";
                    default:
                        return false;
                }
            },
            errorMessage: "customFields value should match the given type.",
        },
    },
    user: {
        isMongoId: true,
    },
};

const createItemSchema = checkSchema({
    ...commonItemSchema,
    collection: {
        isMongoId: true,
    },
});

const updateItemSchema = checkSchema({
    ...commonItemSchema,
    name: {
        isString: true,
        trim: true,
        optional: true,
        notEmpty: true,
    },
});

export { createItemSchema, updateItemSchema };
