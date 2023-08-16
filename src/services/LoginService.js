import axios from "../services/customize-axioscopy";


const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password })
}
export { loginApi }