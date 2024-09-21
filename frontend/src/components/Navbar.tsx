import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

interface NavbarProps {
    showLogin: () => void;
    showSignUp: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ showLogin, showSignUp }) => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="#">Give Back</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </Nav>
                        <Nav>
                            <Button variant="primary" onClick={showLogin}>Login</Button>
                            <Button variant="" onClick={showSignUp}>Sign Up</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;