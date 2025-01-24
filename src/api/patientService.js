import api from "./api"

export const getAllPatients = () => api.get("/patient")