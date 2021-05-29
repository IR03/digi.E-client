import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
    return (
        <Container className="mb-5 mt-2">
        <Navbar className="shadow-none" expand="lg">
            
                <Navbar.Brand>
                    <h1
                        className="d-inline-block align-top"
                        style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                        digi<span style={{color: "blue"}}>.</span>E
                    </h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" className="mr-4" active style={{ fontWeight: "500" }}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/addProduct" className="mr-4" active style={{ fontWeight: "500" }}>Add Product</Nav.Link>
                    <Nav.Link as={Link} to="/updateProduct" className="mr-4" active style={{ fontWeight: "500" }}>Update Product</Nav.Link>
                   <Nav.Link as={Link} to="/deleteProduct" className="mr-4" active style={{ fontWeight: "500" }}>Delete Product</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        </Container>
    );
};

export default AdminNavBar;