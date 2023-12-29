import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"
const CREATE_USER = "/auth/users/"
const CREATE_AUTHOR = "/api/authors/"
const LOGIN = "/auth/jwt/create/"
const GET_USER = "/api/authors/me/"
const GET_TOKEN = '/auth/jwt/refresh/'
const GET_POSTS = "/api/posts/"

const baseAxios = axios.create({
    baseURL: BASE_URL
})

export const createUser = async data => {
    return baseAxios.post(`${CREATE_USER}`, data.user)
}

export const createAuthor = async data => {
    return baseAxios.post(`${CREATE_AUTHOR}`, data.author)
}

export const login = async data => {
    return baseAxios.post(`${LOGIN}`, data.user)
}

export const getUser = async data => {
    return baseAxios.get(`${GET_USER}`, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const getToken = async refresh => {
    return baseAxios.post(`${GET_TOKEN}`, refresh)
}

export const getPosts = async data => {
    return baseAxios.get(`${GET_POSTS}`, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}