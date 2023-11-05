import { createContext, useContext, useState } from "react";
import { getUsersRequest, deleteUserRequest } from "../api/users";

const UsersContext = createContext();

export const useUsers = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error("useUsers must be used within a UsersProvider");
    }

    return context;
}

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await getUsersRequest()
        setUsers(res.data);
    }

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            console.log(res.status);
            if (res.status === 204) {
                console.log("Usuario eliminado");
                setUsers(users.filter((user) => user._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <UsersContext.Provider 
        value={{
            users,
            getUsers,
            deleteUser
        }}>
            {children}
        </UsersContext.Provider>
    )
}