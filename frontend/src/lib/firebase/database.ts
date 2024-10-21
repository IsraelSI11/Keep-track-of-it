import { child, get, push, ref, update } from "firebase/database";
import { database } from "./firebase";
import { CostType } from "../../types/CostType";

function addCost(userId: string, cost: CostType) {
    const newCostKey = push(child(ref(database), 'costs')).key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates: { [key: string]: CostType } = {};
    updates['/costs/' + newCostKey] = cost;
    updates['/user-costs/' + userId + '/' + newCostKey] = cost;

    return update(ref(database), updates);
}

async function getCosts(userId: string) {
    const dbRef = ref(database);
    const costs = await get(child(dbRef, `costs/${userId}`));
    if (costs.exists()) {
        const data = costs.val();
        if (data instanceof Array) {
            return data;
        } else {
            return [data];
        }
    } else {
        return [];
    }
}

export { addCost, getCosts };