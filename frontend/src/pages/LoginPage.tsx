import { AuthForm } from "../components/AuthForm"
import { doSignInWithEmailAndPassword } from "../lib/firebase/auth";

export function LoginPage() {

    const handleSignIn = async (email: string, password: string) => {
        return doSignInWithEmailAndPassword(email, password)
            .catch((error) => {
                throw error;
            })
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
            <main className="flex flex-col md:flex-row justify-center w-11/12 md:w-2/3 rounded-xl overflow-hidden bg-white">
                <div className="w-full md:w-1/3 h-48 md:h-auto">
                    <img src="/src/assets/sunset.jpg" alt="Puesta de sol naranja" className="w-full h-full object-cover md:rounded-l-xl" />
                </div>
                <div className="w-full md:w-2/3 p-6">
                    <AuthForm
                        title="Iniciar sesión"
                        description="Inicia sesión para ver detalles sobre tus gastos y llevar un mejor control de tus finanzas."
                        handleSubmit={handleSignIn}
                    />
                </div>
            </main>
        </div>
    )
}