import { useNavigate } from "react-router-dom";
import { doSignOut } from "../lib/firebase/auth";
import { toggleSidebar } from "../lib/utils";
import { Button } from "./ui/button";

export function SideBar() {

    const navigate = useNavigate();

    const signOut = () => {
        doSignOut();
        navigate('/');
    }

    return (
        <>
            <button className="fixed top-3 left-5 lg:hidden z-50" onClick={() => toggleSidebar()}><img src="/src/assets/lines.svg" alt="Lineas" className="w-8" /></button>
            <nav className="bg-gray-50 lg:bg-inherit border-r fixed top-0 left-0 bottom-0 h-screen w-56 lg:block duration-300 translate-x-[-100%] lg:translate-x-0 z-40">
                <div className="flex justify-center relative top-3 md:top-10">
                    <img src="/src/assets/logo.svg" className="w-10 md:w-20" alt="Logo de la aplicación" />
                </div>
                <button className="absolute bg-gray-200 px-4 font-semibold py-2 rounded-full top-3 left-40 md:hidden z-50" onClick={() => toggleSidebar()}>X</button>
                <ul className="flex flex-col items-center justify-center h-4/5 space-y-10">
                    <li className="p-2 w-5/6 rounded-2xl hover:bg-gray-100 transition hover:cursor-pointer duration-200"><a href="/add" className="flex justify-start items-center space-x-6"><img src="/src/assets/add-circle.svg" alt="Añadir gasto" className="w-8" /><span>Añadir gasto</span></a></li>
                    <li className="p-2 w-5/6 rounded-2xl hover:bg-gray-100 hover:cursor-pointer transition duration-200"><a href="/dashboard" className="flex justify-start items-center space-x-6"><img src="/src/assets/graph.svg" alt="Dashboard de gastos" className="w-8" /><span>Dashboard</span></a></li>
                    <li className="p-2 w-5/6 rounded-2xl hover:bg-gray-100 transition hover:cursor-pointer duration-200"><a href="/history" className="flex justify-start items-center space-x-6"><img src="/src/assets/history.svg" alt="Historial de gastos" className="w-8" /><span>Historial</span></a></li>
                </ul>
                <Button variant={'link'} className="absolute bottom-5 left-2 text-[#ca2f2f] rounded-2xl hover:bg-gray-100 transition duration-200 text-lg font-semibold" onClick={() => signOut()}><img src="/src/assets/sign-out.svg" alt="Historial de gastos" className="w-8" />Cerrar sesión</Button>
            </nav>
        </>

    )
}