import { child, get, push, ref, update } from "firebase/database";
import { database } from "./firebase";
import { CostType } from "../../types/CostType";

function addCost(userId: string, cost: CostType) {
    const newCostKey = push(child(ref(database), 'costs')).key;
    const updates: { [key: string]: CostType } = {};
    updates['/costs/' + newCostKey] = cost;
    updates['/user-costs/' + userId + '/' + newCostKey] = cost;

    return update(ref(database), updates);
}

async function getCosts(userId: string) {
    const dbRef = ref(database);
    const costsSnapshot = await get(child(dbRef, `user-costs/${userId}`));
    if (costsSnapshot.exists()) {
        const costsData = costsSnapshot.val();        
        // Verifica si los datos son un objeto (como suele ser en Firebase)
        if (typeof costsData === 'object' && costsData !== null) {
            // Convierte el objeto en un array de costes, agregando el id como parte de cada objeto
            return Object.keys(costsData).map(key => ({
                id: key,
                ...costsData[key]
            }));
        } else {
            // Si por alguna razón es un array o no hay datos, lo retorna directamente.
            return [];
        }
    } else {
        return [];
    }
}

export { addCost, getCosts };