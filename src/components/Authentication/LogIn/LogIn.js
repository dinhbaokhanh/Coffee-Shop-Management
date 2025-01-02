"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import style from "./Login.module.css"; 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { data: session, status } = useSession(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        setIsLoading(false); 

        if (res?.error) {
            setError("Wrong username or password");
            setPassword("")
        } else {
            console.log("Logged in successfully",session?.user?.role);
            if (session?.user?.role === "manager") {
                router.push("/general");
            } else if (session?.user?.role === "staff") {
                router.push("/order");
            }
        }
    };

    return (
        <div className={style.loginContainer}>
            <h1>Log in</h1>
            <form onSubmit={handleLogin} className={style.loginForm}>
                <div className={style.inputGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={style.inputField}
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={style.inputField}
                    />
                </div>
                {error && <p className={style.errorText}>{error}</p>}
                <button 
                    type="submit" 
                    className={style.submitButton} 
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>
            </form>
        </div>
    );
};

export default Login;
