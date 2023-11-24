import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { BsFillTrashFill } from "react-icons/bs";

import dateUtils from "../utils/date";
import { useUser } from "../contexts/UserContext";
import collectionsService from "../services/collections";
import { useNotification } from "../contexts/NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ItemsTable from "../components/ItemsTable";

const CollectionPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { displayNotification } = useNotification();
    const { collectionId } = useParams();
    const [collection, setCollection] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const apiCollection = await collectionsService.getById(
                    collectionId
                );
                setCollection(apiCollection);
            } catch (error) {
                displayNotification(error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleCollectionRemove = async () => {
        try {
            await collectionsService.remove(collectionId);
            navigate(`/user/${user.id}`);
        } catch (error) {
            displayNotification(error);
            navigate("/");
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <Row className="my-4 justify-content-center">
                <Col md="auto">
                    <Image
                        src={collection.imageUrl || "/no-image.webp"}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            maxHeight: "350px",
                        }}
                    />
                </Col>
                <Col>
                    <Row>
                        <h1>{collection.name}</h1>
                    </Row>
                    <Row className="mb-2">
                        <h5>Owner</h5>
                        <a href={`/user/${collection.user.id}`}>
                            {collection.user.username}
                        </a>
                    </Row>
                    <Row>
                        <h5>Created at</h5>
                        <p>{dateUtils.formatDate(collection.createdAt)}</p>
                    </Row>
                    <Row>
                        <h5>Description</h5>
                        <p>{collection.description}</p>
                    </Row>
                    <Row>
                        <h5>Topic</h5>
                        <p>{collection.topic}</p>
                    </Row>
                </Col>
                {user && user.id === collection.user.id && (
                    <Col lg="auto" className="d-flex flex-column">
                        <Button
                            className="mb-2 mt-sm-2 align-self-start"
                            href={`/collection/${collection.id}/add-item`}
                        >
                            Add new Item
                        </Button>
                        <Button
                            className="align-self-start"
                            variant="danger"
                            onClick={handleCollectionRemove}
                        >
                            <BsFillTrashFill />
                        </Button>
                    </Col>
                )}
            </Row>
            {collection.items.length > 0 ? (
                <ItemsTable
                    customFields={collection.customFields}
                    items={collection.items}
                />
            ) : (
                <p className="fst-italic">
                    Collection currently doesn't have any items.
                </p>
            )}
        </Container>
    );
};

export default CollectionPage;
