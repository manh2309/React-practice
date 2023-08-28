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
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/action/usersAction';

const Header = (props) => {
    const navigate = useNavigate();
    const [tokenData, setTokenData] = useState("");
    const account = useSelector(state => state.user.account);
    const { logout, user } = useContext(UserContext);
    const dispatch = useDispatch();
    // const [hideHeader, setHideHeader] = useState(false);

    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHideHeader(true);
    //     }
    // }, [true])
    const handleLogout = () => {
        // logout();
        dispatch(handleLogoutRedux());

    }
    const handleCheck = () => {
        let token = account.token;
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
    useEffect(() => {
        if (account && account.auth === false && window.location.pathname !== '/login') {
            navigate('/login');
            toast.success("Log out Success!!")
        }
    }, [account])
    return (
        <>
            {console.log("check", tokenData)}
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
                        {(account && account.auth || window.location.pathname === '/') &&
                            <>
                                < Nav className="me-auto">
                                    <NavLink to="/" className="nav-link"
                                        onClick={() => handleCheck()}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink to="/users" className="nav-link"
                                        onClick={() => handleCheck()}
                                    > Manager Users</NavLink>
                                    <NavLink to="/register" className="nav-link"
                                    > Register</NavLink>
                                </Nav>
                                <Nav>
                                    {account && account.email && <span className='nav-link'>Welcom {account.email}</span>}
                                    <NavDropdown title="Setting" >
                                        {account && account.auth === true ? <NavDropdown.Item onClick={() => handleLogout()}>
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
