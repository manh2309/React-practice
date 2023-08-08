import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9000"
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    return Promise.reject(error);
})
export default instance;