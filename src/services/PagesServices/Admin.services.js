import axios from 'axios';
const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1/post";

export const useAdminServices = {
    createPost: async (post = {}, token) => {
        const { title, description, image} = post
        const response = axios.post(`${BASE_URL}/create`, {
                title: title,
                description: description,
                image: image
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(response => {
                console.log(response)
                return response.data;

            })
            .catch(error => {
                console.log(error);
                return {};
            });
        return response;
    },

    ownedPosts: async (parameter = {}, token) => {
        const { limit, page} = parameter
        //console.log({ username, password });
        const response = axios.get(`${BASE_URL}/owned`,
        {
            data:{
                    limit: limit,
                    page: page 
            },
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
            .then(response => {
                return response.data;

            })
            .catch(error => {
                console.log(error);
                return {};
            });
        return response;
    },

    updatePost: async (post = {}, id ,token) => {
        const { title, description, image} = post
        //console.log({ username, password });
        const response = axios.put(`${BASE_URL}/update/${id}`, {
            data:{
                title: title,
                description: description,
                image: image
            },
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
            .then(response => {
                return response.data;

            })
            .catch(error => {
                console.log(error);
                return {};
            });
        return response;
    },
    
    togglePost: async (id ,token) => {
        const response = axios.patch(`${BASE_URL}/toggle/${id}`, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
            .then(response => {
                return response.data;

            })
            .catch(error => {
                console.log(error);
                return {};
            });
        return response;
    },



};