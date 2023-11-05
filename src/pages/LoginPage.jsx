import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode";


function LoginPage (){

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, isAuthenticated, singinGoogle} = useAuth()
    const navigate = useNavigate()
    const onSubmit = handleSubmit( (data) => {
        signin(data)
    })

    function handleCallbackResponse(response) {
        var decoded = jwtDecode(response.credential)
        const user = {
            username: decoded.name,
            email: decoded.email,
            password: decoded.sub,
        }
        console.log(user)
        singinGoogle(user)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "876674005177-3mfb2ce77speu3m7q0g9c09lg1sqnebo.apps.googleusercontent.com",
            //Permitir dominio "lcorralesg.live"
            allowed_parent_origin: "http://lcorralesg.live",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("singInDiv"),
            { theme:"outline", size:"large", text:"continue_with", width:"600px", height:"50px", prompt_parent_id:"g_id_onload", prompt_consent:"consent", prompt_select_account:"select_account", prompt_locale:"es" }
        );

        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Login</h1>
            <div className="bg-zinc-800 max-w-md w-full px-4 py-8 rounded-md shadow-md">
                <form
                    onSubmit={onSubmit}>
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
                            className="w-full py-2 px-100 bg-zinc-600 hover:bg-zinc-500 rounded-md text-white text-sm font-medium mb-5"
                        >
                            Login
                    </button>
                    <div id="singInDiv" className=" mb-5"></div>
                    <Link to="/register" className="text-sm text-gray-500 hover:text-gray-600 hover:underline">Don't have an account? Register</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage