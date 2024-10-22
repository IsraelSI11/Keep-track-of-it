import { useEffect, useState } from "react";
import { CostType } from "../types/CostType";
import { useAuth } from "../contexts/authContext/useAuth";
import { getCosts } from "../lib/firebase/database";
import { Loading } from "./Loading";
import { toast } from "sonner";
import { DetailsDialog } from "./DetailsDialog";

export function CostsLogList() {

    const { currentUser } = useAuth();

    const [costs, setCosts] = useState<CostType[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if (currentUser) {
            getCosts(currentUser.uid).then((data) => {
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
    }, []);

    if (loading) {
        return (
            <section>
                <Loading />
            </section>
        )
    }

    return (
        <section>
            {costs.map((cost,index) => (
                <div className="flex justify-around items-center gap-4 border bg-slate-100 hover:bg-slate-200 transition duration-200" key={index}>
                    <div className="p-3 bg-slate-200 rounded-full">
                        <img src={`/src/assets/${cost.category}.svg`} alt={`${cost.category} image`} className="w-12" />
                    </div>
                    <p>{cost.date.split('T')[0]}</p>
                    <p className="text-left">{cost.cost} €</p>
                    <DetailsDialog cost={cost} />
                </div>
            ))}
        </section>
    );
}
