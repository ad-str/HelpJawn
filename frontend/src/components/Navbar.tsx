import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import './NavbarComponent.css'; 
import { NavLink } from 'react-router-dom';

interface NavbarProps {
    showLogin: () => void;
    showSignUp: () => void;
    loggedIn: boolean;
    handleSignOut: () => void;
    user_type: string | undefined;
}

const NavbarComponent: React.FC<NavbarProps> = ({ showLogin, showSignUp, loggedIn, handleSignOut, user_type }) => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="#">HelpJawn☘️</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                            {(loggedIn && user_type === "volunteer") && (
                                <NavLink
                                    to="/impact"
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    Impact
                                </NavLink>
                            )}
                            {loggedIn && (
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    Account
                                </NavLink>
                            )}
                        </Nav>
                        <Nav>
                            {loggedIn ? 
                            <Button variant="Success" onClick={handleSignOut}>Log Out</Button> : 
                            <>
                                <Button className = "btn-login"  onClick={showLogin}>Login</Button>
                                <Button variant ="" onClick={showSignUp}>Sign Up</Button>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;