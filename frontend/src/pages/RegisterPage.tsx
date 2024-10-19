import { AuthForm } from "../components/AuthForm";
import { doCreateUserWithEmailAndPassword } from "../utils/config/auth";

export function RegisterPage() {

    const handleCreateAccount = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        return doCreateUserWithEmailAndPassword(email, password);
    }

    return (
        <div className="flex flex-col">
            <main className="bg-gradient-to-t from-blue-green to-sky-blue h-screen flex justify-center items-center">
                <AuthForm title="Registrarse" handleSubmit={handleCreateAccount} />
            </main>
            <footer></footer>
        </div>
    )
}