import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://54.166.217.206:3000/api',
    withCredentials: true
});

export default instance;