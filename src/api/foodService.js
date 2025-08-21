import dataHeaders from './data/headers.json'
import foodProperties from './data/food_props.json'
import api from './api'

export const headers = dataHeaders

export const foodProps = foodProperties

export const getAllFoodByName = (name) => api.get(`/food?name=${name}`)

export const getAllFoodById = (id) => api.get(`/food?id=${id}`)