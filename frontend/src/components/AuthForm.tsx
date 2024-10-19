/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { doSignInWithGoogle } from "../utils/config/auth";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/useAuth";

interface AuthFormProps {
    title: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<any>;
    error?: string;
}

export function AuthForm({ title, handleSubmit, error }: AuthFormProps) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSinginIn, setIsSinginIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(error);

    const {isAuthenticated} = useAuth();

    const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            doSignInWithGoogle();
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
        }
    }

    const handleSubmitMiddle = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        e.preventDefault();
        if(!isSinginIn){
            setIsSinginIn(true);
            try {
                await handleSubmit(e, email, password);
            } catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unknown error occurred");
                }
            }
        }
    }

    return (
        <div className="bg-prussian-blue rounded-2xl w-4/5 md:w-1/4">
            {isAuthenticated && <Navigate to={"/home"} />}
            <form className="flex flex-col py-12 px-16" onSubmit={(e)=> handleSubmitMiddle(e,email,password)}>
                <h1 className="text-3xl text-left font-bold text-white mb-6">{title}</h1>
                <label className="text-white mb-1" htmlFor="email">Correo electrónico</label>
                <input className="p-2 mb-6 rounded" type="email" id="email" name="email" onChange={(e) => setEmail((e.target as HTMLInputElement).value)} value={email} />
                <label className="text-white mb-1" htmlFor="password">Contraseña</label>
                <input className="p-2 rounded" type="password" id="password" name="password" onChange={(e) => setPassword((e.target as HTMLInputElement).value)} value={password} />
                <button className="bg-ut-orange text-white border font-semibold text-xl p-2 mt-12 rounded-2xl transition hover:bg-selective-yellow hover:border-black hover:duration-200">{title}</button>
                <p className="text-center text-white font-semibold font-xl my-2">O</p>
                <div className="flex justify-center">
                    <div className="flex items-center justify-center border border-black rounded-3xl md:w-3/4 bg-white transition hover:bg-slate-200 hover:duration-200">
                        <button className="px-4 py-2 text-black flex gap-2" onClick={(e) => handleGoogleSignIn(e)}>
                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                            <span>{title} con Google</span>
                        </button>
                    </div>
                </div>
                {errorMessage && <p className="text-center mt-6 text-red-600 font-semibold">{errorMessage}</p>}
            </form>
        </div>
    )
}