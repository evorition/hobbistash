import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
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
                    <Nav className="my-lg-0">
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <NavDropdown title="Username" align="end">
                            <NavDropdown.Item href="#action3">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Sign Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
