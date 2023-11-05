import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://lcorralesg.live:3000/api',
    withCredentials: true
});

export default instance;