import Card from "react-bootstrap/Card";

const CollectionCard = ({ name, imageUrl, topic, user }) => {
    return (
        <Card>
            <Card.Img variant="top" src={imageUrl || "/no-image.webp"} />
            <Card.Body>
                <Card.Title>
                    <Card.Link href="#">{name}</Card.Link>
                </Card.Title>
                <Card.Subtitle>
                    Owner: <Card.Link href="#">{user.username}</Card.Link>
                </Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <small>Topic: {topic}</small>
            </Card.Footer>
        </Card>
    );
};

export default CollectionCard;
