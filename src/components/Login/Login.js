import { useState } from 'react';
import '../Login/Login.scss';
import { loginApi } from '../../services/LoginService';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassWord, setIsShowPassWord] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }
        setLoadingAPI(true);
        let res = await loginApi(email.trim(), password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate("/users");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);
    }
    const handleBack = () => {
        navigate("/");
    }
    const handlePressEnter = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    }
    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="child-title">
                <span>Email or Username</span>
            </div>
            <div className='form-control1 '>
                <input type="text" placeholder="Email or Username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <small></small>
                <span></span>
            </div>
            <div className='form-control1 '>
                <input type={isShowPassWord === true ? "text" : "password"}
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={isShowPassWord === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassWord(!isShowPassWord)}
                ></i>
                <small></small>
                <span></span>
            </div>
            <button className={email && password ? "btn-submit active" : "btn-submit"}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{loadingAPI && <i className='fa-solid fa-sync fa-spin'></i>} &nbsp;Login</button>

            <div className='back'>
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={() => handleBack()}>&nbsp;Go back</span>
            </div>
        </div>
    </>)
}

export default Login;