import { useEffect, useState } from "react";
import { CostType } from "../types/CostType";
import { useAuth } from "../contexts/authContext/useAuth";
import { getCosts } from "../lib/firebase/database";
import { Loading } from "./Loading";
import { toast } from "sonner";

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
            {costs.map((cost, index) => (
                <div className="flex flex-col border rounded">
                    <div key={index} className="flex justify-between">
                        <div className="flex flex-col">
                            <img src={`/src/assets/${cost.category}.svg`} alt={`${cost.category} image`} className="w-10"/>
                            <p>{cost.date}</p>
                        </div>
                        <div className="flex flex-col justify-end">
                            <p>{cost.category}</p>
                            <p className="">Coste: {cost.cost}</p>
                        </div>
                    </div>
                    <p>{cost.description}</p>
                </div>

            ))}
        </section>
    );
}
