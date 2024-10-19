import { Header } from "../components/Header";

export function IndexPage() {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="bg-no-repeat bg-cover bg-index-hero h-screen relative">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="container relative mx-auto flex justify-center">
                    <div className="w-3/4 lg:w-5/12">
                        <h1 className="uppercase text-4xl text-center font-bold line-clamp-2 mt-20 lg:mt-72 text-white">
                            Budget Tracker
                        </h1>
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    )
}