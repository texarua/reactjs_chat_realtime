import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/api/v1/user',
    // withCredentials: true
});

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         if(error.response.status === 401) {
//             await api.post('/refresh', {
//                 withCredentials: true,
//             }).catch(refreshTokenApiError => {
//                 // localStorage.removeItem()
//                 return Promise.reject(refreshTokenApiError);
//             })
//             return api(error.config);
//         }
//         return Promise.reject(error);  
//     }
   
// );

export default api;

export const getConfig = (token) => {
    return   {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
}