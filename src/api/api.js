import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7039"
})

export default api;