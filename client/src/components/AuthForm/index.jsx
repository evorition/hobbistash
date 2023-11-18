import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "./InputField";
// import Notification from "../Notification";

const AuthForm = ({ title, fields, schema, onSubmit, submitButtonText }) => {
    const { handleSubmit, ...formMethods } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    return (
        <Container>
            <Row
                className="justify-content-center align-items-center"
                style={{ minHeight: "80vh" }}
            >
                <Col xs={10} sm={8} md={6} lg={4}>
                    <h1 className="my-4">{title}</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field) => (
                            <InputField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                formMethods={formMethods}
                            />
                        ))}
                        <Button variant="primary" type="submit">
                            {submitButtonText}
                        </Button>
                    </Form>
                    {/* <Notification /> */}
                </Col>
            </Row>
        </Container>
    );
};

export default AuthForm;
