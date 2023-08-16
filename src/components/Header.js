import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = (props) => {
    const navigate = useNavigate();
    const [tokenData, setTokenData] = useState("");
    const { logout, user } = useContext(UserContext);
    // const [hideHeader, setHideHeader] = useState(false);

    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHideHeader(true);
    //     }
    // }, [true])
    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.success("Log out Success!!")
    }
    const handleCheck = () => {
        let token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            setTokenData(token);
        } else {
            navigate("/login");
            toast.warning("Please Login!")
        }
    }
    // const checkUrl = () => {
    //     let token = localStorage.getItem("token");
    //     const url = window.location.pathname;
    //     console.log(token);
    //     if (url == "/users") {
    //         if (token) {
    //             setTokenData(token);
    //         } else {
    //             navigate("/login");
    //             toast.warning("Please Login!")
    //         }
    //     }

    // }
    // useEffect(() => {
    //     handleCheck();
    // }, [""])
    return (
        <>
            <Navbar expand="lg" bg='light'>
                <Container>
                    <Navbar.Brand>
                        <img
                            src={logoApp}
                            width='30'
                            height='30'
                            className='d-inline-block algin-top'
                            alt='React Bootstrap logo'
                        />
                        React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&
                            <>
                                < Nav className="me-auto">
                                    <NavLink to={!tokenData ? "/login" : "/"} className="nav-link"
                                        onClick={() => handleCheck()}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink to={!tokenData ? "/login" : "/users"} className="nav-link"
                                        onClick={() => handleCheck()}
                                    > Manager Users</NavLink>
                                    <NavLink to="/register" className="nav-link"
                                    > Register</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'>Welcom {user.email}</span>}
                                    <NavDropdown title="Setting" >
                                        {user && user.auth === true ? <NavDropdown.Item onClick={() => handleLogout()}>
                                            Logout
                                        </NavDropdown.Item> : <NavLink to='/login' className="dropdown-item">Login</NavLink>}
                                    </NavDropdown>
                                </Nav>
                            </>}
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>)
}
export default Header 
