/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, ref } from "firebase/database";
import { database } from "./firebase";
import { categoryEnum } from "../../enums/categoryEnum";

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

    return getCostsBetweenDates(userId, firstDayString, lastDayString);
}

async function getCostsOfYear(userId: string, year: number) {
    // Obtenemos la fecha del primer dia del annio
    const firstDayOfYear = new Date(year, 0, 1);
    // Obtenemos la fecha del último dia del annio
    const lastDayOfYear = new Date(year, 11, 30);

    // Convertimos las fechas a cadenas de texto en formato "YYYY-MM-DD"
    const firstDayString = firstDayOfYear.toISOString().split('T')[0];
    const lastDayString = lastDayOfYear.toISOString().split('T')[0];

    return getCostsBetweenDates(userId, firstDayString, lastDayString);
}

async function getCostsBetweenDates(userId:string, startDate: string, endDate: string) {
    const dbRef = ref(database, `user-costs/${userId}`);
    const userSnapshot = await get(dbRef);
    const costsOfDate: { costId: string; date: any; cost: number, description: string, category: categoryEnum }[] = [];

    // Iteramos a través de cada cost-id
    userSnapshot.forEach(costIdSnapshot => {
        const costId = costIdSnapshot.key;
        const costData = costIdSnapshot.val();
        if (costData.date >= startDate && costData.date <= endDate) {
            // Agregamos el coste al array
            costsOfDate.push({
                costId: costId,
                date: costData.date,
                cost: costData.cost,
                description: costData.description,
                category: costData.category
            });
        }
    });
    return costsOfDate;
}

export { getCostsBetweenDates, getCostsOfYear, getCostsOfMonth};