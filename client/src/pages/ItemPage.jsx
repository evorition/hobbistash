import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { BsHeart, BsHeartFill, BsFillTrashFill } from "react-icons/bs";

import dateUtils from "../utils/date";
import itemsService from "../services/items";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ItemPage = () => {
    const navigate = useNavigate();
    const { displayNotification } = useNotification();
    const { user } = useUser();
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const apiItem = await itemsService.getById(itemId);
                setItem(apiItem);
            } catch (error) {
                displayNotification(error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (user && item) {
            setIsLiked(item.likes.includes(user.id));
        }
    }, [item, user]);

    const handleLikeClick = async () => {
        await itemsService.like(item.id);
        const updatedLikes = isLiked
            ? item.likes.filter((like) => like !== user.id)
            : [...item.likes, user.id];
        setItem((prevItem) => ({ ...prevItem, likes: updatedLikes }));
    };

    const handleItemRemove = async () => {
        try {
            await itemsService.remove(itemId);
            navigate(`/collections/${collection.id}`);
        } catch (error) {
            displayNotification(error);
            navigate("/");
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="my-4">
            <Row className="justify-content-start">
                <h1>{item.name}</h1>
            </Row>
            <Row className="mb-2">
                <h5>From collection</h5>
                <a href={`/collection/${item.collection.id}`}>
                    {item.collection.name}
                </a>
            </Row>
            <Row>
                <h5>Created at</h5>
                <p>{dateUtils.formatDate(item.createdAt)}</p>
            </Row>
            {item.customFields.length &&
                item.customFields.map((customField, customFieldIndex) => (
                    <Row key={customFieldIndex}>
                        <h5>{customField.name}</h5>
                        <p>{customField.value}</p>
                    </Row>
                ))}
            <Button
                variant="danger"
                disabled={user ? false : true}
                onClick={handleLikeClick}
            >
                {isLiked ? <BsHeartFill /> : <BsHeart />} {item.likes.length}
            </Button>
            {user && user.id === item.user.id && (
                <Button
                    className="align-self-start ms-2"
                    variant="danger"
                    onClick={handleItemRemove}
                >
                    <BsFillTrashFill />
                </Button>
            )}
        </Container>
    );
};

export default ItemPage;
