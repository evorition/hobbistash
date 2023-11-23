import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import usersService from "../services/users";
import LoadingSpinner from "../components/LoadingSpinner";
import CollectionGrid from "../components/CollectionGrid";

const UserPage = () => {
    const navigate = useNavigate();
    const { displayNotification } = useNotification();
    const { userId } = useParams();
    const { user } = useUser();
    const [fetchedUser, setFetchedUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const apiUser = await usersService.getById(userId);
                setFetchedUser(apiUser);
            } catch (error) {
                displayNotification(error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="my-4">
            <Row>
                <Col>
                    <h1>{fetchedUser.username}</h1>
                </Col>
                {user && user.id === fetchedUser?.id && (
                    <Col
                        xs={12}
                        md={6}
                        className="d-flex align-items-center justify-content-md-end"
                    >
                        <Button href="/collection/new">New collection</Button>
                    </Col>
                )}
            </Row>
            <hr />
            {fetchedUser.collections.length > 0 ? (
                <CollectionGrid collections={fetchedUser.collections} />
            ) : (
                <p className="fst-italic">
                    This user currently has no collections.
                </p>
            )}
        </Container>
    );
};

export default UserPage;
