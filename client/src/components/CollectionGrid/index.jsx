import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CollectionCard from "./CollectionCard";

const CollectionGrid = ({ collections }) => {
    return (
        <Row className="justify-content-center">
            {collections.map((collection, index) => (
                <Col
                    key={index}
                    sm={6}
                    lg={3}
                    className="mt-4"
                    style={{ maxWidth: "20rem" }}
                >
                    <CollectionCard
                        name={collection.name}
                        imageUrl={collection.imageUrl}
                        topic={collection.topic}
                        user={collection.user}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default CollectionGrid;
