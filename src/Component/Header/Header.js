import React from 'react';
import { useContext } from 'react';
import { Button, Container, Image, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { USerContext } from '../../App';
import { handleSignOut, initializeLoginFramework } from '../Login/LoginManager';


const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(USerContext);

    initializeLoginFramework();
    const signOut = () => {
        handleSignOut()
            .then(res => {
                setLoggedInUser(res)
            })
    }
    
    return (
        <Container className="mb-5 mt-2">
            <Navbar className="shadow-none" expand="lg">
                <Navbar.Brand as={Link} to="/">
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
                        <Nav.Link as={Link} to="orders" className="mr-4" active style={{ fontWeight: "500" }}>Orders</Nav.Link>
                        <Nav.Link as={Link} to="admin" className="mr-4" active style={{ fontWeight: "500" }}>Admin</Nav.Link>

                        {loggedInUser?.isSignedInUSer ?
                            <>
                                {
                                    <OverlayTrigger
                                        
                                        trigger="click"
                                        key="bottom"
                                        placement="bottom"
                                        overlay={
                                            <Popover id="popover-positioned-bottom">
                                                <div className="d-flex justify-content-center mt-1">
                                                    <Image style={{ maxWidth: "60px" }} src={loggedInUser.userPhoto} roundedCircle />
                                                </div>
                                                <Popover.Content className=" text-center">
                                                    <strong>{loggedInUser.userName}</strong>
                                                    <br />
                                                    <strong>{loggedInUser.email}</strong>
                                                    <div className="d-flex justify-content-center mt-1">
                                                        <Button onClick={signOut}
                                                            variant="outline-danger"
                                                            className="shadow-none py-0 px-1"
                                                            size="sm">Logout</Button>
                                                    </div>
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    >
                                       <Nav.Link>
                                            <Image
                                                src={loggedInUser.userPhoto || "https://i.ibb.co/Cw6t6pr/dumyuser.jpg"}
                                                width="40"
                                                height="40"
                                                roundedCircle
                                                className="d-inline-block align-top"
                                                alt="Profile"
                                            />
                                        </Nav.Link>
                            </OverlayTrigger>
                            }
                        </>
                        :
                        <Button as={Link} to="login" className="shadow-none login-btn" style={{ backgroundColor: "#FF4B2B"}}>
                        Login
                        </Button>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container >
    );
};

export default Header;