import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

function ConfirmPage (){
    const { register, handleSubmit } = useForm()
    const { signup, isAuthenticated, user, errors } = useAuth()
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
            <h1 className="text-4xl font-bold mb-8">Confirm</h1>
            <p className="text-red-500 mb-4">{errors}</p>
            <div className="bg-zinc-800 max-w-md w-full px-4 py-8 rounded-md shadow-md">
                <form
                    onSubmit={onSubmit}>
                    <input
                        type="hidden"
                        {...register("id", {required: true})}
                        value={user.id}
                    />
                    <input
                        type="text"
                        placeholder="Code"
                        {...register("code", {required: true})}
                        className="w-full p-2 my-2 border border-gray-400 rounded outline-none text-gray-600"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-100 bg-zinc-600 hover:bg-zinc-500 rounded-md text-white text-sm font-medium"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmPage