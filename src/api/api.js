import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3010"
    // baseURL: "https://nutristern-api.vercel.app"
})

export default api