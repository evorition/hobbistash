import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import collectionsService from "../services/collections";
import CollectionGrid from "../components/CollectionGrid";

const HomePage = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        (async () => {
            const biggestCollections = await collectionsService.getAll();
            setCollections(biggestCollections);
        })();
    }, []);

    return (
        <Container className="my-4">
            <h3>Top 5 biggest collections</h3>
            <CollectionGrid collections={collections} />
        </Container>
    );
};

export default HomePage;
