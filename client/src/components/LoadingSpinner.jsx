import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => (
    <Container className="d-flex align-items-center justify-content-center vh-100">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </Container>
);

export default LoadingSpinner;
