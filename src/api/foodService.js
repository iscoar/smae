import dataHeaders from './data/headers.json'
import api from './api'

export const headers = dataHeaders

export const getAllFoodByName = (name) => api.get(`/food?name=${name}`)

export const getAllFoodById = (id) => api.get(`/food?id=${id}`)