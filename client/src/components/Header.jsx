import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useUser } from "../contexts/UserContext";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
    const { user, signOut } = useUser();

    return (
        <Navbar expand="lg" className="bg-secondary">
            <Container fluid>
                <Navbar.Brand href="/">Hobbistash</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title="EN">
                            <NavDropdown.Item>EN</NavDropdown.Item>
                            <NavDropdown.Item>RU</NavDropdown.Item>
                        </NavDropdown>
                        <ThemeSwitcher />
                    </Nav>
                    <Form className="d-flex my-2 m-lg-2">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="success">Search</Button>
                    </Form>
                    {user ? (
                        <Nav className="my-lg-0">
                            <NavDropdown title={user.username} align="end">
                                <NavDropdown.Item href={`/user/${user.id}`}>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => signOut()}>
                                    Sign Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className="my-lg-0">
                            <Nav.Link href="/signin">Sign In</Nav.Link>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
