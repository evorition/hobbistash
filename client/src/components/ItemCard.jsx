import Card from "react-bootstrap/Card";

import dateUtils from "../utils/date";

const ItemCard = ({ item }) => {
    return (
        <Card className="mb-4">
            <Card.Header>
                <Card.Link href={`/item/${item.id}`}>{item.name}</Card.Link>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    From collection:{" "}
                    <Card.Link href="#">{item.collection.name}</Card.Link>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text>
                    Created at: {dateUtils.formatDate(item.createdAt)}
                </Card.Text>
            </Card.Footer>
        </Card>
    );
};

export default ItemCard;
