import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import SplashImage from "../../components/SplashImage";
import Title from "../../components/Title";
import { useUserContext } from "../../../Contexts/UserContext";

const Login = () => {
    
    const navigate = useNavigate();

    const { login, token } = useUserContext();

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState(false);

    // Se va guardando cada caracter que ingresamos al input
    const onChangeHandler = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const logged = await login(usernameInput, passwordInput);
        setError(!logged);

        setUsernameInput("");
        setPasswordInput("");
    }

    useEffect(()=>{
        console.log(token);
        if(token){
            navigate("/redirect");
        }
    }, [token, navigate]);

    return (
        <section className="flex flex-col md:flex-row h-screen items-center ">
    <SplashImage />

    <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-500"
    >
        <div className="w-full h-100">
        <Title> WELCOME
            LOG IN TO YOUR ACCOUNT</Title>

        <form className="mt-6" onSubmit={onSubmitHandler}>
        { error && !token && <p className="text-red-500 font-bold"> Ocurrió un error </p>}
            <Input
            label="Email address"
            type="text"
            placeholder="Enter Email Address"
            name="email"
            onChange = { e => onChangeHandler(e, setUsernameInput)}
            />
            <Input
            label="Password"
            type="password"
            placeholder="Enter a password"
            name="password"
            onChange = { e => onChangeHandler(e, setPasswordInput)}
            />
            <Button>LOG IN{" "}</Button>
            { token && <p className="p-2 bg-green-700 text-white mt-6 rounded-md shadow-lg">Ya has iniciado sesión</p>}
        </form>

        <hr className="my-6 border-gray-300 w-full" />

        <Button type="google"> Log in with Google</Button>

        <p className="mt-8">
            Need an account?{" "}
            <Link
            to="/register"
            className="text-purple-500 hover:text-purple-700 font-semibold"
            >
            Create an account
            </Link>
        </p>
        </div>
    </div>
    </section>
    );
}

export default Login