import axios from "./customize-axios";
const fecthAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const fecthCreatUser = (name, job) => {
    return axios.post('/api/users', { name, job })
}
const fechtEditUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job })
}
export { fecthAllUser, fecthCreatUser, fechtEditUser }