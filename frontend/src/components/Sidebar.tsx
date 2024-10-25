export function SideBar() {

    const toggleSidebar = () => {
        const sidebar = document.querySelector('nav');
        sidebar?.classList.toggle('translate-x-[-100%]');
    }

    return (
        <>
            <nav className="bg-gray-50 lg:bg-inherit border-r fixed top-0 left-0 bottom-0 h-screen w-56 lg:block duration-300 translate-x-[-100%] lg:translate-x-0 z-40">
                <button className="absolute bg-gray-200 px-4 font-semibold py-2 rounded-full top-24 left-40 md:hidden z-50" onClick={toggleSidebar}>X</button>
                <ul className="flex flex-col items-center justify-center h-full space-y-10">
                    <li className="p-2 w-5/6 rounded-2xl hover:bg-gray-100 transition duration-200"><a href="/add" className="flex justify-start items-center space-x-6"><img src="/src/assets/add-circle.svg" alt="Añadir gasto" className="w-8" /><span>Añadir gasto</span></a></li>
                    <li className="p-2 w-5/6 rounded-2xl hover:bg-gray-100 hover:cursor-pointer transition duration-200"><a href="/dashboard" className="flex justify-start items-center space-x-6"><img src="/src/assets/graph.svg" alt="Dashboard de gastos" className="w-8" /><span>Dashboard</span></a></li>
                    <li className="p-2 w-5/6 rounded-2xl hover:bg-gray-100 transition duration-200"><a href="/history" className="flex justify-start items-center space-x-6"><img src="/src/assets/history.svg" alt="Historial de gastos" className="w-8" /><span>Historial</span></a></li>
                </ul>
            </nav>
        </>

    )
}