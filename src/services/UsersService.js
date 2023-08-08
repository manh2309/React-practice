import axios from "./customize-axios";
const fecthAllUser = (page, size) => {
    return axios.get(`/employee/findAllByPageble?page=${page}&size=${size}`)
}

const fecthCreatUser = (first_name, last_name, email, job) => {
    return axios.post('/employee/add', { first_name, last_name, email, job })
}
const fechtEditUser = (id, first_name, last_name, email, job) => {
    return axios.put(`employee/update?id=${id}`, { first_name, last_name, email, job })
}

const fecthDelUser = (id) => {
    return axios.delete(`/employee/delete/${id}`)
}
const fecthSearchUser = (query) => {
    return axios.get(`/employee/search?query=${query}`)
}
export { fecthAllUser, fecthCreatUser, fechtEditUser, fecthDelUser, fecthSearchUser }