import { getCosts } from "../lib/firebase/database";
import { CostsLogList } from "./CostsLogList";
import { ScrollArea } from "./ui/scroll-area";

export function HistoryCostsLogList() {
    function getCostsFromDatabase(userId: string) {
        return getCosts(userId);
    }

    return (
        <ScrollArea className="w-full h-[600px] md:h-[800px]">
            <CostsLogList getCosts={getCostsFromDatabase} />
        </ScrollArea>
    );
}