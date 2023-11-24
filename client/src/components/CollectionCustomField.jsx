import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFillTrashFill } from "react-icons/bs";
import { Controller } from "react-hook-form";

const CollectionCustomField = ({
    index,
    control,
    errors,
    removeCustomField,
}) => (
    <Row className="mb-3">
        <Col xs={4} sm={2}>
            <FloatingLabel label="Type">
                <Controller
                    name={`customFields[${index}].type`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Form.Control as="select" {...field}>
                            <option value="string">String</option>
                            <option value="date">Date</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="text">Text</option>
                        </Form.Control>
                    )}
                />
            </FloatingLabel>
        </Col>
        <Col xs={8} sm={10}>
            <InputGroup>
                <FloatingLabel label="Field name">
                    <Controller
                        name={`customFields[${index}].name`}
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
                <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeCustomField(index)}
                >
                    <BsFillTrashFill />
                </Button>
            </InputGroup>
            {errors.customFields && errors.customFields[index] && (
                <Form.Text className="text-danger">
                    {errors.customFields[index].name?.message}
                </Form.Text>
            )}
        </Col>
        <Col xs={2} sm={1} className="text-end"></Col>
    </Row>
);

export default CollectionCustomField;
