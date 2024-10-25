import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/useAuth";
import { doSignOut } from "../lib/firebase/auth";
import { Button } from "./ui/button";
import { toggleSidebar } from "../lib/utils";

export function Header({ sideBar }: { sideBar?: boolean }) {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const signOut = () => {
        doSignOut();
        navigate('/');
    }

    const signIn = () => {
        navigate('/login');
    }

    return (
        <header className="bg-prussian-blue text-white font-bold h-20 flex justify-between items-center sticky top-0 z-50">
            {sideBar ? (
                <>
                    <img id="logo-navbar" className="w-0 md:w-12 ml-10" src="/src/assets/logo.svg" alt="Logo de la aplicación" />
                    <button className="absolute top-5 left-5 lg:hidden z-50" onClick={()=>toggleSidebar()}><img src="/src/assets/lines.svg" alt="Lineas" className="w-8" /></button>
                </>
            ) : (
                <img src="/src/assets/logo.svg" className="w-0 md:w-12 ml-10" alt="Logo de la aplicación" />
            )}
            {currentUser ? (
                <Button className="bg-ut-orange hover:bg-selective-yellow mr-5 md:mr-10" onClick={signOut}>Cerrar sesión</Button>
            ) : (
                <Button className="bg-ut-orange hover:bg-selective-yellow mr-5 md:mr-10" onClick={signIn}>Iniciar sesión</Button>
            )}
        </header>
    )
}
