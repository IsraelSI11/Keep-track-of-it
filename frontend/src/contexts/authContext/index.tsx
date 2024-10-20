/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { auth } from "../../utils/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
    currentUser: any;
    isAuthenticated: boolean;
    loading: boolean;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    isAuthenticated: false,
    loading: true,
});

// Proveedor de contexto
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            initializeUser(user);
        });

        return unsubscribe; // Asegúrate de que se desuscriba correctamente
    }, []);

    async function initializeUser(user: any) {
        if (user) {
            setCurrentUser(user); // No necesitas desestructurar user
            setIsAuthenticated(true);
        } else {
            setCurrentUser(null);
            setIsAuthenticated(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        isAuthenticated,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Exportaciones consistentes
export { AuthContext, AuthProvider };
