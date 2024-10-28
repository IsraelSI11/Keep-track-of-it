import { Button } from "../components/ui/button";

export function IndexPage() {
    return (
        <div className="h-screen bg-index-hero bg-cover relative">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <main className="relative flex flex-col items-center h-screen text-white">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid place-items-center bg-prussian-blue w-[800px] h-[800px] rounded-full">
                    <section className="flex flex-col">
                        <div>
                            <h1 className="uppercase font-semibold text-4xl text-center">
                                Keep <span className="text-ut-orange">track</span> of <span className="block">your expenses</span>
                            </h1>
                            <div className="flex justify-center">
                                <p className="w-1/2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corporis cumipit rem optio impedit?</p>
                            </div>
                            <div className="flex justify-center">
                                <Button className="bg-ut-orange hover:bg-selective-yellow mt-5">Get started</Button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer></footer>
        </div>
    )
}