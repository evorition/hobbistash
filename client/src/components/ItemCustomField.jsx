import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

const ItemCustomField = ({ customField, index, control }) => {
    switch (customField.type) {
        case "string":
        case "number":
        case "date":
            return (
                <Controller
                    name={`customFields[${index}].value`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Form.Control
                            type={customField.type}
                            placeholder=""
                            {...field}
                        />
                    )}
                />
            );
        case "text":
            return (
                <Controller
                    name={`customFields[${index}].value`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Form.Control as="textarea" {...field} />
                    )}
                />
            );
        case "boolean":
            return (
                <>
                    {" "}
                    <Controller
                        name={`customFields[${index}].value`}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => <Form.Check inline {...field} />}
                    />
                </>
            );
    }
};

export default ItemCustomField;
