import axios from "axios"

const api = axios.create({
    baseURL: "https://nutristern-api.vercel.app"
})

export default api