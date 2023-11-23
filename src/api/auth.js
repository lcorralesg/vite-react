import axios from "./axios";

export const preRegisterRequest = user =>
    axios.post(`/pre-register`, user);

export const registerRequest = user =>
    axios.post(`/register`, user);

export const loginRequest = user =>
    axios.post(`/login`, user);

export const verifyTokenRequest = () => 
    axios.get(`/verify`);