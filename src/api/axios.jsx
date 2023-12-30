import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"
const CREATE_USER = "/auth/users/"
const CREATE_AUTHOR = "/api/authors/"
const LOGIN = "/auth/jwt/create/"
const GET_USER = "/api/authors/me/"
const GET_TOKEN = '/auth/jwt/refresh/'
const TOPICS = "/api/topics/"
const POSTS = "/api/posts/"

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

export const getTopics = async () => {
    return baseAxios.get(`${TOPICS}`)
}

export const getPosts = async data => {
    return baseAxios.get(`${POSTS}`, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const getPost = async data => {
    return baseAxios.get(`${POSTS}${data.id}/`, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const editPost = async data => {
    return baseAxios.patch(`${POSTS}${data.id}/`, data.post, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const createPost = async data => {
    return baseAxios.post(`${POSTS}`, data.post, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const getSections = async data => {
    return baseAxios.get(`${POSTS}${data.id}/sections/`, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const createSection = async data => {
    return baseAxios.post(`${POSTS}${data.id}/sections/`, data.section, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const editSection = async data => {
    return baseAxios.patch(`${POSTS}${data.postId}/sections/${data.sectionId}/`, data.section, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const deleteSection = async data => {
    return baseAxios.delete(`${POSTS}${data.postId}/sections/${data.sectionId}/`, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const createBody = async data => {
    return baseAxios.post(`${POSTS}${data.postId}/sections/${data.sectionId}/bodies/`, data.body, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const editBody = async data => {
    return baseAxios.patch(`${POSTS}${data.postId}/sections/${data.sectionId}/bodies/${data.bodyId}/`, data.body, {
        headers: {Authorization: `JWT ${data.accessToken}`}
    })
}

export const deleteBody = async data => {
    return baseAxios.delete(`${POSTS}${data.postId}/sections/${data.sectionId}/bodies/${data.bodyId}/`), {
        headers: {Authorization: `JWT ${data.accessToken}`}
    }
}

export const getBodies = async data => {
    return baseAxios.get(`${POSTS}${data.postId}/sections/${data.sectionId}/bodies/`, {
        headers: { Authorization: `JWT ${data.accessToken}`}
    })
}