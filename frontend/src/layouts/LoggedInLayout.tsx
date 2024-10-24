import { ReactNode } from "react";
import { SideBar } from "../components/Sidebar";

interface LoggedInLayoutProps {
    children: ReactNode;
}

export function LoggedInLayout({ children }: LoggedInLayoutProps) {

    return (
        <div className="flex">
            <SideBar />
            <main className="flex w-full lg:ml-60 mt-12">
                {children}
            </main>
        </div>
    )

}