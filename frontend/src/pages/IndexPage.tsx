import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function IndexPage() {

    const navigate = useNavigate();

    const signIn = () => {
        navigate('/login');
    }

    return (
        <div className="h-screen bg-index-hero bg-cover relative">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <main className="relative flex flex-col items-center h-screen text-white animate-fade-in-1">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid place-items-center bg-inherit md:bg-prussian-blue w-[90%] h-[90%] md:w-[700px] md:h-[700px] rounded-full">
                    <section className="flex flex-col space-y-8 p-4 md:p-0">
                        <div className="space-y-2">
                            <h1 className="uppercase font-semibold text-2xl md:text-4xl text-center opacity-0 animate-fade-in-2 delay-100">
                                Keep <span className="text-ut-orange">track</span> of <span className="block">your expenses</span>
                            </h1>
                            <div className="flex justify-center">
                                <p className="w-full md:w-2/3 text-center text-slate-200 opacity-0 animate-fade-in-2 delay-500">
                                    Toma control de tus gastos diarios y simplifica tus finanzas para alcanzar tus metas más rápido.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center opacity-0 animate-fade-in-2 delay-1000">
                            <Button className="bg-ut-orange hover:bg-selective-yellow mt-5 rounded-full w-2/3 md:w-1/3" onClick={signIn}>Get started</Button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}