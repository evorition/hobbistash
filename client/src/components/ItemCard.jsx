import Card from "react-bootstrap/Card";

const ItemCard = ({ item }) => (
    <Card className="mb-4">
        <Card.Header>
            <Card.Link href="#">{item.name}</Card.Link>
        </Card.Header>
        <Card.Body>
            <Card.Text>
                From collection:{" "}
                <Card.Link href="#">{item.collection.name}</Card.Link>
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Text>Created at: {item.createdAt}</Card.Text>
        </Card.Footer>
    </Card>
);

export default ItemCard;
