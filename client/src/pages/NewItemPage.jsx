import * as Yup from "yup";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import collectionsService from "../services/collections";
import itemsService from "../services/items";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ItemCustomField from "../components/ItemCustomField";

const newItemSchema = Yup.object().shape({
    name: Yup.string().trim().required("Item name is required"),
    customFields: Yup.array().of(
        Yup.object().shape({
            type: Yup.string(),
            name: Yup.string(),
            value: Yup.mixed()
                .transform((v) =>
                    typeof v !== "boolean" && !v ? undefined : v
                )
                .required("Value is required"),
        })
    ),
});

const NewItemPage = () => {
    const navigate = useNavigate();
    const { collectionId } = useParams();
    const { displayNotification } = useNotification();
    const { user } = useUser();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur", resolver: yupResolver(newItemSchema) });
    const [collection, setCollection] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const collectionApi = await collectionsService.getById(
                    collectionId
                );
                setCollection(collectionApi);
            } catch (error) {
                displayNotification(error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (user && user.id !== collection.user.id) {
            displayNotification("Permission denied.");
            navigate("/");
        }
    }, [collection]);

    const onSubmit = async ({ name, customFields }) => {
        try {
            const { itemId } = await itemsService.create({
                name,
                customFields,
                user: user.id,
                collection: collection.id,
            });
            navigate(`/item/${itemId}`);
        } catch (error) {
            displayNotification(error);
            navigate("/");
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="mt-2">
            <h1 className="mb-3">New item for {collection.name} collection </h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Item name">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    {...field}
                                />
                            )}
                        />
                    </FloatingLabel>
                    <Form.Text className="text-danger">
                        {errors["name"]?.message}
                    </Form.Text>
                </Form.Group>
                {collection.customFields.map((field, index) => (
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>{field.name}</Form.Label>
                        <ItemCustomField
                            customField={field}
                            index={index}
                            control={control}
                            errors={errors}
                        />
                        {errors.customFields && errors.customFields[index] && (
                            <Form.Text className="text-danger">
                                {errors.customFields[index].value?.message}
                            </Form.Text>
                        )}
                        <Controller
                            name={`customFields[${index}].name`}
                            control={control}
                            defaultValue={field.name}
                            render={() => <Form.Control type="hidden" />}
                        ></Controller>
                        <Controller
                            name={`customFields[${index}].type`}
                            control={control}
                            defaultValue={field.type}
                            render={() => <Form.Control type="hidden" />}
                        ></Controller>
                    </Form.Group>
                ))}
                <div className="d-flex flex-end justify-content-end my-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default NewItemPage;
