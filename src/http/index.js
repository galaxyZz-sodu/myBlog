const axios = require('axios').default;

const $http = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': "application/json;charset=utf-8",
        'Authorization': 'Bearer '+ window.localStorage.getItem('token')
    }
})



/* $http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        // 如果后端没有添加 'Bearer ', 则需要前端自己拼接
        Authorization: localStorage.getItem('token'),
    }
}) */


export default $http
