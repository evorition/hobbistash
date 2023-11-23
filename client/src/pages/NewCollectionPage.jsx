import { useUser } from "../contexts/UserContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import collectionsService from "../services/collections";
import { useNotification } from "../contexts/NotificationContext";
import CustomField from "../components/CustomField";

const newCollectionSchema = Yup.object().shape({
    name: Yup.string().trim().required("Collection name is required"),
    topic: Yup.string(),
    description: Yup.string().trim(),
    customFields: Yup.array().of(
        Yup.object().shape({
            type: Yup.string(),
            name: Yup.string().trim().required("Field name is required"),
        })
    ),
});

const NewCollectionPage = () => {
    const navigate = useNavigate();
    const { displayNotification } = useNotification();
    const { user } = useUser();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ mode: "onBlur", resolver: yupResolver(newCollectionSchema) });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customFields",
    });

    const addCustomField = () => {
        append({ type: "string", name: "" });
    };

    const removeCustomField = (index) => {
        remove(index);
    };

    const onSubmit = async ({ name, topic, description, customFields }) => {
        try {
            const { collectionId } = await collectionsService.create({
                name,
                topic,
                description,
                customFields,
                user: user.id,
            });
            navigate(`/collection/${collectionId}`);
        } catch (error) {
            displayNotification(error);
            navigate("/");
        }
    };

    return (
        <Container className="mt-2">
            <h1 className="mb-3">New collection</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Collection name">
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
                <Form.Group className="mb-3">
                    <FloatingLabel label="Type">
                        <Controller
                            name={"topic"}
                            control={control}
                            defaultValue="Other"
                            render={({ field }) => (
                                <Form.Control as="select" {...field}>
                                    <option value="Books">Books</option>
                                    <option value="Coins">Coins</option>
                                    <option value="Postcards">Postcards</option>
                                    <option value="Seashells">Seashells</option>
                                    <option value="Stamps">Stamps</option>
                                    <option value="Vinyl">Vinyl</option>
                                    <option value="Watches">Watches</option>
                                    <option value="Wine">Wine</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            )}
                        />
                    </FloatingLabel>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Form.Control as="textarea" {...field} />
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Custom Fields</Form.Label>
                    {fields.map((field, index) => (
                        <CustomField
                            key={field.id}
                            index={index}
                            control={control}
                            field={field}
                            errors={errors}
                            removeCustomField={removeCustomField}
                        />
                    ))}
                </Form.Group>
                <div className="d-flex flex-column my-3">
                    <Button variant="secondary" onClick={addCustomField}>
                        Add Field
                    </Button>
                </div>
                <div className="d-flex flex-end justify-content-end">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default NewCollectionPage;
