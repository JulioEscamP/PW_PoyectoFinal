
const url_base = "https://posts-pw2021.herokuapp.com/api/v1";
import axios from 'axios';

export const useServices = {
    login: async (username, password) => {

        const response = axios.post(`${url_base}/auth/signin`, {
            username: username,
            password: password
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

    verifyToken: async (token) => {
        const response = axios.get(`${url_base}/auth/whoami`, {
            headers: { Authorization: `Bearer ${token}` }
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