import { useEffect } from "react";
import { useUsers } from "../context/UsersContext";
import { Navbar } from "../components/Navbar";

function HomePage() {
    const { getUsers, users, deleteUser } = useUsers();

    useEffect(() => {
        getUsers();
    }
    , []);

    return (
        <div>
            < Navbar />
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-8">Lista de Usuarios</h1>
                    <table className="border-separate border-spacing-3 border border-slate-600">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Id</th>
                                <th className="border border-slate-600">Username</th>
                                <th className="border border-slate-600">Email</th>
                                <th className="border border-slate-600">Create At</th>
                                <th className="border border-slate-600">Update At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="border border-slate-700">{user._id}</td>
                                    <td className="border border-slate-700">{user.username}</td>
                                    <td className="border border-slate-700">{user.email}</td>
                                    <td className="border border-slate-700">{user.createdAt}</td>
                                    <td className="border border-slate-700">{user.updatedAt}</td>
                                    <td className="">
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}
export default HomePage;
