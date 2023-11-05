import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

function RegisterPage (){
    const { register, handleSubmit } = useForm()
    const { signup, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    } , [isAuthenticated])

    const onSubmit = handleSubmit(async (data) => {
        await signup(data)
    })

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Register</h1>
            <div className="bg-zinc-800 max-w-md w-full px-4 py-8 rounded-md shadow-md">
                <form
                    onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", {required: true})}
                        className="w-full p-2 my-2 border border-gray-400 rounded outline-none text-gray-600"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {required: true})}
                        className="w-full p-2 my-2 border border-gray-400 rounded outline-none text-gray-600"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {required: true})}
                        className="w-full p-2 my-2 border border-gray-400 rounded outline-none text-gray-600"
                    />

                    <button
                        type="submit"
                        className="w-full py-2 px-100 bg-zinc-600 hover:bg-zinc-500 rounded-md text-white text-sm font-medium"
                    >
                        Register
                    </button>

                    <Link to="/login" className="text-sm text-gray-500 hover:text-gray-600 hover:underline mt-4">Already have an account? Login</Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage