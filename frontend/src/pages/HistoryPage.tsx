import { HistoryCostsLogList } from "../components/HistoryCostsLogList";
import { Separator } from "../components/ui/separator";

export function HistoryPage() {
    return (
        <div className="w-full flex flex-col mx-4 mb-8">
            <h1 className="text-3xl font-semibold">Historial</h1>
            <Separator className="mt-2 mb-4"/>
            <HistoryCostsLogList />
        </div>
    )
}