import { AuthForm } from "../components/AuthForm"
import { doSignInWithEmailAndPassword } from "../utils/config/auth";

export function LoginPage() {

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        doSignInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log("User signed in", res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex flex-col">
            <main className="bg-gradient-to-t from-blue-green to-sky-blue h-screen flex justify-center items-center">
                <AuthForm title="Iniciar sesión" handleSubmit={handleSignIn} />
            </main>
            <footer></footer>
        </div>
    )
}