import { Logo } from "./Logo";

export function Header() {
    return (
        <header className="bg-prussian-blue text-white font-bold h-20 flex justify-between items-center sticky top-0">
            <div className="ml-6 flex items-center">
                <Logo fill="#fff" />
                <ul className="ml-12 list-none">
                    <li className="inline-block mx-4">Home</li>
                    <li className="inline-block mx-4">Products</li>
                    <li className="inline-block mx-4">About</li>
                    <li className="inline-block mx-4">Contact</li>
                </ul>
            </div>
            <ul className="mr-12 list-none">
                <li className="inline-block mx-4">Login</li>
            </ul>
        </header>
    )
}