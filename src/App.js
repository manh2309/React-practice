import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from 'react-bootstrap/Container';
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import { toast } from 'react-toastify';
import Register from "./components/Register/Register";
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoute";

const App = () => {
  const [dataToken, setDataToken] = useState("");
  const navigate = useNavigate();
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, [])
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </div >
    </>);
};

export default App;
