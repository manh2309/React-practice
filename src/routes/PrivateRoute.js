import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Alert } from "react-bootstrap";

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    if (user && !user.auth) {
        <Alert variant="danger" className="mt-3">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                You don't have permisson to access this route.
            </p>
        </Alert>
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoutes;