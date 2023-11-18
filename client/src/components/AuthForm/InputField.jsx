import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";

const InputField = ({
    name,
    label,
    type,
    placeholder,
    formMethods: {
        control,
        formState: { errors },
    },
}) => (
    <Form.Group className="mb-3">
        <Form.Label className="mb-3">{label}</Form.Label>
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    {...field}
                />
            )}
        />
        <Form.Text className="text-danger">{errors[name]?.message}</Form.Text>
    </Form.Group>
);

export default InputField;
