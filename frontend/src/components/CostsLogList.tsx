/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CostType } from "../types/CostType";
import { useAuth } from "../contexts/authContext/useAuth";
import { Loading } from "./Loading";
import { DetailsDialog } from "./DetailsDialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { deleteCost } from "../lib/firebase/database";
import { toastMessage } from "../lib/utils";

type CostsLogListProps = {
    getCosts: (userId: any) => Promise<any>;
};

export function CostsLogList({ getCosts }: CostsLogListProps) {

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
            toastMessage("Error", "No se ha podido cargar los gastos.");
            setLoading(false);
        }
    }, [currentUser]);

    const deleteCostFromDatabase = (costId: string) => {
        if (costId === 'undefined') {
            toastMessage("Error", "No se ha podido eliminar el gasto.");
            return;
        }
        deleteCost(currentUser?.uid, costId).then(() => {
            setCosts(costs.filter((cost) => cost.id !== costId));
            toastMessage("Gasto eliminado", "Gasto eliminado correctamente.");
        }).catch(() => {
            toastMessage("Error", "No se ha podido eliminar el gasto.");
        }
        );
    }

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
                            <Button className="md:mr-6" variant={'destructive'} onClick={() => deleteCostFromDatabase(cost.id || 'undefined')}>Eliminar</Button>
                        </div>
                    ))}
                </ScrollArea>
            )}
        </section>
    );
}
