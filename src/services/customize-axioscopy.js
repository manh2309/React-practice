import axios from "axios";

const instances = axios.create({
    baseURL: "https://reqres.in"
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instances.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    // return Promise.reject(error);
    let res = {};
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.header = error.response.header;
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log("Error", error.message);
    }
    return res;
})
export default instances;