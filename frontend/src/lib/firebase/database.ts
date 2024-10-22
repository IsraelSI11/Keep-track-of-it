/* eslint-disable @typescript-eslint/no-explicit-any */
import { child, get, push, ref, update } from "firebase/database";
import { database } from "./firebase";
import { CostType } from "../../types/CostType";
import { parseFirebaseResponse } from "../utils";
import { categoryEnum } from "../../enums/categoryEnum";

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
    return parseFirebaseResponse(costsSnapshot);
}

async function getCostsOfMonth(userId: string, date: string) {
    // Convertimos la fecha a Date
    const dateObj = new Date(date);
    // Obtenemos el primer día del mes
    const firstDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    // Obtenemos el último día del mes
    const lastDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);

    // Convertimos las fechas a cadenas de texto en formato "YYYY-MM-DD"
    const firstDayString = firstDayOfMonth.toISOString().split('T')[0];
    const lastDayString = lastDayOfMonth.toISOString().split('T')[0];

    // Creamos la referencia a la base de datos
    const dbRef = ref(database, `user-costs/${userId}`);

    // Obtenemos los datos del usuario
    const userSnapshot = await get(dbRef);

    // Creamos un array para almacenar los costes del mes
    const costsOfMonth: { costId: string; date: any; cost: number, description: string, category: categoryEnum }[] = [];

    // Iteramos a través de cada cost-id
    userSnapshot.forEach(costIdSnapshot => {
        const costId = costIdSnapshot.key;
        const costData = costIdSnapshot.val();

        // Verificamos si la fecha está dentro del rango del mes
        if (costData.date >= firstDayString && costData.date <= lastDayString) {
            // Agregamos el coste al array
            costsOfMonth.push({
                costId: costId,
                date: costData.date,
                cost: costData.cost,
                description: costData.description,
                category: costData.category
            });
        }
    });
    // Retornamos el array de costes del mes
    return costsOfMonth;
}

async function getCostsOfMonthGroupedByCategory(userId: string, date: string) {
    const costsOfMoth = await getCostsOfMonth(userId, date);
    const groupedCosts = costsOfMoth.reduce((acc: { [key in categoryEnum]?: { category: categoryEnum; cost: number, fill:string } }, cost, index) => {
        const category = cost.category;
        if (acc[category]) {
            acc[category].cost += cost.cost;
        } else {
            acc[category] = {
                category: category,
                cost: cost.cost,
                fill: `hsl(var(--chart-${index+1}))`
            }
        }
        return acc;
    }
        , {});
    return Object.values(groupedCosts);
}

export { addCost, getCosts, getCostsOfMonth, getCostsOfMonthGroupedByCategory };