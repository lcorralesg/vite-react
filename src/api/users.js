import axios from "./axios";

export const getUsersRequest = async () => axios.get(`/users`);

export const deleteUserRequest = async (id) => axios.delete(`/users/${id}`);