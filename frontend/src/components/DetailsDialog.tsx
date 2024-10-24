import { CostType } from "../types/CostType";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type DetailsDialogProps = {
    cost: CostType;
};

export function DetailsDialog({ cost }: DetailsDialogProps) {

    const fechaFormateada = cost.date.split('T')[0];

    return (
        <Dialog>
            <DialogTrigger>
                <>
                <a href="#" className="text-blue-500 hover:text-blue-900 underline underline-offset-2">Detalles</a>
                </>
                
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalles coste</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <div className="flex mb-2">
                        <div className="p-4 bg-slate-200 rounded-full">
                            <img src={`/src/assets/${cost.category}.svg`} alt={`${cost.category} image`} className="w-16" />
                        </div>
                        <div className="ml-8 flex flex-col justify-center">
                            <p>Categoría: {cost.category}</p>
                            <p className="text-left">Coste: {cost.cost}</p>
                        </div>
                    </div>
                    <p className="mb-2">Fecha: {fechaFormateada}</p>
                    {cost.description &&
                        <div>
                            <p>Descripción: </p>
                            <p>{cost.description}</p>
                        </div>
                    }
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="default">
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}
