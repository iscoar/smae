import api from "./api"

export const getAllPatients = () => api.get("/patient")

export const getAllPatientsByName = (name) => api.get(`/patient?name=${name}`)