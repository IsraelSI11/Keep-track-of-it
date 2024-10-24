import { getRecentCosts } from "../lib/firebase/database";
import { CostsLogList } from "./CostsLogList";

export function RecentCostsLogList() {
    function getRecentCostsFromDatabase(userId: string) {
        return getRecentCosts(userId);
    }

    return (
        <>
            <CostsLogList getCosts={getRecentCostsFromDatabase} />
        </>
    );
}