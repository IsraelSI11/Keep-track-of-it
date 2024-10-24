import { useEffect, useState } from "react";
import { CostType } from "../types/CostType";
import { useAuth } from "../contexts/authContext/useAuth";
import { getRecentCosts } from "../lib/firebase/database";
import { Loading } from "./Loading";
import { toast } from "sonner";
import { DetailsDialog } from "./DetailsDialog";
import { ScrollArea } from "./ui/scroll-area";

export function CostsLogList() {

    const { currentUser } = useAuth();

    const [costs, setCosts] = useState<CostType[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if (currentUser) {
            getRecentCosts(currentUser.uid).then((data) => {
                setCosts(data);
                setLoading(false);
            });
        } else {
            toast("Error", {
                description: "No se han podido obtener los gastos.",
                action: {
                    label: "Cerrar",
                    onClick: () => { },
                },
            });
            setLoading(false);
        }
    }, [currentUser]);

    if (loading) {
        return (
            <section>
                <Loading />
            </section>
        )
    }

    return (
        <section>
            {costs.length === 0 ? (
                <p>No se han añadido gastos recientemente</p>
            ) : (
                <ScrollArea className="h-full w-full rounded-md">
                    {costs.map((cost, index) => (
                        <div className="w-full flex flex-col md:flex-row justify-between items-center border bg-slate-100 hover:bg-slate-200 transition duration-200 p-2 md:p-0" key={index}>
                            <div className="p-3 bg-slate-200 rounded-full mb-2 md:mb-0 md:ml-6">
                                <img src={`/src/assets/${cost.category}.svg`} alt={`${cost.category} image`} className="max-w-12 min-w-10" />
                            </div>
                            <p className="text-center flex-1 mb-2 md:mb-0">{cost.date.split('T')[0]}</p>
                            <p className="text-left flex-1 mb-2 md:mb-0">{cost.cost} €</p>
                            <div className="md:mr-6">
                                <DetailsDialog cost={cost} />
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            )}
        </section>
    );
}
