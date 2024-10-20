import { child, get, ref, set } from "firebase/database";
import { database } from "./firebase";

type CostType = {
    category: 'food' | 'transport' | 'housing' | 'entertainment' | 'health' | 'technology' | 'other';
    description: string | undefined;
    cost: number;
    date: Date;
}

function addCost(userId: string, cost: CostType) {
    return set(ref(database, 'costs/' + userId), {
        category: cost.category,
        description: cost.description,
        cost: cost.cost,
        date: cost.date
    });
}

async function getCosts(userId: string) {
    const dbRef = ref(database);
    const costs = await get(child(dbRef, `costs/${userId}`));
    if (costs.exists()) {
        const data = costs.val();
        if(data instanceof Array){
            return data;
        }else{
            return [data];
        }
    } else {
        return [];
    }
}

export { addCost, getCosts };