import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/useAuth";
import { doSignOut } from "../lib/firebase/auth";
import { Button } from "./ui/button";

export function Header({sideBar}: {sideBar?: boolean}) {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        const sidebar = document.querySelector('nav');
        sidebar?.classList.toggle('translate-x-[-100%]');
    }

    const signOut = () => {
        doSignOut();
        navigate('/');
    }

    return (
        <header className="bg-prussian-blue text-white font-bold h-20 flex justify-around md:justify-end items-center sticky top-0 z-50">
            {sideBar && <button className="absolute top-5 left-5 lg:hidden z-50" onClick={toggleSidebar}><img src="/src/assets/lines.svg" alt="Lineas" className="w-8" /></button>}
            {currentUser ? (
                <Button className="bg-ut-orange hover:bg-selective-yellow md:mr-10" onClick={signOut}>Cerrar sesión</Button>
            ) : (
                <Button className="bg-ut-orange hover:bg-selective-yellow md:mr-10">Iniciar sesión</Button>
            )}
        </header>
    )
}