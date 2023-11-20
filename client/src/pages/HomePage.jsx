import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import collectionsService from "../services/collections";
import itemsService from "../services/items";
import CollectionGrid from "../components/CollectionGrid";
import ItemCard from "../components/ItemCard";

const HomePage = () => {
    const [collections, setCollections] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const biggestCollections = await collectionsService.getAll();
            setCollections(biggestCollections);
            const latestItems = await itemsService.getAll();
            setItems(latestItems);
        })();
    }, []);

    return (
        <Container className="my-4">
            <h3 className="mb-4">Top 5 biggest collections</h3>
            <CollectionGrid collections={collections} />
            <hr />
            <h3 className="mb-4">Recently added items</h3>
            {items.map((item, index) => {
                return <ItemCard key={index} item={item} />;
            })}
        </Container>
    );
};

export default HomePage;
