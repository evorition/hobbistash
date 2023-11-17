import { checkSchema } from "express-validator";

const topics = [
    "Books",
    "Coins",
    "Postcards",
    "Seashells",
    "Stamps",
    "Vinyl",
    "Watches",
    "Wine",
    "Other",
];
const customFieldTypes = ["number", "string", "text", "date", "boolean"];

const commonCollectionSchema = {
    name: {
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: "name field is required.",
        },
    },
    description: {
        isString: {
            errorMessage: "description field should be string",
        },
        trim: true,
    },
    imageUrl: {
        isURL: {
            errorMessage: "imageUrl should be URL",
        },
        optional: true,
        trim: true,
    },
    topic: {
        isIn: {
            options: [topics],
            errorMessage: `topic should be one of the following ${topics.join(
                ", "
            )}`,
        },
    },
    user: {
        isMongoId: true,
    },
};

const createCollectionSchema = checkSchema({
    ...commonCollectionSchema,
    customFields: {
        isArray: true,
        optional: true,
        custom: {
            options: (value) =>
                value.every(
                    (field) =>
                        typeof field === "object" &&
                        Object.keys(field).length === 2 &&
                        "name" in field &&
                        "type" in field
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
});

const updateCollectionSchema = checkSchema({
    ...commonCollectionSchema,
    user: {
        isString: true,
        trim: true,
    },
});

export { createCollectionSchema, updateCollectionSchema };
