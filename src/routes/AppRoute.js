import { Routes, Route, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import TableUsers from "../components/TableUsers";
import Register from "../components/Register/Register";
import Home from "../components/Home";
import Login from "../components/Login/Login";
import PrivateRoutes from "./PrivateRoute";
import NotFound from "../components/NotFound/NotFound";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/users"
                    element={
                        <PrivateRoutes>
                            <TableUsers />
                        </PrivateRoutes>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </>
    )
}
export default AppRoutes;