import { HistoryCostsLogList } from "../components/HistoryCostsLogList";

export function HistoryPage() {
    return (
        <div className="w-full flex flex-col mx-4 mb-8">
            <h1 className="text-3xl font-semibold mb-4">Historial</h1>
            <section>
                <HistoryCostsLogList />
            </section>
        </div>
    )
}