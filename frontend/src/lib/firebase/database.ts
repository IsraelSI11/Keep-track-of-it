/* eslint-disable @typescript-eslint/no-explicit-any */
import { child, get, limitToLast, push, query, ref, update } from "firebase/database";
import { database } from "./firebase";
import { CostType } from "../../types/CostType";
import { parseFirebaseResponse } from "../utils";
import { categoryEnum } from "../../enums/categoryEnum";
import { getCostsOfMonth, getCostsOfYear } from "./utils";

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

async function deleteCost(userId: string, costId: string) {
    const updates: { [key: string]: null } = {};
    updates['/costs/' + costId] = null;
    updates['/user-costs/' + userId + '/' + costId] = null;

    return update(ref(database), updates);
}

async function getRecentCosts(userId: string) {
    const queryRef = query(child(ref(database), `user-costs/${userId}`), limitToLast(9));
    const costsSnapshot = await get(queryRef);
    return parseFirebaseResponse(costsSnapshot);
}

async function getCostsOfMonthGroupedByCategory(userId: string, date: string) {
    const costsOfMoth = await getCostsOfMonth(userId, date);
    const groupedCosts = costsOfMoth.reduce((acc: { [key in categoryEnum]?: { category: categoryEnum; cost: number, fill: string, date:string } }, cost, index) => {
        const category = cost.category;
        if (acc[category]) {
            acc[category].cost += cost.cost;
        } else {
            acc[category] = {
                date: cost.date,
                category: category,
                cost: cost.cost,
                fill: `hsl(var(--chart-${index + 1}))`
            }
        }
        return acc;
    }
        , {});
    return Object.values(groupedCosts);
}


async function getCostsOfYearGroupedByMonth(userId: string, year: number) {
    const costsOfYear = await getCostsOfYear(userId, year);
    const groupedCosts = costsOfYear.reduce((acc: { [key: string]: { month: string; cost: number } }, cost) => {
        const date = new Date(cost.date);
        const month = date.toLocaleString('default', { month: 'long' });
        if (acc[month]) {
            acc[month].cost += cost.cost;
        } else {
            acc[month] = {
                month: month,
                cost: cost.cost
            }
        }
        return acc;
    }
        , {});
    return Object.values(groupedCosts);
}

async function getCostsOfMonthGroupedByDay(userId: string, date: string){
    const costsOfMoth = await getCostsOfMonth(userId, date);
    const groupedCosts = costsOfMoth.reduce((acc: { [key: string]: { date: string; cost: number } }, cost) => {
        const date = cost.date.split('T')[0];
        if (acc[date]) {
            acc[date].cost += cost.cost;
        } else {
            acc[date] = {
                date: date,
                cost: cost.cost
            };
        }
        return acc;
    }, {});
    return Object.values(groupedCosts);
}



export { addCost, getCosts, getCostsOfMonthGroupedByCategory, getCostsOfYearGroupedByMonth, getCostsOfMonthGroupedByDay, getRecentCosts, deleteCost };